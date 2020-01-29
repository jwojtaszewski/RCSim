class Movement {
    constructor() {}

    doUMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 3, 2, 1], 'U', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 3, 2, 1], 'U', -Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doUPrimeMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 1, 2, 3], 'U', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 1, 2, 3], 'U', Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doU2Move(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 3, 2, 1], 'U', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 3, 2, 1], 'U', -Math.PI / 2);
        pieces.corners = this.moveCorner(pieces.corners, [0, 3, 2, 1], 'U', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 3, 2, 1], 'U', -Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doRMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [3, 7, 6, 2], 'R', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [3, 4, 11, 7], 'R', -Math.PI / 2);

        pieces.corners[3].orientation = (pieces.corners[3].orientation + 1) % 3
        pieces.corners[7].orientation = (pieces.corners[7].orientation + 2) % 3
        pieces.corners[6].orientation = (pieces.corners[6].orientation + 1) % 3
        pieces.corners[2].orientation = (pieces.corners[2].orientation + 2) % 3

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doRPrimeMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [3, 2, 6, 7], 'R', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [3, 7, 11, 4], 'R', Math.PI / 2);

        pieces.corners[3].orientation = (pieces.corners[3].orientation + 1) % 3
        pieces.corners[7].orientation = (pieces.corners[7].orientation + 2) % 3
        pieces.corners[6].orientation = (pieces.corners[6].orientation + 1) % 3
        pieces.corners[2].orientation = (pieces.corners[2].orientation + 2) % 3

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doR2Move(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [3, 7, 6, 2], 'R', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [3, 4, 11, 7], 'R', -Math.PI / 2);
        pieces.corners = this.moveCorner(pieces.corners, [3, 7, 6, 2], 'R', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [3, 4, 11, 7], 'R', -Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doLMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 1, 5, 4], 'L', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [1, 6, 9, 5], 'L', Math.PI / 2);

        pieces.corners[0].orientation = (pieces.corners[0].orientation + 2) % 3
        pieces.corners[1].orientation = (pieces.corners[1].orientation + 1) % 3
        pieces.corners[4].orientation = (pieces.corners[4].orientation + 1) % 3
        pieces.corners[5].orientation = (pieces.corners[5].orientation + 2) % 3


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doLPrimeMove(pieces) {

        pieces.corners = this.moveCorner(pieces.corners, [0, 4, 5, 1], 'L', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [1, 5, 9, 6], 'L', -Math.PI / 2);

        pieces.corners[0].orientation = (pieces.corners[0].orientation + 2) % 3
        pieces.corners[1].orientation = (pieces.corners[1].orientation + 1) % 3
        pieces.corners[4].orientation = (pieces.corners[4].orientation + 1) % 3
        pieces.corners[5].orientation = (pieces.corners[5].orientation + 2) % 3

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doL2Move(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 1, 5, 4], 'L', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [1, 6, 9, 5], 'L', Math.PI / 2);
        pieces.corners = this.moveCorner(pieces.corners, [0, 1, 5, 4], 'L', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [1, 6, 9, 5], 'L', Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }


    doFMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 4, 7, 3], 'F', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 5, 8, 4], 'F', -Math.PI / 2);

        pieces.corners[0].orientation = (pieces.corners[0].orientation + 1) % 3
        pieces.corners[3].orientation = (pieces.corners[3].orientation + 2) % 3
        pieces.corners[4].orientation = (pieces.corners[4].orientation + 2) % 3
        pieces.corners[7].orientation = (pieces.corners[7].orientation + 1) % 3

        pieces.edges[0].orientation = (pieces.edges[0].orientation + 1) % 2
        pieces.edges[4].orientation = (pieces.edges[4].orientation + 1) % 2
        pieces.edges[5].orientation = (pieces.edges[5].orientation + 1) % 2
        pieces.edges[8].orientation = (pieces.edges[8].orientation + 1) % 2


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doFPrimeMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 3, 7, 4], 'F', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 4, 8, 5], 'F', Math.PI / 2);

        pieces.corners[0].orientation = (pieces.corners[0].orientation + 1) % 3
        pieces.corners[3].orientation = (pieces.corners[3].orientation + 2) % 3
        pieces.corners[4].orientation = (pieces.corners[4].orientation + 2) % 3
        pieces.corners[7].orientation = (pieces.corners[7].orientation + 1) % 3

        pieces.edges[0].orientation = (pieces.edges[0].orientation + 1) % 2
        pieces.edges[4].orientation = (pieces.edges[4].orientation + 1) % 2
        pieces.edges[5].orientation = (pieces.edges[5].orientation + 1) % 2
        pieces.edges[8].orientation = (pieces.edges[8].orientation + 1) % 2


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doF2Move(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [0, 4, 7, 3], 'F', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 5, 8, 4], 'F', -Math.PI / 2);
        pieces.corners = this.moveCorner(pieces.corners, [0, 4, 7, 3], 'F', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [0, 5, 8, 4], 'F', -Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doDMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [4, 5, 6, 7], 'D', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [8, 9, 10, 11], 'D', Math.PI / 2);


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doDPrimeMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [4, 7, 6, 5], 'D', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [8, 11, 10, 9], 'D', -Math.PI / 2);


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doD2Move(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [4, 5, 6, 7], 'D', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [8, 9, 10, 11], 'D', Math.PI / 2);
        pieces.corners = this.moveCorner(pieces.corners, [4, 5, 6, 7], 'D', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [8, 9, 10, 11], 'D', Math.PI / 2);


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doBMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [1, 2, 6, 5], 'B', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [2, 7, 10, 6], 'B', Math.PI / 2);

        pieces.corners[1].orientation = (pieces.corners[1].orientation + 2) % 3
        pieces.corners[2].orientation = (pieces.corners[2].orientation + 1) % 3
        pieces.corners[5].orientation = (pieces.corners[5].orientation + 1) % 3
        pieces.corners[6].orientation = (pieces.corners[6].orientation + 2) % 3

        pieces.edges[2].orientation = (pieces.edges[2].orientation + 1) % 2
        pieces.edges[6].orientation = (pieces.edges[6].orientation + 1) % 2
        pieces.edges[7].orientation = (pieces.edges[7].orientation + 1) % 2
        pieces.edges[10].orientation = (pieces.edges[10].orientation + 1) % 2


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doBPrimeMove(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [1, 5, 6, 2], 'B', -Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [2, 6, 10, 7], 'B', -Math.PI / 2);

        pieces.corners[1].orientation = (pieces.corners[1].orientation + 2) % 3
        pieces.corners[2].orientation = (pieces.corners[2].orientation + 1) % 3
        pieces.corners[5].orientation = (pieces.corners[5].orientation + 1) % 3
        pieces.corners[6].orientation = (pieces.corners[6].orientation + 2) % 3

        pieces.edges[2].orientation = (pieces.edges[2].orientation + 1) % 2
        pieces.edges[6].orientation = (pieces.edges[6].orientation + 1) % 2
        pieces.edges[7].orientation = (pieces.edges[7].orientation + 1) % 2
        pieces.edges[10].orientation = (pieces.edges[10].orientation + 1) % 2


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doB2Move(pieces) {
        pieces.corners = this.moveCorner(pieces.corners, [1, 2, 6, 5], 'B', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [2, 7, 10, 6], 'B', Math.PI / 2);
        pieces.corners = this.moveCorner(pieces.corners, [1, 2, 6, 5], 'B', Math.PI / 2);
        pieces.edges = this.moveEdge(pieces.edges, [2, 7, 10, 6], 'B', Math.PI / 2);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doEMove(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [4, 5, 6, 7], 'E', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [1, 2, 3, 4], 'E', Math.PI / 2)

        pieces.edges[4].orientation = (pieces.edges[4].orientation + 1) % 2
        pieces.edges[5].orientation = (pieces.edges[5].orientation + 1) % 2
        pieces.edges[6].orientation = (pieces.edges[6].orientation + 1) % 2
        pieces.edges[7].orientation = (pieces.edges[7].orientation + 1) % 2


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doEPrimeMove(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [4, 7, 6, 5], 'E', -Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [1, 4, 3, 2], 'E', -Math.PI / 2)

        pieces.edges[4].orientation = (pieces.edges[4].orientation + 1) % 2
        pieces.edges[5].orientation = (pieces.edges[5].orientation + 1) % 2
        pieces.edges[6].orientation = (pieces.edges[6].orientation + 1) % 2
        pieces.edges[7].orientation = (pieces.edges[7].orientation + 1) % 2

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doE2Move(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [4, 5, 6, 7], 'E', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [1, 2, 3, 4], 'E', Math.PI / 2)
        pieces.edges = this.moveEdge(pieces.edges, [4, 5, 6, 7], 'E', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [1, 2, 3, 4], 'E', Math.PI / 2)

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doSMove(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [1, 3, 9, 11], 'S', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [0, 1, 3, 5], 'S', Math.PI / 2)

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doSPrimeMove(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [1, 9, 3, 11], 'S', -Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [0, 5, 3, 1], 'S', -Math.PI / 2)

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doS2Move(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [1, 3, 9, 11], 'S', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [0, 1, 3, 5], 'S', Math.PI / 2)
        pieces.edges = this.moveEdge(pieces.edges, [1, 3, 9, 11], 'S', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [0, 1, 3, 5], 'S', Math.PI / 2)

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doMMove(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [0, 2, 10, 8], 'M', Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [0, 2, 5, 4], 'M', Math.PI / 2)

        pieces.edges[0].orientation = (pieces.edges[0].orientation + 1) % 2
        pieces.edges[2].orientation = (pieces.edges[2].orientation + 1) % 2
        pieces.edges[8].orientation = (pieces.edges[8].orientation + 1) % 2
        pieces.edges[10].orientation = (pieces.edges[10].orientation + 1) % 2


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doMPrimeMove(pieces) {
        pieces.edges = this.moveEdge(pieces.edges, [0, 8, 10, 2], 'M', -Math.PI / 2);
        pieces.centers = this.moveCenter(pieces.centers, [0, 4, 5, 2], 'M', -Math.PI / 2);

        pieces.edges[0].orientation = (pieces.edges[0].orientation + 1) % 2
        pieces.edges[2].orientation = (pieces.edges[2].orientation + 1) % 2
        pieces.edges[8].orientation = (pieces.edges[8].orientation + 1) % 2
        pieces.edges[10].orientation = (pieces.edges[10].orientation + 1) % 2

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doYRotate(pieces) {

        this.doUMove(pieces)
            .then(result => pieces = result);
        this.doDPrimeMove(pieces)
            .then(result => pieces = result);
        this.doEPrimeMove(pieces)
            .then(result => pieces = result);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doYPrimeRotate(pieces) {

        this.doUPrimeMove(pieces)
            .then(result => pieces = result);
        this.doDMove(pieces)
            .then(result => pieces = result);
        this.doEMove(pieces)
            .then(result => pieces = result);


        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doXRotate(pieces) {

        this.doRMove(pieces)
            .then(result => pieces = result);
        this.doLPrimeMove(pieces)
            .then(result => pieces = result);
        this.doMPrimeMove(pieces)
            .then(result => pieces = result);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    doXPrimeRotate(pieces) {

        this.doRPrimeMove(pieces)
            .then(result => pieces = result);
        this.doLMove(pieces)
            .then(result => pieces = result);
        this.doMMove(pieces)
            .then(result => pieces = result);

        return new Promise((resolve, reject) => {
            resolve(pieces);
        })
    }

    rotateCorner(pieces, axis, angle) {
        let el1, el2, el3, el4;
        let vector;
        switch (axis) {
            case 'R':
                vector = new THREE.Vector3(1, 0, 0);
                el1 = 2;
                el2 = 3;
                el3 = 6;
                el4 = 7;
                break;
            case 'U':
                vector = new THREE.Vector3(0, 1, 0);
                el1 = 0;
                el2 = 1;
                el3 = 2;
                el4 = 3;
                break;
            case 'L':
                vector = new THREE.Vector3(1, 0, 0);
                el1 = 0;
                el2 = 1;
                el3 = 4;
                el4 = 5;
                break;
            case 'F':
                vector = new THREE.Vector3(0, 0, 1);
                el1 = 0;
                el2 = 3;
                el3 = 7;
                el4 = 4;
                break;
            case 'D':
                vector = new THREE.Vector3(0, 1, 0);
                el1 = 4;
                el2 = 5;
                el3 = 6;
                el4 = 7;
                break;
            case 'B':
                vector = new THREE.Vector3(0, 0, 1);
                el1 = 1;
                el2 = 2;
                el3 = 6;
                el4 = 5;
                break;
        }

        const quaternion = new THREE.Quaternion().setFromAxisAngle(vector, angle);
        let qua0 = pieces[el1].cube.quaternion;
        let qua1 = pieces[el2].cube.quaternion;
        let qua2 = pieces[el3].cube.quaternion;
        let qua3 = pieces[el4].cube.quaternion;
        qua0.multiplyQuaternions(quaternion, qua0);
        qua1.multiplyQuaternions(quaternion, qua1);
        qua2.multiplyQuaternions(quaternion, qua2);
        qua3.multiplyQuaternions(quaternion, qua3);

        pieces[el1].cube._dirtyPosition = true;
        pieces[el2].cube._dirtyPosition = true;
        pieces[el3].cube._dirtyPosition = true;
        pieces[el4].cube._dirtyPosition = true;

        return pieces;
    }

    rotateEdge(pieces, axis, angle) {
        let el1, el2, el3, el4;
        let vector;
        switch (axis) {
            case 'R':
                vector = new THREE.Vector3(1, 0, 0);
                el1 = 3;
                el2 = 7;
                el3 = 11;
                el4 = 4;
                break;
            case 'U':
                vector = new THREE.Vector3(0, 1, 0);
                el1 = 0;
                el2 = 1;
                el3 = 2;
                el4 = 3;
                break;
            case 'L':
                vector = new THREE.Vector3(1, 0, 0);
                el1 = 1;
                el2 = 5;
                el3 = 9;
                el4 = 6;
                break;
            case 'F':
                vector = new THREE.Vector3(0, 0, 1);
                el1 = 0;
                el2 = 5;
                el3 = 8;
                el4 = 4;
                break;
            case 'D':
                vector = new THREE.Vector3(0, 1, 0);
                el1 = 8;
                el2 = 9;
                el3 = 10;
                el4 = 11;
                break;
            case 'B':
                vector = new THREE.Vector3(0, 0, 1);
                el1 = 2;
                el2 = 6;
                el3 = 7;
                el4 = 10;
                break;
            case 'M':
                vector = new THREE.Vector3(1, 0, 0);
                el1 = 0;
                el2 = 2;
                el3 = 8;
                el4 = 10;
                break;
            case 'E':
                vector = new THREE.Vector3(0, 1, 0);
                el1 = 4;
                el2 = 5;
                el3 = 6;
                el4 = 7;
                break;
            case 'S':
                vector = new THREE.Vector3(0, 0, 1);
                el1 = 1;
                el2 = 3;
                el3 = 9;
                el4 = 11;
                break;
        }

        const quaternion = new THREE.Quaternion().setFromAxisAngle(vector, angle);
        let qua0 = pieces[el1].cube.quaternion;
        let qua1 = pieces[el2].cube.quaternion;
        let qua2 = pieces[el3].cube.quaternion;
        let qua3 = pieces[el4].cube.quaternion;
        qua0.multiplyQuaternions(quaternion, qua0);
        qua1.multiplyQuaternions(quaternion, qua1);
        qua2.multiplyQuaternions(quaternion, qua2);
        qua3.multiplyQuaternions(quaternion, qua3);

        pieces[el1].cube._dirtyPosition = true;
        pieces[el2].cube._dirtyPosition = true;
        pieces[el3].cube._dirtyPosition = true;
        pieces[el4].cube._dirtyPosition = true;

        return pieces;
    }

    rotateCenter(pieces, axis, angle) {
        let el1, el2, el3, el4;
        let vector;
        switch (axis) {
            case 'E':
                vector = new THREE.Vector3(0, 1, 0);
                el1 = 1;
                el2 = 2;
                el3 = 3;
                el4 = 4;
                break;
            case 'S':
                vector = new THREE.Vector3(0, 0, 1);
                el1 = 0;
                el2 = 1;
                el3 = 3;
                el4 = 5;
                break;
            case 'M':
                vector = new THREE.Vector3(1, 0, 0);
                el1 = 0;
                el2 = 2;
                el3 = 4;
                el4 = 5;
                break;

        }

        const quaternion = new THREE.Quaternion().setFromAxisAngle(vector, angle);
        let qua0 = pieces[el1].quaternion;
        let qua1 = pieces[el2].quaternion;
        let qua2 = pieces[el3].quaternion;
        let qua3 = pieces[el4].quaternion;
        qua0.multiplyQuaternions(quaternion, qua0);
        qua1.multiplyQuaternions(quaternion, qua1);
        qua2.multiplyQuaternions(quaternion, qua2);
        qua3.multiplyQuaternions(quaternion, qua3);

        pieces[el1]._dirtyPosition = true;
        pieces[el2]._dirtyPosition = true;
        pieces[el3]._dirtyPosition = true;
        pieces[el4]._dirtyPosition = true;

        return pieces;
    }

    // movePiecesInArray(pieces, [p1,p2,p3,p4]){
    //     let tab = []
    //     tab[0] = pieces[p1];
    //     pieces[p1] = pieces[p2];
    //     pieces[p2] = pieces[p3];
    //     pieces[p3] = pieces[p4];
    //     pieces[p4] = tab[0];
    // }

    cornerPoisitioning(pieces) {
        pieces[1].cube.position.set(-30, 30, -30);
        pieces[2].cube.position.set(30, 30, -30);
        pieces[5].cube.position.set(-30, -30, -30);
        pieces[6].cube.position.set(30, -30, -30);

        pieces[0].cube.position.set(-30, 30, 30);
        pieces[3].cube.position.set(30, 30, 30);
        pieces[4].cube.position.set(-30, -30, 30);
        pieces[7].cube.position.set(30, -30, 30);

        return pieces;
    }

    edgePoisitioning(pieces) {
        pieces[1].cube.position.set(-30, 30, 0);
        pieces[2].cube.position.set(0, 30, -30);
        pieces[5].cube.position.set(-30, 0, 30);
        pieces[6].cube.position.set(-30, 0, -30);

        pieces[0].cube.position.set(0, 30, 30);
        pieces[3].cube.position.set(30, 30, 0);
        pieces[4].cube.position.set(30, 0, 30);
        pieces[7].cube.position.set(30, 0, -30);

        pieces[8].cube.position.set(0, -30, 30);
        pieces[9].cube.position.set(-30, -30, 0);
        pieces[10].cube.position.set(0, -30, -30);
        pieces[11].cube.position.set(30, -30, 0);

        return pieces;
    }

    centerPoisitioning(pieces) {
        pieces[0].position.set(0, 44, 0);
        pieces[1].position.set(-44, 0, 0);
        pieces[2].position.set(0, 0, -44);
        pieces[3].position.set(44, 0, 0);
        pieces[4].position.set(0, 0, 44);
        pieces[5].position.set(0, -44, 0);

        return pieces;
    }

    moveCorner(pieces, numbers, move, angle) {
        let tab = [];
        tab[0] = pieces[numbers[0]];
        pieces[numbers[0]] = pieces[numbers[1]];
        pieces[numbers[1]] = pieces[numbers[2]];
        pieces[numbers[2]] = pieces[numbers[3]];
        pieces[numbers[3]] = tab[0];

        pieces = this.cornerPoisitioning(pieces);
        pieces = this.rotateCorner(pieces, move, angle);

        return pieces;
    }

    moveEdge(pieces, numbers, move, angle) {
        let tab = [];
        tab[0] = pieces[numbers[0]];
        pieces[numbers[0]] = pieces[numbers[1]];
        pieces[numbers[1]] = pieces[numbers[2]];
        pieces[numbers[2]] = pieces[numbers[3]];
        pieces[numbers[3]] = tab[0];

        pieces = this.edgePoisitioning(pieces);
        pieces = this.rotateEdge(pieces, move, angle);

        return pieces;
    }

    moveCenter(pieces, numbers, move, angle) {
        let tab = [];
        tab[0] = pieces[numbers[0]];
        pieces[numbers[0]] = pieces[numbers[1]];
        pieces[numbers[1]] = pieces[numbers[2]];
        pieces[numbers[2]] = pieces[numbers[3]];
        pieces[numbers[3]] = tab[0];

        pieces = this.centerPoisitioning(pieces);
        pieces = this.rotateCenter(pieces, move, angle);

        return pieces;
    }

    moveEdgeOP(pieces, pieceToChange, changeOrientation = 1) {
        let tab = [];

        tab[0] = pieces.corners[2];
        pieces.corners[2] = pieces.corners[3];
        pieces.corners[3] = tab[0];

        tab[1] = pieces.edges[3];
        pieces.edges[3] = pieces.edges[pieceToChange];
        pieces.edges[pieceToChange] = tab[1];

        if (changeOrientation === 1) {
            pieces.edges[3].orientation = (pieces.edges[3].orientation + 1) % 2
            pieces.edges[pieceToChange].orientation = (pieces.edges[pieceToChange].orientation + 1) % 2
        }
        return pieces;
    }

    moveCornerOP(pieces, pieceToChange, changeOrientation = 1) {
        let tab = [];

        tab[0] = pieces.corners[1];
        pieces.corners[1] = pieces.corners[pieceToChange];
        pieces.corners[pieceToChange] = tab[0];

        tab[1] = pieces.edges[1];
        pieces.edges[1] = pieces.edges[2];
        pieces.edges[2] = tab[1];

        // if (changeOrientation === 1) {
        //     pieces.corners[1].orientation = (pieces.corners[1].orientation + 1) % 3
        //     pieces.corners[pieceToChange].orientation = (pieces.corners[pieceToChange].orientation + 1) % 3
        // }
        return pieces;
    }
}