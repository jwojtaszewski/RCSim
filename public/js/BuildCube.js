class BuildCube {
    constructor() {
        this.cornerArray = [];
        this.edgeArray = [];
        this.centersArray = [];

        const buildPiece = new BuildPiece();
        this.corUBL = {
            cube: buildPiece.makeCorner(["blue", "black", "red"], 'UBL'),
            orientation: 0
        };

        this.corUBR = {
            cube: buildPiece.makeCorner(["red", "black", "#00cc00"], 'UBR'),
            orientation: 0
        }
        this.corDBL = {
            cube: buildPiece.makeCorner(["red", "yellow", "blue"], 'DBL'),
            orientation: 0
        };

        this.corDBR = {
            cube: buildPiece.makeCorner(["#00cc00", "yellow", "red"], 'DBR'),
            orientation: 0
        }
        this.corUFL = {
            cube: buildPiece.makeCorner(["orange", "black", "blue"], 'UFL'),
            orientation: 0
        };

        this.corUFR = {
            cube: buildPiece.makeCorner(["#00cc00", "black", "orange"], 'UFR'),
            orientation: 0
        }
        this.corDFL = {
            cube: buildPiece.makeCorner(["blue", "yellow", "orange"], 'DFL'),
            orientation: 0
        };

        this.corDFR = {
            cube: buildPiece.makeCorner(["orange", "yellow", "#00cc00"], 'DFR'),
            orientation: 0
        }
        //--------------------------------------------------------------------------------edges
        this.edgeUF = {
            cube: buildPiece.makeEdge(["black", "orange"], 'UF'),
            orientation: 0
        };

        this.edgeUL = {
            cube: buildPiece.makeEdge(["blue", "black"], 'UL'),
            orientation: 0
        }
        this.edgeUB = {
            cube: buildPiece.makeEdge(["red", "black"], 'UB'),
            orientation: 0
        };

        this.edgeUR = {
            cube: buildPiece.makeEdge(["#00cc00", "black"], 'UR'),
            orientation: 0
        }
        this.edgeFR = {
            cube: buildPiece.makeEdge(["orange", "#00cc00"], 'FR'),
            orientation: 0
        };

        this.edgeFL = {
            cube: buildPiece.makeEdge(["orange", "blue"], 'FL'),
            orientation: 0
        }
        this.edgeBL = {
            cube: buildPiece.makeEdge(["blue", "red"], 'BL'),
            orientation: 0
        };

        this.edgeBR = {
            cube: buildPiece.makeEdge(["#00cc00", "red"], 'BR'),
            orientation: 0
        }

        this.edgeDF = {
            cube: buildPiece.makeEdge(["orange", "yellow"], 'DF'),
            orientation: 0
        };

        this.edgeDL = {
            cube: buildPiece.makeEdge(["yellow", "blue"], 'DL'),
            orientation: 0
        }
        this.edgeDB = {
            cube: buildPiece.makeEdge(["yellow", "red"], 'DB'),
            orientation: 0
        };

        this.edgeDR = {
            cube: buildPiece.makeEdge(["yellow", "#00cc00"], 'DR'),
            orientation: 0
        }

        //--------------------------------------------------------centers

        this.centerU = buildPiece.makeCenter("black", 'U');
        this.centerF = buildPiece.makeCenter("orange", 'F');
        this.centerL = buildPiece.makeCenter("blue", 'L');
        this.centerB = buildPiece.makeCenter("red", 'B');
        this.centerR = buildPiece.makeCenter("#00cc00", 'R');
        this.centerD = buildPiece.makeCenter("yellow", 'D');

        //------------------------------------------------------------------------

        this.cornerArray.push(this.corUFL)
        this.cornerArray.push(this.corUBL)
        this.cornerArray.push(this.corUBR)
        this.cornerArray.push(this.corUFR)

        this.cornerArray.push(this.corDFL)
        this.cornerArray.push(this.corDBL)
        this.cornerArray.push(this.corDBR)
        this.cornerArray.push(this.corDFR)


        this.cornerArray[1].cube.position.set(-30, 30, -30);
        this.cornerArray[2].cube.position.set(30, 30, -30);
        this.cornerArray[5].cube.position.set(-30, -30, -30);
        this.cornerArray[6].cube.position.set(30, -30, -30);

        this.cornerArray[0].cube.position.set(-30, 30, 30);
        this.cornerArray[3].cube.position.set(30, 30, 30);
        this.cornerArray[4].cube.position.set(-30, -30, 30);
        this.cornerArray[7].cube.position.set(30, -30, 30);

        this.cornerArray[0].cube.rotation.y = Math.PI;
        this.cornerArray[1].cube.rotation.y = Math.PI / 2;
        this.cornerArray[2].cube.rotation.y = 0;
        this.cornerArray[3].cube.rotation.y = -Math.PI / 2;

        this.cornerArray[4].cube.rotation.x = Math.PI;
        this.cornerArray[5].cube.rotation.x = Math.PI;
        this.cornerArray[6].cube.rotation.x = Math.PI;
        this.cornerArray[7].cube.rotation.x = Math.PI;

        this.cornerArray[4].cube.rotation.y = Math.PI / 2;
        this.cornerArray[5].cube.rotation.y = Math.PI;
        this.cornerArray[6].cube.rotation.y = -Math.PI / 2;
        this.cornerArray[7].cube.rotation.y = 0

        //----------------------------------------------------

        this.edgeArray.push(this.edgeUF)
        this.edgeArray.push(this.edgeUL)
        this.edgeArray.push(this.edgeUB)
        this.edgeArray.push(this.edgeUR)

        this.edgeArray.push(this.edgeFR)
        this.edgeArray.push(this.edgeFL)
        this.edgeArray.push(this.edgeBL)
        this.edgeArray.push(this.edgeBR)

        this.edgeArray.push(this.edgeDF)
        this.edgeArray.push(this.edgeDL)
        this.edgeArray.push(this.edgeDB)
        this.edgeArray.push(this.edgeDR)


        this.edgeArray[1].cube.position.set(-30, 30, 0);
        this.edgeArray[2].cube.position.set(0, 30, -30);
        this.edgeArray[5].cube.position.set(-30, 0, 30);
        this.edgeArray[6].cube.position.set(-30, 0, -30);

        this.edgeArray[0].cube.position.set(0, 30, 30);
        this.edgeArray[3].cube.position.set(30, 30, 0);
        this.edgeArray[4].cube.position.set(30, 0, 30);
        this.edgeArray[7].cube.position.set(30, 0, -30);

        this.edgeArray[8].cube.position.set(0, -30, 30);
        this.edgeArray[9].cube.position.set(-30, -30, 0);
        this.edgeArray[10].cube.position.set(0, -30, -30);
        this.edgeArray[11].cube.position.set(30, -30, 0);

        this.edgeArray[0].cube.rotation.x = Math.PI;
        this.edgeArray[1].cube.rotation.x = Math.PI / 2;
        this.edgeArray[1].cube.rotation.z = -Math.PI / 2;
        this.edgeArray[2].cube.rotation.x = Math.PI / 2;
        this.edgeArray[3].cube.rotation.x = Math.PI / 2;
        this.edgeArray[3].cube.rotation.z = Math.PI / 2;
        this.edgeArray[4].cube.rotation.z = Math.PI / 2;
        this.edgeArray[4].cube.rotation.y = -Math.PI / 2;
        this.edgeArray[5].cube.rotation.y = Math.PI / 2;
        this.edgeArray[5].cube.rotation.z = -Math.PI / 2;
        this.edgeArray[6].cube.rotation.z = -Math.PI / 2;
        this.edgeArray[7].cube.rotation.z = Math.PI / 2;
        this.edgeArray[8].cube.rotation.x = -Math.PI / 2;
        this.edgeArray[9].cube.rotation.y = Math.PI / 2;
        this.edgeArray[11].cube.rotation.y = -Math.PI / 2;

        //--------------------------------------------------------------------

        this.centersArray.push(this.centerU)
        this.centersArray.push(this.centerL)
        this.centersArray.push(this.centerB)
        this.centersArray.push(this.centerR)
        this.centersArray.push(this.centerF)
        this.centersArray.push(this.centerD)

        this.centersArray[0].position.set(0, 44, 0);
        this.centersArray[1].position.set(-44, 0, 0);
        this.centersArray[2].position.set(0, 0, -44);
        this.centersArray[3].position.set(44, 0, 0);
        this.centersArray[4].position.set(0, 0, 44);
        this.centersArray[5].position.set(0, -44, 0);

        this.centersArray[1].rotation.y = Math.PI / 2;
        this.centersArray[2].rotation.x = Math.PI;
        this.centersArray[3].rotation.y = -Math.PI / 2;
        this.centersArray[4].rotation.x = -Math.PI
    }

    getCornerArray() {
        return this.cornerArray;
    }

    getEdgeArray() {
        return this.edgeArray;
    }

    getCenters() {
        return this.centersArray;
    }


}