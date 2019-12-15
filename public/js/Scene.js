  // Set the scene size.
  const WIDTH = 600;
  const HEIGHT = 600;

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

  // Add the camera to the scene.
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

  // controls.addEventListener('change', renderer);
  controls.target.set(0, 0, -10);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 300;
  controls.maxDistance = 450;
  controls.maxPolarAngle = Math.PI;

  //-------------------------------cube-------------------------------------------

  let BOX = new THREE.Object3D();
  //   BOX.rotation.x = Math.PI / 5;

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

  //----------------------------------------------
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

  refreshView(piecesTable);

  window.addEventListener("keydown", (e) => {
      movesFifo = [...movesFifo, KeyControl.control(e)];
  })

  scrambleCube = (scramble) => {
      piecesTable = scrCube(scramble, piecesTable);
  }

  isCubeSolved = () => {
      return checkOrder(piecesTable) && checkOrientation(piecesTable);
  }

  checkOrientation = (pieces) => {
      return pieces.corners.every((el) => el.orientation === 0) && pieces.edges.every((el) => el.orientation === 0);
  }

  const cornersNaturalOrder = ['UFL', 'UBL', 'UBR', 'UFR', 'DFL', 'DBL', 'DBR', 'DFR'];
  const edgesNaturalOrder = ['UF', 'UL', 'UB', 'UR', 'FR', 'FL', 'BL', 'BR', 'DF', 'DL', 'DB', 'DR'];

  checkOrder = (pieces) => {
      return pieces.corners.every((el, index) => el.cube.name === cornersNaturalOrder[index]) && pieces.edges.every((el, index) => el.cube.name === edgesNaturalOrder[index]);
  }


  let i = 0;
  //----------------------------------------------

  addPiecesToGroup = (tab) => {
      let group = new THREE.Group();
      group.add(piecesTable.corners[tab[0]].cube);
      group.add(piecesTable.corners[tab[1]].cube);
      group.add(piecesTable.corners[tab[2]].cube);
      group.add(piecesTable.corners[tab[3]].cube);
      group.add(piecesTable.edges[tab[4]].cube);
      group.add(piecesTable.edges[tab[5]].cube);
      group.add(piecesTable.edges[tab[6]].cube);
      group.add(piecesTable.edges[tab[7]].cube);
      scene.add(group);
      return group;
  }

  function update() {
      // Draw!
      renderer.render(scene, camera);
      controls.update();
      timeElapsed = clock.getDelta();

      if (movesFifo != null && !isMove) {
          moveLetter = movesFifo.shift();
          if (moveLetter === 'R') {
              group = addPiecesToGroup([2, 3, 6, 7, 3, 4, 7, 11]);
          } else if (moveLetter === 'U') {
              group = addPiecesToGroup([0, 3, 2, 1, 0, 3, 2, 1]);
          } else if (moveLetter === 'R\'') {
              group = addPiecesToGroup([2, 3, 6, 7, 3, 4, 7, 11]);
          } else if (moveLetter === 'U\'') {
              group = addPiecesToGroup([0, 3, 2, 1, 0, 3, 2, 1]);
          } else if (moveLetter === 'L') {
              group = addPiecesToGroup([0, 1, 5, 4, 1, 6, 9, 5]);
          } else if (moveLetter === 'L\'') {
              group = addPiecesToGroup([0, 1, 5, 4, 1, 6, 9, 5]);
          } else if (moveLetter === 'F') {
              group = addPiecesToGroup([0, 4, 7, 3, 0, 5, 8, 4]);
          } else if (moveLetter === 'F\'') {
              group = addPiecesToGroup([0, 4, 7, 3, 0, 5, 8, 4]);
          } else if (moveLetter === 'D') {
              group = addPiecesToGroup([4, 5, 6, 7, 8, 9, 10, 11]);
          } else if (moveLetter === 'D\'') {
              group = addPiecesToGroup([4, 5, 6, 7, 8, 9, 10, 11]);
          } else if (moveLetter === 'B\'') {
              group = addPiecesToGroup([1, 2, 6, 5, 2, 7, 10, 6]);
          } else if (moveLetter === 'B\'') {
              group = addPiecesToGroup([1, 2, 6, 5, 2, 7, 10, 6]);
          }
      }

      switch (moveLetter) {
          case 'U':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.y -= Math.PI / 10;
              else {
                  group.rotation.y += Math.PI / 2
                  movement.doUMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'U\'':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.y += Math.PI / 10;
              else {
                  group.rotation.y -= Math.PI / 2
                  movement.doUPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'R':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.x -= Math.PI / 10;
              else {
                  group.rotation.x += Math.PI / 2
                  movement.doRMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'R\'':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.x += Math.PI / 10;
              else {
                  group.rotation.x -= Math.PI / 2
                  movement.doRPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'L':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.x += Math.PI / 10;
              else {
                  group.rotation.x -= Math.PI / 2
                  movement.doLMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'L\'':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.x -= Math.PI / 10;
              else {
                  group.rotation.x += Math.PI / 2
                  movement.doLPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'F':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.z -= Math.PI / 10;
              else {
                  group.rotation.z += Math.PI / 2
                  movement.doFMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'F\'':
              i++
              isMove = true;
              if (i % 6 !== 0) group.rotation.z += Math.PI / 10;
              else {
                  group.rotation.z -= Math.PI / 2
                  movement.doFPrimeMove(piecesTable)
                      .then(result => {
                          piecesTable = result;
                          isMove = false;
                      })
              }
              break;
          case 'D':
              piecesTable = movement.doDMove(piecesTable);
              break;
          case 'D\'':
              piecesTable = movement.doDPrimeMove(piecesTable);
              break;
          case 'B':
              piecesTable = movement.doBMove(piecesTable);
              break;
          case 'B\'':
              piecesTable = movement.doBPrimeMove(piecesTable);
              break;
      }

      //   }

      // Schedule the next frame.
      requestAnimationFrame(update);
  }

  // Schedule the first frame.
  requestAnimationFrame(update);