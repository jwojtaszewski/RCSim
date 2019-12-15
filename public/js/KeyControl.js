class KeyControl {
    constructor() {}

    static control = (e) => {

        if (e.keyCode == 74) {
            return 'U';
        }

        if (e.keyCode == 70) {
            return 'U\'';
        }

        if (e.keyCode == 73) {
            return 'R';
        }

        if (e.keyCode == 75) {
            return 'R\'';
        }

        if (e.keyCode == 68) {
            return 'L';
        }

        if (e.keyCode == 69) {
            return 'L\'';
        }

        if (e.keyCode == 71) {
            return 'F\'';
        }

        if (e.keyCode == 72) {
            return 'F';
        }

        if (e.keyCode == 83) {
            return 'D';
        }

        if (e.keyCode == 76) {
            return 'D\'';
        }

        if (e.keyCode == 87) {
            return 'B';
        }

        if (e.keyCode == 79) {
            return 'B\'';
        }

        if (e.keyCode == 186) {
            return 'Y';
        }

        if (e.keyCode == 65) {
            return 'Y\'';
        }

        if (e.keyCode == 28) {
            piecesTable = buildCube.getCube();
        }


        if (e.keyCode == 84) {
            return 'X';
        }

        if (e.keyCode == 66) {
            return 'X\'';
        }
    }
}