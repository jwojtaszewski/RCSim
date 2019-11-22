class Movement {
    constructor() {}

    doUMove(pieces) {

        let tab = [];
        tab[0] = pieces[0];
        pieces[0] = pieces[3];
        pieces[3] = pieces[2];
        pieces[2] = pieces[1];
        pieces[1] = tab[0];

        pieces[0].orientation = pieces[0].orientation
        pieces[1].orientation = pieces[1].orientation
        pieces[2].orientation = pieces[2].orientation
        pieces[3].orientation = pieces[3].orientation

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'U', -Math.PI / 2);

        return pieces;
    }

    doRMove(pieces) {

        let tab = []
        tab[0] = pieces[3]
        pieces[3] = pieces[7]
        pieces[7] = pieces[6]
        pieces[6] = pieces[2]
        pieces[2] = tab[0]

        pieces[3].orientation = (pieces[3].orientation + 1) % 3
        pieces[7].orientation = (pieces[7].orientation + 2) % 3
        pieces[6].orientation = (pieces[6].orientation + 1) % 3
        pieces[2].orientation = (pieces[2].orientation + 2) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'R', -Math.PI / 2);

        return pieces;
    }

    doRPrimeMove(pieces) {

        let tab = [];
        tab[0] = pieces[3]
        pieces[3] = pieces[2]
        pieces[2] = pieces[6]
        pieces[6] = pieces[7]
        pieces[7] = tab[0]

        pieces[3].orientation = (pieces[3].orientation + 1) % 3
        pieces[7].orientation = (pieces[7].orientation + 2) % 3
        pieces[6].orientation = (pieces[6].orientation + 1) % 3
        pieces[2].orientation = (pieces[2].orientation + 2) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'R', Math.PI / 2);
        return pieces;
    }

    doUPrimeMove(pieces) {

        let tab = []
        tab[0] = pieces[0];
        pieces[0] = pieces[1];
        pieces[1] = pieces[2];
        pieces[2] = pieces[3];
        pieces[3] = tab[0];

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'U', Math.PI / 2);

        return pieces;
    }
    doLMove(pieces) {

        let tab = [];
        tab[0] = pieces[0];
        pieces[0] = pieces[1];
        pieces[1] = pieces[5];
        pieces[5] = pieces[4];
        pieces[4] = tab[0];

        pieces[0].orientation = (pieces[0].orientation + 2) % 3
        pieces[1].orientation = (pieces[1].orientation + 1) % 3
        pieces[4].orientation = (pieces[4].orientation + 1) % 3
        pieces[5].orientation = (pieces[5].orientation + 2) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'L', Math.PI / 2);
        return pieces;
    }

    doLPrimeMove(pieces) {

        let tab = []
        tab[0] = pieces[0];
        pieces[0] = pieces[4];
        pieces[4] = pieces[5];
        pieces[5] = pieces[1];
        pieces[1] = tab[0];

        pieces[0].orientation = (pieces[0].orientation + 2) % 3
        pieces[1].orientation = (pieces[1].orientation + 1) % 3
        pieces[4].orientation = (pieces[4].orientation + 1) % 3
        pieces[5].orientation = (pieces[5].orientation + 2) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'L', -Math.PI / 2);

        return pieces;
    }

    doFMove(pieces) {

        let tab = [];
        tab[0] = pieces[0];
        pieces[0] = pieces[4];
        pieces[4] = pieces[7];
        pieces[7] = pieces[3];
        pieces[3] = tab[0];

        pieces[0].orientation = (pieces[0].orientation + 1) % 3
        pieces[3].orientation = (pieces[3].orientation + 2) % 3
        pieces[4].orientation = (pieces[4].orientation + 2) % 3
        pieces[7].orientation = (pieces[7].orientation + 1) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'F', -Math.PI / 2);
        return pieces;
    }

    doFPrimeMove(pieces) {

        let tab = []
        tab[0] = pieces[0];
        pieces[0] = pieces[3];
        pieces[3] = pieces[7];
        pieces[7] = pieces[4];
        pieces[4] = tab[0];

        pieces[0].orientation = (pieces[0].orientation + 1) % 3
        pieces[3].orientation = (pieces[3].orientation + 2) % 3
        pieces[4].orientation = (pieces[4].orientation + 2) % 3
        pieces[7].orientation = (pieces[7].orientation + 1) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'F', Math.PI / 2);

        return pieces;
    }

    doDMove(pieces) {

        let tab = [];
        tab[0] = pieces[4];
        pieces[4] = pieces[5];
        pieces[5] = pieces[6];
        pieces[6] = pieces[7];
        pieces[7] = tab[0];

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'D', Math.PI / 2);
        return pieces;
    }

    doDPrimeMove(pieces) {

        let tab = []
        tab[0] = pieces[4];
        pieces[4] = pieces[7];
        pieces[7] = pieces[6];
        pieces[6] = pieces[5];
        pieces[5] = tab[0];

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'D', -Math.PI / 2);

        return pieces;
    }

    doBMove(pieces) {

        let tab = [];
        tab[0] = pieces[1];
        pieces[1] = pieces[2];
        pieces[2] = pieces[6];
        pieces[6] = pieces[5];
        pieces[5] = tab[0];

        pieces[1].orientation = (pieces[1].orientation + 2) % 3
        pieces[2].orientation = (pieces[2].orientation + 1) % 3
        pieces[5].orientation = (pieces[5].orientation + 1) % 3
        pieces[6].orientation = (pieces[6].orientation + 2) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'B', Math.PI / 2);
        return pieces;
    }

    doBPrimeMove(pieces) {

        let tab = []
        tab[0] = pieces[1];
        pieces[1] = pieces[5];
        pieces[5] = pieces[6];
        pieces[6] = pieces[2];
        pieces[2] = tab[0];

        pieces[1].orientation = (pieces[1].orientation + 2) % 3
        pieces[2].orientation = (pieces[2].orientation + 1) % 3
        pieces[5].orientation = (pieces[5].orientation + 1) % 3
        pieces[6].orientation = (pieces[6].orientation + 2) % 3

        pieces = this.poisitioning(pieces);
        pieces = this.rotatePiece(pieces, 'B', -Math.PI / 2);

        return pieces;
    }

    doYRotate(pieces) {

        pieces = this.doUMove(pieces);
        pieces = this.doDPrimeMove(pieces);
        return pieces;
    }

    doYPrimeRotate(pieces) {

        pieces = this.doUPrimeMove(pieces);
        pieces = this.doDMove(pieces);

        return pieces;
    }

    doXRotate(pieces) {

        pieces = this.doRMove(pieces);
        pieces = this.doLPrimeMove(pieces);
        return pieces;
    }

    doXPrimeRotate(pieces) {

        pieces = this.doRPrimeMove(pieces);
        pieces = this.doLMove(pieces);

        return pieces;
    }

    rotatePiece(pieces, axis, angle) {
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

    // movePiecesInArray(pieces, [p1,p2,p3,p4]){
    //     let tab = []
    //     tab[0] = pieces[p1];
    //     pieces[p1] = pieces[p2];
    //     pieces[p2] = pieces[p3];
    //     pieces[p3] = pieces[p4];
    //     pieces[p4] = tab[0];
    // }

    poisitioning(pieces) {
        pieces[1].cube.position.set(-20, 20, -20);
        pieces[2].cube.position.set(20, 20, -20);
        pieces[5].cube.position.set(-20, -20, -20);
        pieces[6].cube.position.set(20, -20, -20);

        pieces[0].cube.position.set(-20, 20, 20);
        pieces[3].cube.position.set(20, 20, 20);
        pieces[4].cube.position.set(-20, -20, 20);
        pieces[7].cube.position.set(20, -20, 20);

        return pieces;
    }
}