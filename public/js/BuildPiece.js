class BuildPiece {
    constructor() {}

    makeCorner(color, name) {

        const width = 30;
        const height = 30;
        const segments = 1;
        let plane = []
        let corner = new THREE.Object3D();

        for (let i = 0; i < 3; i++) {
            plane.push(new THREE.Mesh(
                new THREE.PlaneGeometry(width, height, segments),
                this.makeMaretrial(color[i])));
            corner.add(plane[i])
        }

        plane[0].position.z = -16;
        plane[1].position.z = 0;
        plane[2].position.z = 0;

        plane[0].position.x = 0;
        plane[1].position.x = 0;
        plane[2].position.x = 16;

        plane[0].position.y = 0;
        plane[1].position.y = 16;
        plane[2].position.y = 0;

        plane[0].rotation.x = 0
        plane[1].rotation.x = Math.PI / 2;
        plane[2].rotation.x = Math.PI / 2;

        plane[2].rotation.y = Math.PI / 2;

        corner.name = name;

        return corner
    }

    makeMaretrial(color) {
        const planeMaterial =
            new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide
            });

        return planeMaterial
    }

}