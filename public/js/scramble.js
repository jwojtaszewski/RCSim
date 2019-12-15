const move = ["R", "R'", "L", "L'", "U", "U'", "D", "D'", "F", "F'", "B", "B'"];
let scramble = "";
let randomIterator;
let ifSame = 0;
let ifSamePrime = 0;
let rFlag = 0;
let lFlag = 0;
let uFlag = 0;
let dFlag = 0;
let fFlag = 0;
let bFlag = 0;

const section = document.querySelector(".mainContentSection");

function generateScramble() {
    scramble = "";
    for (let i = 0; i < 25; i++) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleFlags();
        scrambleGenerate();
        ifSameOrPrimeMove();
        scramble += move[randomIterator] + " ";

    }

    return scramble;
}



generateScramble();

function resetScramble() {
    const scrambleShow = document.querySelector(".src");
    scrambleShow.parentNode.removeChild(scrambleShow);
}

function scrambleGenerate() {
    if (randomIterator == ifSame || randomIterator == ifSamePrime) {
        randomIterator = Math.floor((Math.random() * 12));
        if (randomIterator == ifSame || randomIterator == ifSamePrime) {
            scrambleGenerate();
            scrambleFlags();
        }
    }
    //-----------------------------------------------------------------sprawdza czy wylosowany ruch nie jest taki sam lub nie ma kolizji flag xd

    //-----------------------------------------------------------------ruchy R i L
    if ((randomIterator == 0 || randomIterator == 1) && lFlag == 1 && rFlag == 1) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleGenerate();

    } else {
        rFlag = 0;
        lFlag = 0;
        scrambleFlags();

    }
    if ((randomIterator == 2 || randomIterator == 3) && lFlag == 1 && rFlag == 1) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleGenerate();

    } else {
        lFlag = 0;
        rFlag = 0;
        scrambleFlags();
    }

    //-----------------------------------------------------------------ruchy U i D
    if ((randomIterator == 4 || randomIterator == 5) && uFlag == 1 && dFlag == 1) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleGenerate();

    } else {
        uFlag = 0;
        dFlag = 0;
        scrambleFlags();

    }
    if ((randomIterator == 6 || randomIterator == 7) && uFlag == 1 && dFlag == 1) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleGenerate();

    } else {
        dFlag = 0;
        uFlag = 0;
        scrambleFlags();
    }
    //-----------------------------------------------------------------ruchy F i B
    if ((randomIterator == 8 || randomIterator == 9) && fFlag == 1 && bFlag == 1) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleGenerate();

    } else {
        fFlag = 0;
        bFlag = 0;
        scrambleFlags();

    }
    if ((randomIterator == 10 || randomIterator == 11) && fFlag == 1 && bFlag == 1) {
        randomIterator = Math.floor((Math.random() * 12));
        scrambleGenerate();

    } else {
        bFlag = 0;
        fFlag = 0;
        scrambleFlags();
    }

}



function scrambleFlags() {
    if (randomIterator == 0 || randomIterator == 1) {
        rFlag = 1;
    }
    if (randomIterator == 2 || randomIterator == 3) {
        lFlag = 1;
    }
    if (randomIterator == 4 || randomIterator == 5) {
        uFlag = 1;
    }
    if (randomIterator == 6 || randomIterator == 7) {
        dFlag = 1;
    }
    if (randomIterator == 8 || randomIterator == 9) {
        fFlag = 1;
    }
    if (randomIterator == 10 || randomIterator == 11) {
        bFlag = 1;
    }

}

function ifSameOrPrimeMove() {
    ifSame = randomIterator;
    if (randomIterator % 2 == 0) {
        ifSamePrime = (randomIterator + 1);
    } else {
        ifSamePrime = (randomIterator - 1);
    }
}

function scrCube(scramble, piecesTable) {
    // let piecesTable = piecesTable;
    const movement = new Movement();
    const moveArray = scramble.split(' ');
    moveArray.forEach((el) => {
        switch (el) {
            case 'U':
                piecesTable = movement.doUMove(piecesTable);
                break;
            case 'U\'':
                piecesTable = movement.doUPrimeMove(piecesTable);
                break;
            case 'R':
                piecesTable = movement.doRMove(piecesTable);
                break;
            case 'R\'':
                piecesTable = movement.doRPrimeMove(piecesTable);
                break;
            case 'L':
                piecesTable = movement.doLMove(piecesTable);
                break;
            case 'L\'':
                piecesTable = movement.doLPrimeMove(piecesTable);
                break;
            case 'F':
                piecesTable = movement.doFMove(piecesTable);
                break;
            case 'F\'':
                piecesTable = movement.doFPrimeMove(piecesTable);
                break;
            case 'D':
                piecesTable = movement.doDMove(piecesTable);
                break;
            case 'D\'':
                piecesTable = movement.doDPrimeMove(piecesTable);
                break;
            case 'B':
                piecesTable = movement.doBMove(piecesTable);
                break;
            case 'B\'':
                piecesTable = movement.doBPrimeMove(piecesTable);
                break;
        }
    })

    return piecesTable;
}