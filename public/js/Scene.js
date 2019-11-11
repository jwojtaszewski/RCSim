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
          BOX.add(el);
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
          piecesTable = [...buildCube.doUMove(piecesTable)];
      }

      if (e.keyCode == 73) {
          piecesTable = [...buildCube.doRMove(piecesTable)];
      }

      if (e.keyCode == 75) {
          piecesTable = [...buildCube.doRPrimeMove(piecesTable)];
      }

      if (e.keyCode == 68) {
          piecesTable = [...buildCube.doLMove(piecesTable)];
      }

      if (e.keyCode == 69) {
          piecesTable = [...buildCube.doLPrimeMove(piecesTable)];
      }

      if (e.keyCode == 70) {
          piecesTable = [...buildCube.doUPrimeMove(piecesTable)];
      }

      if (e.keyCode == 71) {
          piecesTable = [...buildCube.doFPrimeMove(piecesTable)];
      }

      if (e.keyCode == 72) {
          piecesTable = [...buildCube.doFMove(piecesTable)];
      }

      if (e.keyCode == 83) {
          piecesTable = [...buildCube.doDMove(piecesTable)];
      }

      if (e.keyCode == 76) {
          piecesTable = [...buildCube.doDPrimeMove(piecesTable)];
      }

      if (e.keyCode == 186) {
          piecesTable = [...buildCube.doYRotate(piecesTable)];
      }

      if (e.keyCode == 65) {
          piecesTable = [...buildCube.doYPrimeRotate(piecesTable)];
      }

      if (e.keyCode == 27) {
          piecesTable = [...buildCube.resetCube(piecesTable)];
      }
  })


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