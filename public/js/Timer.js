class Timer {
    constructor(display) {
        this.seconds = 0;
        this.miliSeconds = 0;
        this.minutes = 0;

        this.displayMiliSeconds = 0;
        this.displaySeconds = 0;
        this.displayMinutes = 0;

        this.interval = null;
        this.status = "stopped";

        // let timesTable = []; //tablica z czasami xd
        this.scrambleTable = [] // tablica zez scramblami

        this.deleteTimeIndex = 0;
        this.i = 1; //dziłanie spacji
        this.display = display;

    }

    mechanic = () => {
        this.miliSeconds++;

        if (this.miliSeconds / 100 == 1) {
            this.miliSeconds = 0;
            this.seconds++;


            if (this.seconds / 60 == 1) {
                this.seconds = 0;
                this.minutes++;
            }
        }

        if (this.miliSeconds < 10) {
            this.displayMiliSeconds = "0" + this.miliSeconds.toString();

        } else {
            this.displayMiliSeconds = this.miliSeconds;
        }

        if (this.seconds < 10 && this.minutes < 0) {
            this.displaySeconds = "" + this.seconds.toString() + ".";
        } else if (this.seconds < 10 && this.minutes > 0) {
            this.displaySeconds = this.seconds + ".";

        } else {
            this.displaySeconds = this.seconds + ".";
        }

        if (this.minutes < 10 && this.minutes > 0) {
            this.displayMinutes = "" + this.minutes.toString() + ":";
            if (this.seconds < 10) {
                this.displaySeconds = "0" + this.seconds.toString() + ".";
            }
        } else if (this.minutes == 0) {
            this.displayMinutes = "";
        } else {
            this.displayMinutes = this.minutes + ':';
        }


        this.display.innerHTML = this.displayMinutes + this.displaySeconds + this.displayMiliSeconds;
    }

    start = () => {
        if (this.status = "stopped") {
            this.reset();
            this.interval = window.setInterval(this.mechanic, 10);
            this.status = "started";
            this.i = 2;
        }
    }

    stop = () => {
        this.i = 3;
        if (this.status = "started") {
            window.clearInterval(this.interval); //"stopping interval" zatrzymuje odliczanie timera
            this.status = "stopped";
            // resetScramble();
            // generateScramble();
            this.display.style.color = '#B99B00';
        }
    }

    reset = () => {
        this.i = 1;
        this.miliSeconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.display.innerHTML = "00:00";
    }

    getI() {
        return this.i;
    }

    setI(value) {
        this.i = value;
    }

    getTime() {
        return [this.displayMinutes, this.displaySeconds, this.displayMiliSeconds];
    }

    getTimeInOneString() {
        return this.displayMinutes + this.displaySeconds + this.displayMiliSeconds;
    }

}