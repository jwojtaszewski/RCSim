class BuildCube {
    constructor() {
        this.piecesTable = [];
        const buildPiece = new BuildPiece();
        this.corUBL = buildPiece.makeCorner(["blue", "black", "red"]);
        this.corUBL.name = 'UBL';
        this.corUBR = buildPiece.makeCorner(["red", "black", "green"]);
        this.corUBR.name = 'UBR';
        this.corDBL = buildPiece.makeCorner(["red", "yellow", "blue"]);
        this.corDBR = buildPiece.makeCorner(["green", "yellow", "red"]);
        this.corDBR.name = 'DBR';

        this.corUFL = buildPiece.makeCorner(["orange", "black", "blue"]);
        this.corUFL.name = 'UFL';
        this.corUFR = buildPiece.makeCorner(["green", "black", "orange"]);
        this.corUFR.name = 'UFR';
        this.corDFL = buildPiece.makeCorner(["blue", "yellow", "orange"]);
        this.corDFR = buildPiece.makeCorner(["orange", "yellow", "green"]);
        this.corDFR.name = 'DFR';

        this.piecesTable.push(this.corUFL)
        this.piecesTable.push(this.corUBL)
        this.piecesTable.push(this.corUBR)
        this.piecesTable.push(this.corUFR)

        this.piecesTable.push(this.corDFL)
        this.piecesTable.push(this.corDBL)
        this.piecesTable.push(this.corDBR)
        this.piecesTable.push(this.corDFR)

        this.piecesTable = this.poisitioning(this.piecesTable);

        this.piecesTable[0].rotation.y = Math.PI;
        this.piecesTable[1].rotation.y = Math.PI / 2;
        this.piecesTable[2].rotation.y = 0;
        this.piecesTable[3].rotation.y = -Math.PI / 2;

        this.piecesTable[4].rotation.x = Math.PI;
        this.piecesTable[5].rotation.x = Math.PI;
        this.piecesTable[6].rotation.x = Math.PI;
        this.piecesTable[7].rotation.x = Math.PI;

        this.piecesTable[4].rotation.y = Math.PI / 2;
        this.piecesTable[5].rotation.y = Math.PI;
        this.piecesTable[6].rotation.y = -Math.PI / 2;
        this.piecesTable[7].rotation.y = 0

    }

    getCube() {
        return this.piecesTable;
    }

    doUMove(pieces) {

        let tab = [];

        tab[0] = pieces[0];
        pieces[0] = pieces[3];
        pieces[3] = pieces[2];
        pieces[2] = pieces[1];
        pieces[1] = tab[0];

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

    // resetCube(pieces) {

    //     pieces = this.piecesTable;
    //     pieces = this.poisitioning(pieces);
    //     return pieces;
    // }

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

    poisitioning(pieces) {
        pieces[1].position.set(-20, 20, -20);
        pieces[2].position.set(20, 20, -20);
        pieces[5].position.set(-20, -20, -20);
        pieces[6].position.set(20, -20, -20);

        pieces[0].position.set(-20, 20, 20);
        pieces[3].position.set(20, 20, 20);
        pieces[4].position.set(-20, -20, 20);
        pieces[7].position.set(20, -20, 20);

        return pieces;
    }
}