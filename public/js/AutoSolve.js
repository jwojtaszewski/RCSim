class AutoSolve {
    constructor(piecesTable) {
        this.permT = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permY = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permJPrime = ["R'", "U'", "R'", "U", "L'", "U2", "R", "U'", "R'", "U2", "R"];
        this.permJ = ["R", "U", "R'", "F'", "R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'"];
        this.edgesOrder = ["UF", "UL", "UB", "UR", "FR", "FL", "BL", "BR", "DF", "DL", "DB", "DR"];
        this.cornersOrder = ["UFL", "UBL", "UBR", "UFR", "DFL", "DBL", "DBR", "DFR"];
        this.piecesTable = piecesTable;
        this.isSolved = false;
        this.areEdgesSolved = false;
        this.areCornersSolved = false;
        this.edgeToSolve;
        this.movesToSolve = [];
    }

    solveLoop() {
        let i = 0;
        do {
            this.edgeToSolve = this.checkOrder();
            this.edgeToSolve !== null ? this.doCycle(this.edgeToSolve) : '';
            i++;
            console.log(i);
        } while (i != 10)
        console.log(this.movesToSolve);
        return this.movesToSolve;
    }

    checkOrder() {
        const bufor = this.piecesTable.edges[3];
        if (bufor.cube.name !== 'UR') {
            return bufor;
        } else {
            return this.findUnsolvedEdge();
            // if (bufor.orirentation === 0) {
            //     return this.findUnsolvedEdge();
            // } else {

            // }
        }
    }

    findUnsolvedEdge() {
        this.piecesTable.edges.forEach((el, i) => {
            if ((el.cube.name !== this.edgesOrder[i]) || (el.orirentation !== 0)) {
                return el;
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
        switch (piece.cube.name) {
            case 'UF': {
                this.movesToSolve = [...this.movesToSolve, this.permJ];
                break;
            }
            case 'UL': {
                this.movesToSolve = [...this.movesToSolve, this.permT];
                break;
            }
            case 'UB': {
                this.movesToSolve = [...this.movesToSolve, this.permJPrime];
                break;
            }
            case 'FR': {
                this.movesToSolve = [...this.movesToSolve, ["D2", "E2", "L", this.permT, "L'", "E'", "D"]];
                break;
            }
            case 'FL': {
                this.movesToSolve = [...this.movesToSolve, ["L'", this.permT, "L"]];
                break;
            }
            case 'BL': {
                this.movesToSolve = [...this.movesToSolve, ["L", this.permT, "L'"]];
                break;
            }
            case 'BR': {
                this.movesToSolve = [...this.movesToSolve, ["D2", "E2", "L'", this.permT, "L", "E2", "D2"]];
                break;
            }
            case 'DF': {
                this.movesToSolve = [...this.movesToSolve, ["D'", "L2", this.permT, "L2", "D"]];
                break;
            }
            case 'DL': {
                this.movesToSolve = [...this.movesToSolve, ["L2", this.permT, "L2"]];
                break;
            }
            case 'DB': {
                this.movesToSolve = [...this.movesToSolve, ["D", "L2", this.permT, "L2", "D"]];
                break;
            }
            case 'DR': {
                this.movesToSolve = [...this.movesToSolve, ["D2", "L2", this.permT, "L2", "D2"]];
                break;
            }
        }
    }
}