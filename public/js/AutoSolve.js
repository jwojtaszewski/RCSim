class AutoSolve {
    constructor(piecesArr) {
        this.permT = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permY = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permJPrime = ["L", "U'", "R'", "U", "L'", "U2", "R", "U'", "R'", "U2", "R"];
        this.permJ = ["R", "U", "R'", "F'", "R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'"];
        this.edgesOrder = ["UF", "UL", "UB", "UR", "FR", "FL", "BL", "BR", "DF", "DL", "DB", "DR"];
        this.cornersOrder = ["UFL", "UBL", "UBR", "UFR", "DFL", "DBL", "DBR", "DFR"];
        this.piecesTab = piecesArr;
        this.isSolved = false;
        this.areEdgesSolved = false;
        this.areCornersSolved = false;
        this.edgeToSolve;
        this.movesToSolve = [];
    }

    solveLoop() {
        do {
            this.edgeToSolve = this.checkOrder();
            this.edgeToSolve !== null ? this.doCycle(this.edgeToSolve) : null;
        } while (!this.areEdgesSolved)
        return this.movesToSolve;
    }

    checkOrder() {
        const bufor = this.piecesTab.edges[3];
        if (bufor.cube.object.name !== 'UR') {
            return bufor;
        } else {
            return this.findUnsolvedEdge();
            // if (bufor.orientation === 0) {
            //     return this.findUnsolvedEdge();
            // } else {

            // }
        }
    }

    findUnsolvedEdge() {
        let returnEdge = null;
        this.areEdgesSolved = true;
        this.piecesTab.edges.some((el, i) => {
            // if ((el.cube.object.name !== this.edgesOrder[i]) || (el.orientation !== 0)) {
            if ((el.cube.object.name !== this.edgesOrder[i])) {
                this.areEdgesSolved = false;
                returnEdge = this.getPiece(this.edgesOrder[i]);
            }
        });
        return returnEdge;
    }

    getPiece(name) {
        return this.piecesTab.edges.filter(el => el.cube.object.name === name)[0];
    }

    //TODO
    arePiecesOriented(pieces) {
        pieces.forEach(el => {
            if (el.orientation !== 0) {
                return false;
            }
        })
        return true;
    }

    doCycle(piece) {
        const movement = new Movement();
        let orientation = piece.orientation;
        switch (piece.cube.object.name) {
            case 'UF': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(this.permJ) :
                    this.movesToSolve = this.movesToSolve.concat(["M'"]).concat(this.permJPrime).concat(["M"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 0);
                break;
            }
            case 'UL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(this.permT) :
                    this.movesToSolve = this.movesToSolve.concat(["L'", "E", "L'"]).concat(this.permT).concat(["L", "E'", "L"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 1);
                break;
            }
            case 'UB': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(this.permJPrime) :
                    this.movesToSolve = this.movesToSolve.concat(["M"]).concat(this.permJ).concat(["M'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 2);
                break;
            }
            case 'FR': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["E2", "L"]).concat(this.permT).concat(["L'", "E2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E'", "L'"]).concat(this.permT).concat(["L", "E"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 4);
                break;
            }
            case 'FL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["L'"]).concat(this.permT).concat(["L"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E'", "L"]).concat(this.permT).concat(["L'", "E"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 5);
                break;
            }
            case 'BL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["L"]).concat(this.permT).concat(["L'"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E", "L'"]).concat(this.permT).concat(["L", "E'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 6);
                break;
            }
            case 'BR': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["E2", "L'"]).concat(this.permT).concat(["L", "E2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E", "L"]).concat(this.permT).concat(["L'", "E'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 7);
                break;
            }
            case 'DF': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["D'", "L2"]).concat(this.permT).concat(["L2", "D"]) :
                    this.movesToSolve = this.movesToSolve.concat(["M'"]).concat(this.permJ).concat(["M"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 8);
                break;
            }
            case 'DL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["L2"]).concat(this.permT).concat(["L2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["D", "M'"]).concat(this.permJ).concat(["M", "D'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 9);
                break;
            }
            case 'DB': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["D", "L2"]).concat(this.permT).concat(["L2", "D'"]) :
                    this.movesToSolve = this.movesToSolve.concat(["M"]).concat(this.permJPrime).concat(["M'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 10);
                break;
            }
            case 'DR': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["D2", "L2"]).concat(this.permT).concat(["L2", "D2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["D'", "M'"]).concat(this.permJ).concat(["M", "D"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 11);
                break;
            }
        }
    }
}