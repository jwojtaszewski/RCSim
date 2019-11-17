class BuildCube {
    constructor() {
        this.piecesTable = [];
        const buildPiece = new BuildPiece();
        this.corUBL = buildPiece.makeCorner(["blue", "black", "red"]);
        this.corUBL.name = 'UBL';
        this.corUBR = buildPiece.makeCorner(["red", "black", "green"]);
        this.corUBR.name = 'UBR';
        this.corDBL = buildPiece.makeCorner(["red", "yellow", "blue"]);
        this.corDBL.name = 'DBL';
        this.corDBR = buildPiece.makeCorner(["green", "yellow", "red"]);
        this.corDBR.name = 'DBR';

        this.corUFL = buildPiece.makeCorner(["orange", "black", "blue"]);
        this.corUFL.name = 'UFL';
        this.corUFR = buildPiece.makeCorner(["green", "black", "orange"]);
        this.corUFR.name = 'UFR';
        this.corDFL = buildPiece.makeCorner(["blue", "yellow", "orange"]);
        this.corDFL.name = 'DFL';
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

        this.piecesTable[1].position.set(-20, 20, -20);
        this.piecesTable[2].position.set(20, 20, -20);
        this.piecesTable[5].position.set(-20, -20, -20);
        this.piecesTable[6].position.set(20, -20, -20);

        this.piecesTable[0].position.set(-20, 20, 20);
        this.piecesTable[3].position.set(20, 20, 20);
        this.piecesTable[4].position.set(-20, -20, 20);
        this.piecesTable[7].position.set(20, -20, 20);

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


}