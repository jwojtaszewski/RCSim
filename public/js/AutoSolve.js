class AutoSolve {
    constructor(piecesArr) {
        this.permT = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permY = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permJPrime = ["R'", "U'", "R'", "U", "L'", "U2", "R", "U'", "R'", "U2", "R"];
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
        let i = 0;
        do {
            console.log(this.piecesTab);
            this.edgeToSolve = this.checkOrder();
            this.edgeToSolve !== null ? this.doCycle(this.edgeToSolve) : '';
            i++;
        } while (i != 2)
        return this.movesToSolve;
    }

    checkOrder() {
        const bufor = this.piecesTab.edges[3];
        if (bufor.cube.name !== 'UR') {
            return bufor.cube.name;
        } else {
            return this.findUnsolvedEdge();
            // if (bufor.orirentation === 0) {
            //     return this.findUnsolvedEdge();
            // } else {

            // }
        }
    }

    findUnsolvedEdge() {
        this.piecesTab.edges.forEach((el, i) => {
            if ((el.cube.name !== this.edgesOrder[i]) || (el.orirentation !== 0)) {
                return el.cube.name;
            } else {
                this.areEdgesSolved = true;
                this.isSolved = true; //   tymczasowo 
                return null;
            }
        });
    }

    arePiecesOriented(pieces) {
        pieces.forEach(el => {
            if (el.orirentation !== 0) {
                return false;
            }
        })
        return true;
    }

    doCycle(piece) {
        const movement = new Movement();
        switch (piece) {
            case 'UF': {
                this.movesToSolve = this.movesToSolve.concat(this.permJ);
                this.piecesTab = movement.movePiece(this.piecesTab, 0);
                break;
            }
            case 'UL': {
                this.movesToSolve = this.movesToSolve.concat(this.permT)
                this.piecesTab = movement.movePiece(this.piecesTab, 1);
                break;
            }
            case 'UB': {
                this.movesToSolve = this.movesToSolve.concat(this.permJPrime)
                this.piecesTab = movement.movePiece(this.piecesTab, 2);
                break;
            }
            case 'FR': {
                this.movesToSolve = this.movesToSolve.concat(["D2", "E2", "L"]).concat(this.permT).concat(["L'", "D2", "E2"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 4);
                break;
            }
            case 'FL': {
                this.movesToSolve = this.movesToSolve.concat(["L'"]).concat(this.permT).concat(["L"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 5);
                break;
            }
            case 'BL': {
                this.movesToSolve = this.movesToSolve.concat(["L"]).concat(this.permT).concat(["L'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 6);
                break;
            }
            case 'BR': {
                this.movesToSolve = this.movesToSolve.concat(["D2", "E2", "L'"]).concat(this.permT).concat(["L", "E2", "D2"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 7);
                break;
            }
            case 'DF': {
                this.movesToSolve = this.movesToSolve.concat(["D'", "L2"]).concat(this.permT).concat(["L2", "D"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 8);
                break;
            }
            case 'DL': {
                this.movesToSolve = this.movesToSolve.concat(["L2"]).concat(this.permT).concat(["L2"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 9);
                break;
            }
            case 'DB': {
                this.movesToSolve = this.movesToSolve.concat(["D", "L2"]).concat(this.permT).concat(["L2", "D'"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 10);
                break;
            }
            case 'DR': {
                this.movesToSolve = this.movesToSolve.concat(["D2", "L2"]).concat(this.permT).concat(["L2", "D2"]);
                this.piecesTab = movement.movePiece(this.piecesTab, 11);
                break;
            }
        }
    }
}