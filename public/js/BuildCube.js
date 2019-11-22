class BuildCube {
    constructor() {
        this.piecesTable = [];
        const buildPiece = new BuildPiece();
        this.corUBL = {
            cube: buildPiece.makeCorner(["blue", "black", "red"], 'UBL'),
            orientation: 0
        };

        this.corUBR = {
            cube: buildPiece.makeCorner(["red", "black", "green"], 'UBR'),
            orientation: 0
        }
        this.corDBL = {
            cube: buildPiece.makeCorner(["red", "yellow", "blue"], 'DBL'),
            orientation: 0
        };

        this.corDBR = {
            cube: buildPiece.makeCorner(["green", "yellow", "red"], 'DBR'),
            orientation: 0
        }
        this.corUFL = {
            cube: buildPiece.makeCorner(["orange", "black", "blue"], 'UFL'),
            orientation: 0
        };

        this.corUFR = {
            cube: buildPiece.makeCorner(["green", "black", "orange"], 'UFR'),
            orientation: 0
        }
        this.corDFL = {
            cube: buildPiece.makeCorner(["blue", "yellow", "orange"], 'DFL'),
            orientation: 0
        };

        this.corDFR = {
            cube: buildPiece.makeCorner(["orange", "yellow", "green"], 'DFR'),
            orientation: 0
        }


        this.piecesTable.push(this.corUFL)
        this.piecesTable.push(this.corUBL)
        this.piecesTable.push(this.corUBR)
        this.piecesTable.push(this.corUFR)

        this.piecesTable.push(this.corDFL)
        this.piecesTable.push(this.corDBL)
        this.piecesTable.push(this.corDBR)
        this.piecesTable.push(this.corDFR)

        this.piecesTable[1].cube.position.set(-20, 20, -20);
        this.piecesTable[2].cube.position.set(20, 20, -20);
        this.piecesTable[5].cube.position.set(-20, -20, -20);
        this.piecesTable[6].cube.position.set(20, -20, -20);

        this.piecesTable[0].cube.position.set(-20, 20, 20);
        this.piecesTable[3].cube.position.set(20, 20, 20);
        this.piecesTable[4].cube.position.set(-20, -20, 20);
        this.piecesTable[7].cube.position.set(20, -20, 20);

        this.piecesTable[0].cube.rotation.y = Math.PI;
        this.piecesTable[1].cube.rotation.y = Math.PI / 2;
        this.piecesTable[2].cube.rotation.y = 0;
        this.piecesTable[3].cube.rotation.y = -Math.PI / 2;

        this.piecesTable[4].cube.rotation.x = Math.PI;
        this.piecesTable[5].cube.rotation.x = Math.PI;
        this.piecesTable[6].cube.rotation.x = Math.PI;
        this.piecesTable[7].cube.rotation.x = Math.PI;

        this.piecesTable[4].cube.rotation.y = Math.PI / 2;
        this.piecesTable[5].cube.rotation.y = Math.PI;
        this.piecesTable[6].cube.rotation.y = -Math.PI / 2;
        this.piecesTable[7].cube.rotation.y = 0

    }

    getCube() {
        return this.piecesTable;
    }


}