class BuildCube {
    constructor() {
        this.piecesTable = [];
        const buildPiece = new BuildPiece();
        this.corUBL = buildPiece.makeCorner(["red", "blue", "white"]);
        this.corUBR = buildPiece.makeCorner(["red", "white", "green"]);
        this.corDBL = buildPiece.makeCorner(["red", "yellow", "blue"]);
        this.corDBR = buildPiece.makeCorner(["red", "green", "yellow"]);

        this.corUFL = buildPiece.makeCorner(["orange", "white", "blue"]);
        this.corUFR = buildPiece.makeCorner(["orange", "green", "white"]);
        this.corDFL = buildPiece.makeCorner(["orange", "blue", "yellow"]);
        this.corDFR = buildPiece.makeCorner(["orange", "yellow", "green"]);


        this.corUBL.position.set(-20, 20, -20);
        this.corUBR.position.set(20, 20, -20);
        this.corDBL.position.set(-20, -20, -20);
        this.corDBR.position.set(20, -20, -20);

        this.corUFL.position.set(-20, 20, 20);
        this.corUFR.position.set(20, 20, 20);
        this.corDFL.position.set(-20, -20, 20);
        this.corDFR.position.set(20, -20, 20);

        this.corUBL.rotation.z = Math.PI / 2
        this.corDBL.rotation.z = Math.PI
        this.corDBR.rotation.z = -Math.PI / 2

        this.corUFL.rotation.y = Math.PI
        this.corDFL.rotation.x = Math.PI
        this.corDFL.rotation.z = Math.PI / 2

        this.corUFR.rotation.z = Math.PI / 2
        this.corUFR.rotation.y = Math.PI

        this.corDFR.rotation.x = Math.PI

        this.piecesTable.push(this.corUFL)
        this.piecesTable.push(this.corUBL)
        this.piecesTable.push(this.corUBR)
        this.piecesTable.push(this.corUFR)

        this.piecesTable.push(this.corDFL)
        this.piecesTable.push(this.corDBL)
        this.piecesTable.push(this.corDBR)
        this.piecesTable.push(this.corDFR)
    }

    getCube() {
        return this.piecesTable;
    }

    doUMove() {
        const movement = new Movement();
        console.log(this.piecesTable[0])
        console.log(this.piecesTable[1])

        let x = [];
        x[0] = this.piecesTable[0].position.x;
        x[1] = this.piecesTable[0].position.y;
        x[2] = this.piecesTable[0].position.z;

        this.piecesTable[0].position.set(this.piecesTable[1].position.x, this.piecesTable[1].position.y, this.piecesTable[1].position.z);
        this.piecesTable[1].position.set(this.piecesTable[2].position.x, this.piecesTable[2].position.y, this.piecesTable[2].position.z);
        this.piecesTable[2].position.set(this.piecesTable[3].position.x, this.piecesTable[3].position.y, this.piecesTable[3].position.z);
        this.piecesTable[3].position.set(x[0], x[1], x[2]);

        this.piecesTable[0].rotation.y += -Math.PI / 2;
        this.piecesTable[1].rotation.y += -Math.PI / 2;
        this.piecesTable[2].rotation.y += -Math.PI / 2;
        this.piecesTable[3].rotation.y += -Math.PI / 2;

        let tab = []
        tab[0] = this.piecesTable[0]
        this.piecesTable[0] = this.piecesTable[3]
        this.piecesTable[3] = this.piecesTable[2]
        this.piecesTable[2] = this.piecesTable[1]
        this.piecesTable[1] = tab[0]

        // this.piecesTable = movement.uMove(this.piecesTable)
        // console.log(this.piecesTable[0])

    }
    doRMove() {
        let x = [];
        x[0] = this.piecesTable[3].position.x;
        x[1] = this.piecesTable[3].position.y;
        x[2] = this.piecesTable[3].position.z;

        this.piecesTable[3].position.set(this.piecesTable[2].position.x, this.piecesTable[2].position.y, this.piecesTable[2].position.z);
        this.piecesTable[2].position.set(this.piecesTable[6].position.x, this.piecesTable[6].position.y, this.piecesTable[6].position.z);
        this.piecesTable[6].position.set(this.piecesTable[7].position.x, this.piecesTable[7].position.y, this.piecesTable[7].position.z);
        this.piecesTable[7].position.set(x[0], x[1], x[2]);

        this.piecesTable[6].rotation.x += -Math.PI / 2;
        this.piecesTable[7].rotation.x += -Math.PI / 2;
        this.piecesTable[2].rotation.x += -Math.PI / 2;
        this.piecesTable[3].rotation.x += -Math.PI / 2

        let tab = []
        tab[0] = this.piecesTable[3]
        this.piecesTable[3] = this.piecesTable[7]
        this.piecesTable[7] = this.piecesTable[6]
        this.piecesTable[6] = this.piecesTable[2]
        this.piecesTable[2] = tab[0]

        // this.piecesTable = movement.uMove(this.piecesTable)
        // console.log(this.piecesTable[0])

    }
}