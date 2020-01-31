class AutoSolve {
    constructor(piecesArr) {
        this.permT = ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
        this.permY = ["R", "U'", "R'", "U'", "R", "U", "R'", "F'", "R", "U", "R'", "U'", "R'", "F", "R"];
        this.permJPrime = ["L", "U'", "R'", "U", "L'", "U2", "R", "U'", "R'", "U2", "R"];
        this.permJ = ["R", "U", "R'", "F'", "R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'"];
        this.edgesOrder = ["UF", "UL", "UB", "UR", "FR", "FL", "BL", "BR", "DF", "DL", "DB", "DR"];
        this.cornersOrder = ["UFL", "UBL", "UBR", "UFR", "DFL", "DBL", "DBR", "DFR"];
        this.piecesTab = piecesArr;
        this.isSolved = false;
        this.areEdgesSolved = false;
        this.areCornersSolved = false;
        this.edgeToSolve;
        this.cornerToSolve;
        this.movesToSolve = [];
        this.numberOfCycles = 0;
        this.movement = new Movement();
    }

    solveLoop() {
        do {
            this.edgeToSolve = this.checkEdgesOrder();
            this.edgeToSolve !== null ? this.doEdgeCycle(this.edgeToSolve) : null;
            console.log(this.movesToSolve)
        } while (!this.areEdgesSolved)

        do {
            this.cornerToSolve = this.checkCornersOrder();
            this.cornerToSolve !== null ? this.doCornerCycle(this.cornerToSolve) : null;
        } while (!this.areCornersSolved)

        return this.movesToSolve;
    }

    checkEdgesOrder() {
        const bufor = this.piecesTab.edges[3];
        if (bufor.cube.object.name !== 'UR') {
            return bufor;
        } else {
            return this.findUnsolvedEdge();
        }
    }

    checkCornersOrder() {
        const bufor = this.piecesTab.corners[1];
        if (bufor.cube.object.name !== 'UBL') {
            return bufor;
        } else {
            return this.findUnsolvedCorner();
        }
    }

    findUnsolvedEdge() {
        let returnEdge = null;
        this.areEdgesSolved = true;
        for (let i = 0; i < this.piecesTab.edges.length; i++) {
            if ((this.piecesTab.edges[i].cube.object.name !== this.edgesOrder[i]) || (this.piecesTab.edges[i].orientation !== 0 && i !== 3)) {
                this.areEdgesSolved = false;
                returnEdge = this.piecesTab.edges[i];
                break;
            }
        }
        return returnEdge;
    }

    findUnsolvedCorner() {
        let returnCorner = null;
        this.areCornersSolved = true;
        for (let i = 0; i < this.piecesTab.corners.length; i++) {
            if ((this.piecesTab.corners[i].cube.object.name !== this.cornersOrder[i]) || (this.piecesTab.corners[i].orientation !== 0 && i !== 1)) {
                this.areCornersSolved = false;
                returnCorner = this.piecesTab.corners[i];
            }
        }
        return returnCorner;
    }

    getEdgePiece(name) {
        return this.piecesTab.edges.filter(el => el.cube.object.name === name)[0];
    }

    getCornerPiece(name) {
        return this.piecesTab.corners.filter(el => el.cube.object.name === name)[0];
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

    doEdgeCycle(piece) {
        let orientation = piece.orientation;
        this.numberOfCycles++;
        switch (piece.cube.object.name) {
            case 'UF': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(this.permJ) :
                    this.movesToSolve = this.movesToSolve.concat(["M'"]).concat(this.permJPrime).concat(["M"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 0, orientation);
                break;
            }
            case 'UL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(this.permT) :
                    this.movesToSolve = this.movesToSolve.concat(["L'", "E", "L'"]).concat(this.permT).concat(["L", "E'", "L"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 1, orientation);
                break;
            }
            case 'UB': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(this.permJPrime) :
                    this.movesToSolve = this.movesToSolve.concat(["M"]).concat(this.permJ).concat(["M'"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 2, orientation);
                break;
            }
            case 'FR': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["E2", "L"]).concat(this.permT).concat(["L'", "E2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E'", "L'"]).concat(this.permT).concat(["L", "E"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 4, orientation);
                break;
            }
            case 'FL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["L'"]).concat(this.permT).concat(["L"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E'", "L"]).concat(this.permT).concat(["L'", "E"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 5, orientation);
                break;
            }
            case 'BL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["L"]).concat(this.permT).concat(["L'"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E", "L'"]).concat(this.permT).concat(["L", "E'"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 6, orientation);
                break;
            }
            case 'BR': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["E2", "L'"]).concat(this.permT).concat(["L", "E2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["E", "L"]).concat(this.permT).concat(["L'", "E'"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 7, orientation);
                break;
            }
            case 'DF': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["D'", "L2"]).concat(this.permT).concat(["L2", "D"]) :
                    this.movesToSolve = this.movesToSolve.concat(["M'"]).concat(this.permJ).concat(["M"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 8, orientation);
                break;
            }
            case 'DL': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["L2"]).concat(this.permT).concat(["L2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["D", "M'"]).concat(this.permJ).concat(["M", "D'"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 9, orientation);
                break;
            }
            case 'DB': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["D", "L2"]).concat(this.permT).concat(["L2", "D'"]) :
                    this.movesToSolve = this.movesToSolve.concat(["M"]).concat(this.permJPrime).concat(["M'"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 10, orientation);
                break;
            }
            case 'DR': {
                orientation === 0 ? this.movesToSolve = this.movesToSolve.concat(["D2", "L2"]).concat(this.permT).concat(["L2", "D2"]) :
                    this.movesToSolve = this.movesToSolve.concat(["D'", "M'"]).concat(this.permJ).concat(["M", "D"]);
                this.piecesTab = movement.moveEdgeOP(this.piecesTab, 11, orientation);
                break;
            }
        }
    }

    doCornerCycle(piece) {
        let orientation = piece.orientation;
        this.numberOfCycles++;
        switch (piece.cube.object.name) {
            case 'UFL': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["F", "R'"]).concat(this.permY).concat(["R", "F'"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["F'", "D"]).concat(this.permY).concat(["D'", "F"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(["F2"]).concat(this.permY).concat(["F2"]);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 0, orientation);
                break;
            }
            case 'UBR': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["R", "D'"]).concat(this.permY).concat(["D", "R'"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["R'", "F"]).concat(this.permY).concat(["F'", "R"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(["R2"]).concat(this.permY).concat(["R2"]);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 2, orientation);
                break;
            }
            case 'UFR': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["F"]).concat(this.permY).concat(["F'"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["R'"]).concat(this.permY).concat(["R"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(["F2", "D"]).concat(this.permY).concat(["D'", "F2"]);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 3, orientation);
                break;
            }
            case 'DFL': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["F'"]).concat(this.permY).concat(["F"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["D2", "R"]).concat(this.permY).concat(["R'", "D2"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(["D"]).concat(this.permY).concat(["D'"]);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 4, orientation);
                break;
            }
            case 'DBL': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["D", "F'"]).concat(this.permY).concat(["F", "D'"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["D'", "R"]).concat(this.permY).concat(["R'", "D"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(["D2"]).concat(this.permY).concat(["D2"]);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 5, orientation);
                break;
            }
            case 'DBR': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["D2", "F'"]).concat(this.permY).concat(["F", "D2"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["R"]).concat(this.permY).concat(["R'"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(["D'"]).concat(this.permY).concat(["D"]);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 6, orientation);
                break;
            }
            case 'DFR': {
                if (orientation === 0) {
                    this.movesToSolve = this.movesToSolve.concat(["D'", "F'"]).concat(this.permY).concat(["F", "D"]);
                } else if (orientation === 1) {
                    this.movesToSolve = this.movesToSolve.concat(["F", "D"]).concat(this.permY).concat(["D'", "F'"]);
                } else {
                    this.movesToSolve = this.movesToSolve.concat(this.permY);
                }
                this.piecesTab = movement.moveCornerOP(this.piecesTab, 7, orientation);
                break;
            }
        }
    }
}