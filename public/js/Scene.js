  // Set the scene size.
  const WIDTH = 600;
  const HEIGHT = 600;

  const MOVEMENT_SPEED = 5;
  const ROTATION_SPEED = 8;

  // Set some camera attributes.
  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 1000;

  const clock = new THREE.Clock(true);
  let timeElapsed
  // Get the DOM element to attach to
  const container =
      document.querySelector('.cubeContainer');

  // Create a WebGL renderer, camera
  // and a scene
  const renderer = new THREE.WebGLRenderer({
      alpha: true
  });
  //   renderer.setClearColorHex(0xffffff, 1);
  //   renderer.setClearColor(0xffffff, 0);
  const camera =
      new THREE.PerspectiveCamera(
          VIEW_ANGLE,
          ASPECT,
          NEAR,
          FAR
      );

  //   camera.position.setLength(-100);
  const scene = new THREE.Scene();
  scene.add(camera);

  // Start the renderer.
  renderer.setSize(WIDTH, HEIGHT);

  // Attach the renderer-supplied
  // DOM element.
  container.appendChild(renderer.domElement);

  // create a point light
  const pointLight =
      new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.x = 0;
  camera.position.y = 10.5;
  camera.position.z = 0;

  // controls.addEventListener('change', renderer);
  controls.target.set(0, 0, -10);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 300;
  controls.maxDistance = 450;
  controls.maxPolarAngle = Math.PI;

  //-------------------------------cube-------------------------------------------

  const buildCube = new BuildCube();
  let piecesTable = {};
  piecesTable.corners = buildCube.getCornerArray();
  piecesTable.edges = buildCube.getEdgeArray();
  piecesTable.centers = buildCube.getCenters();
  const movement = new Movement();

  let group = new THREE.Group();
  let groupR = new THREE.Group();
  let isMove = false;
  let moveLetter;
  let movesFifo = [];
  let resultPiecesTable = {};
  let rotateFifo = [];

  const cornersNaturalOrder = ['UFL', 'UBL', 'UBR', 'UFR', 'DFL', 'DBL', 'DBR', 'DFR'];
  const edgesNaturalOrder = ['UF', 'UL', 'UB', 'UR', 'FR', 'FL', 'BL', 'BR', 'DF', 'DL', 'DB', 'DR'];

  window.addEventListener("keydown", (e) => {
      e.keyCode == 27 ? resetCube() : movesFifo = [...movesFifo, KeyControl.control(e)];
  })

  scrambleCube = (scramble) => {
      piecesTable = scrCube(scramble, piecesTable);
  }

  resetCube = () => {
      scene.children = scene.children.filter(el => el.type == 'PerspectiveCamera' || el.type == 'PointLight')
      BOX = new THREE.Object3D();
      const newCube = new BuildCube();
      piecesTable.corners = newCube.getCornerArray();
      piecesTable.edges = newCube.getEdgeArray();
      piecesTable.centers = newCube.getCenters();
      rotateFifo = [];
      refreshView(piecesTable);
  }

  let BOX = new THREE.Object3D();

  refreshView = (piecesTable) => {
      piecesTable.corners.forEach((el) => {
          BOX.add(el.cube);
      })
      piecesTable.edges.forEach((el) => {
          BOX.add(el.cube);
      })
      piecesTable.centers.forEach((el) => {
          BOX.add(el);
      })
      scene.add(BOX);
  }

  refreshView(piecesTable);

  //----------------------------------- check if cube is solved

  isCubeSolved = () => {
      return checkOrder(piecesTable) && checkOrientation(piecesTable);
  }

  checkOrientation = (pieces) => {
      return pieces.corners.every((el) => el.orientation === 0) && pieces.edges.every((el) => el.orientation === 0);
  }

  checkOrder = (pieces) => {
      return pieces.corners.every((el, index) => el.cube.name === cornersNaturalOrder[index]) && pieces.edges.every((el, index) => el.cube.name === edgesNaturalOrder[index]);
  }

  //   checkOrderTest = (pieces) => {
  //     piecesTest = [];
  //       rotateFifo.forEach(el => {
  //           if(el === 'Y'){
  //               piecesTest = movement.doYRotate(piecesTest);
  //           }
  //       })
  //   }

  let i = 0;

  //------------------------------------------------ auto solve
  solveAutomatically = () => {
      let tmpPieces = {};
      tmpPieces = JSON.parse(JSON.stringify(piecesTable))
      const autoSolve = new AutoSolve(tmpPieces);
      const moves = autoSolve.solveLoop();
      moves.forEach(el => {
          movesFifo.push(el);
      })
  }

  //------------------------------------------------ animation loop

  addPiecesToGroup = (tab) => {
      let group = new THREE.Group();
      if (tab.length > 4) {
          group.add(piecesTable.corners[tab[0]].cube);
          group.add(piecesTable.corners[tab[1]].cube);
          group.add(piecesTable.corners[tab[2]].cube);
          group.add(piecesTable.corners[tab[3]].cube);
          group.add(piecesTable.edges[tab[4]].cube);
          group.add(piecesTable.edges[tab[5]].cube);
          group.add(piecesTable.edges[tab[6]].cube);
          group.add(piecesTable.edges[tab[7]].cube);
          group.add(piecesTable.centers[tab[8]]);
          scene.add(group);
      } else {
          group.add(piecesTable.edges[tab[0]].cube);
          group.add(piecesTable.edges[tab[1]].cube);
          group.add(piecesTable.edges[tab[2]].cube);
          group.add(piecesTable.edges[tab[3]].cube);
          scene.add(group);
      }
      return group;
  }

  addWholeCubeToGroup = () => {
      let group = new THREE.Group();
      piecesTable.corners.forEach(el => group.add(el.cube));
      piecesTable.edges.forEach(el => group.add(el.cube));
      piecesTable.centers.forEach(el => group.add(el));
      scene.add(group)
      return group;
  }

  doMoveOnArrayPieces = (move, rotationAngle, isDoubleMove) => {
      group.rotation.y += Math.PI / 2
      movement.doUMove(piecesTable)
          .then(result => {
              piecesTable = result;
              isMove = false;
              moveLetter = '';
              i = 0;
          })
  }

  function update() {
      // Draw!
      renderer.render(scene, camera);
      controls.update();
      timeElapsed = clock.getDelta();

      if (movesFifo.length > 0 && !isMove) {
          moveLetter = movesFifo.shift();
          if (moveLetter === 'R' || moveLetter === 'R\'' || moveLetter === 'R2') {
              group = addPiecesToGroup([2, 3, 6, 7, 3, 4, 7, 11, 3]);
          } else if (moveLetter === 'U' || moveLetter === 'U\'' || moveLetter === 'U2') {
              group = addPiecesToGroup([0, 3, 2, 1, 0, 3, 2, 1, 0]);
          } else if (moveLetter === 'L' || moveLetter === 'L\'' || moveLetter === 'L2') {
              group = addPiecesToGroup([0, 1, 5, 4, 1, 6, 9, 5, 1]);
          } else if (moveLetter === 'F' || moveLetter === 'F\'' || moveLetter === 'F2') {
              group = addPiecesToGroup([0, 4, 7, 3, 0, 5, 8, 4, 4]);
          } else if (moveLetter === 'D' || moveLetter === 'D\'' || moveLetter === 'D2') {
              group = addPiecesToGroup([4, 5, 6, 7, 8, 9, 10, 11, 5]);
          } else if (moveLetter === 'B' || moveLetter === 'B\'' || moveLetter === 'B2') {
              group = addPiecesToGroup([1, 2, 6, 5, 2, 7, 10, 6, 2]);
          } else if (moveLetter === 'E' || moveLetter === 'E\'' || moveLetter === 'E2') {
              group = addPiecesToGroup([4, 5, 6, 7]);
          } else if (moveLetter === 'M' || moveLetter === 'M\'' || moveLetter === 'M2') {
              group = addPiecesToGroup([0, 2, 8, 10]);
          } else if (moveLetter === 'X' || moveLetter === 'X\'' || moveLetter === 'Y' || moveLetter === 'Y\'') {
              group = addWholeCubeToGroup();
          }
      }

      switch (moveLetter) {
          case 'U':
              i++
              isMove = true;
              console.log(i);
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y += Math.PI / 2
                  movement.doUMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'U\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y -= Math.PI / 2
                  movement.doUPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'U2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.y += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y -= Math.PI
                  movement.doU2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'R':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x += Math.PI / 2
                  movement.doRMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'R\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x -= Math.PI / 2
                  movement.doRPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'R2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.x -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x += Math.PI
                  movement.doR2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'L':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x -= Math.PI / 2
                  movement.doLMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'L\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x += Math.PI / 2
                  movement.doLPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'L2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.x += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x -= Math.PI
                  movement.doL2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'F':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.z -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.z += Math.PI / 2
                  movement.doFMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'F\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.z += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.z -= Math.PI / 2
                  movement.doFPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'F2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.z -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.z += Math.PI
                  movement.doF2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'D':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y -= Math.PI / 2
                  movement.doDMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'D\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y += Math.PI / 2
                  movement.doDPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'D2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.y += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y -= Math.PI
                  movement.doD2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'B':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.z += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.z -= Math.PI / 2
                  movement.doBMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'B\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.z -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.z += Math.PI / 2
                  movement.doBPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'B2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.z += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.z -= Math.PI
                  movement.doB2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'E':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y -= Math.PI / 2
                  movement.doEMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'E\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y += Math.PI / 2
                  movement.doEPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'E2':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.y -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y += Math.PI
                  movement.doE2Move(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'M':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x += Math.PI / 2
                  movement.doMMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'M\'':
              i++
              isMove = true;
              if (i % ((MOVEMENT_SPEED * 2) - 1) !== 0) group.rotation.x -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x += Math.PI
                  movement.doMPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                      })
              }
              break;
          case 'X':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x += Math.PI / 2
                  movement.doXRotate(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                          rotateFifo.push('X');
                      })
              }
              break;
          case 'X\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.x += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.x -= Math.PI / 2
                  movement.doXPrimeRotate(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                          rotateFifo.push('X\'');
                      })
              }
              break;
          case 'Y':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y -= Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y += Math.PI / 2
                  movement.doYRotate(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                          rotateFifo.push('Y');
                      })
              }
              break;
          case 'Y\'':
              i++
              isMove = true;
              if (i % MOVEMENT_SPEED !== 0) group.rotation.y += Math.PI / ROTATION_SPEED;
              else {
                  group.rotation.y -= Math.PI / 2
                  movement.doYPrimeRotate(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                          moveLetter = '';
                          i = 0;
                          rotateFifo.push('Y\'');
                      })
              }
              break;
      }

      //   }

      // Schedule the next frame.
      requestAnimationFrame(update);
  }

  // Schedule the first frame.
  requestAnimationFrame(update);