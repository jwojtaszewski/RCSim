  // Set the scene size.
  const WIDTH = 600;
  const HEIGHT = 600;

  // Set some camera attributes.
  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 1000;

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

  let BOX = new THREE.Object3D();
  BOX.rotation.x = Math.PI / 6;

  refreshView = (piecesTable) => {
      piecesTable.forEach((el) => {
          BOX.add(el.cube);
      })
      scene.add(BOX);
  }

  //------------------cube----------------------------
  const buildCube = new BuildCube();
  let piecesTable = buildCube.getCube();
  const movement = new Movement();

  refreshView(piecesTable);

  let x = 0;
  let y = 0;

  window.addEventListener("keydown", (e) => {

      if (e.keyCode == 74) {
          piecesTable = [...movement.doUMove(piecesTable)];
      }

      if (e.keyCode == 73) {
          piecesTable = [...movement.doRMove(piecesTable)];
      }

      if (e.keyCode == 75) {
          piecesTable = [...movement.doRPrimeMove(piecesTable)];
      }

      if (e.keyCode == 68) {
          piecesTable = [...movement.doLMove(piecesTable)];
      }

      if (e.keyCode == 69) {
          piecesTable = [...movement.doLPrimeMove(piecesTable)];
      }

      if (e.keyCode == 70) {
          piecesTable = [...movement.doUPrimeMove(piecesTable)];
      }

      if (e.keyCode == 71) {
          piecesTable = [...movement.doFPrimeMove(piecesTable)];
      }

      if (e.keyCode == 72) {
          piecesTable = [...movement.doFMove(piecesTable)];
      }

      if (e.keyCode == 83) {
          piecesTable = [...movement.doDMove(piecesTable)];
      }

      if (e.keyCode == 76) {
          piecesTable = [...movement.doDPrimeMove(piecesTable)];
      }

      if (e.keyCode == 186) {
          piecesTable = [...movement.doYRotate(piecesTable)];
      }

      if (e.keyCode == 65) {
          piecesTable = [...movement.doYPrimeRotate(piecesTable)];
      }

      if (e.keyCode == 28) {
          piecesTable = [...buildCube.getCube()];
      }

      if (e.keyCode == 87) {
          piecesTable = [...movement.doBMove(piecesTable)];
      }

      if (e.keyCode == 79) {
          piecesTable = [...movement.doBPrimeMove(piecesTable)];
      }

      if (e.keyCode == 84) {
          piecesTable = [...movement.doXRotate(piecesTable)];
      }

      if (e.keyCode == 66) {
          piecesTable = [...movement.doXPrimeRotate(piecesTable)];
      }
      console.log(piecesTable);
  })

  scrambleCube = (scramble) => {
      const moveArray = scramble.split(' ');
      moveArray.forEach((el) => {
          switch (el) {
              case 'U':
                  piecesTable = [...movement.doUMove(piecesTable)];
                  break;
              case 'U\'':
                  piecesTable = [...movement.doUPrimeMove(piecesTable)];
                  break;
              case 'R':
                  piecesTable = [...movement.doRMove(piecesTable)];
                  break;
              case 'R\'':
                  piecesTable = [...movement.doRPrimeMove(piecesTable)];
                  break;
              case 'L':
                  piecesTable = [...movement.doLMove(piecesTable)];
                  break;
              case 'L\'':
                  piecesTable = [...movement.doLPrimeMove(piecesTable)];
                  break;
              case 'F':
                  piecesTable = [...movement.doFMove(piecesTable)];
                  break;
              case 'F\'':
                  piecesTable = [...movement.doFPrimeMove(piecesTable)];
                  break;
              case 'D':
                  piecesTable = [...movement.doDMove(piecesTable)];
                  break;
              case 'D\'':
                  piecesTable = [...movement.doDPrimeMove(piecesTable)];
                  break;
              case 'B':
                  piecesTable = [...movement.doBMove(piecesTable)];
                  break;
              case 'B\'':
                  piecesTable = [...movement.doBPrimeMove(piecesTable)];
                  break;
          }
          console.log(piecesTable);
      })
  }

  isCubeSolved = () => {
      return piecesTable[0].cube.name === 'UFL' && piecesTable[1].cube.name === 'UBL' && piecesTable[2].cube.name === 'UBR' &&
          piecesTable[3].cube.name === 'UFR' && piecesTable[4].cube.name === 'DFL' && piecesTable[5].cube.name === 'DBL' &&
          piecesTable[6].cube.name === 'DBR' && piecesTable[7].cube.name === 'DFR' && piecesTable[0].orientation === 0 &&
          piecesTable[1].orientation === 0 && piecesTable[2].orientation === 0 && piecesTable[3].orientation === 0 &&
          piecesTable[4].orientation === 0 && piecesTable[5].orientation === 0 && piecesTable[6].orientation === 0 &&
          piecesTable[7].orientation === 0;
  }


  //----------------------------------------------
  function update() {
      // Draw!
      renderer.render(scene, camera);
      controls.update();


      // Schedule the next frame.
      requestAnimationFrame(update);
  }

  // Schedule the first frame.
  requestAnimationFrame(update);