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
  const renderer = new THREE.WebGLRenderer();
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

  //------------------cube----------------------------
  const buildCube = new BuildCube();
  let piecesTable = buildCube.getCube();
  const movement = new Movement();

  piecesTable.forEach((el) => {
      scene.add(el);
  })

  let x = 0;
  let y = 0;

  window.addEventListener("keydown", (e) => {
      const group = new THREE.Group()
      if (e.keyCode == 74) {
          console.log(piecesTable[0].getWorldPosition(piecesTable[0].position))
          console.log(piecesTable[1].getWorldPosition(piecesTable[1].position))
          console.log(piecesTable[2].getWorldPosition(piecesTable[2].position))
          console.log(piecesTable[3].getWorldPosition(piecesTable[3].position))

          group.add(piecesTable[0]);
          group.add(piecesTable[1]);
          group.add(piecesTable[2]);
          group.add(piecesTable[3]);
          scene.add(group);
          //   buildCube.doUMove()

          y += -Math.PI / 2;
          group.rotation.y = y;

      }
  })
  window.addEventListener("keydown", (e) => {
      const group = new THREE.Group()
      if (e.keyCode == 73) {

          group.add(piecesTable[2]);
          group.add(piecesTable[3]);
          group.add(piecesTable[6]);
          group.add(piecesTable[7]);
          scene.add(group);
          //   buildCube.doUMove()

          x += -Math.PI / 2;
          group.rotation.x = x;
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