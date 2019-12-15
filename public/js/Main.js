class Main {
    constructor() {
        this.timesContainer = document.querySelector(".timesContainer");
        this.display = document.querySelector(".display");
        this.allTimes = document.querySelectorAll(".time");
        this.resetBtn = document.querySelector(".resetButton");
        this.statsText = document.querySelectorAll(".mainStats span");
        this.scramble = document.querySelector(".src");

        this.isInspection = false;
        this.isTimeRun = false;
        this.stats = new StatsGetSet();
        this.statsCalc = new StatsCalc();
        this.timer = new Timer(this.display);
        this.updateTimes = new UpdadeTimes(this.stats);
        this.displayingBests = new DisplayingBests();
        this.delete = new Delete(this.timesContainer, this.updateTimes, this.stats);

        this.startKeysArray = [73, 74, 75, 68, 69, 70, 71, 72, 83, 79, 87];

        // window.addEventListener("keyup", (e) => { //start czas
        //     if (e.keyCode == "32" && this.timer.getI() == 1) this.timer.start();
        // });

        // window.addEventListener("keydown", (e) => { //stop czas
        //     this.display.style.color = "gold";
        //     if (e.keyCode == "32" && this.timer.getI() == 2) {
        //         this.timer.stop();
        //         this.updateTimes.saveTime(this.timer.getTime());
        //         this.insertToDB();
        //     }
        // });

        // window.addEventListener("keyup", (e) => { //zmiana i
        //     if (e.keyCode == "32" && this.timer.getI() == 3) this.timer.setI(1);
        //     if (e.keyCode == "27") this.timer.stop(), this.timer.reset();
        // });

        window.addEventListener("keyup", (e) => {
            if (e.keyCode == "32" && !this.isTimeRun) {
                const scramble = generateScramble();
                this.updateScramble(scramble);
                // scrambleCube(scramble);
                const moveArray = scramble.split(' ');
                movesFifo = moveArray;
                this.isInspection = true;
            }

            if (this.startKeysArray.includes(e.keyCode) && this.isInspection) {
                this.timer.start();
                this.isInspection = false;
                this.isTimeRun = true;
            }

            if (this.isTimeRun) {
                if (isCubeSolved()) {
                    this.timer.stop();
                    this.updateTimes.saveTime(this.timer.getTime());
                    this.insertToDB();
                    this.isTimeRun = false;
                }
            }
        });

        window.addEventListener("click", (e) => { //wykrywanie nacisniętego czasu
            if (e.target.classList.contains("time")) {
                let index = $(e.target).index();
                console.log(index)
                if (this.delete.timeDelete(e.target)) {
                    this.deleteFromDB(index);
                }
            }
        })

        this.resetBtn.addEventListener("click", () => {
            this.delete.allTimeDelete();
            this.deleteAllFromDB();
        });
        document.querySelector(".mainStats :nth-child(2) span").addEventListener("click", () => {
            this.displayingBests.showBestTIme(this.stats.getBestTime())
        });

        document.querySelector(".mainStats :nth-child(3) span").addEventListener("click", () => {
            this.displayingBests.showWorstTIme(this.stats.getWorstTime())
        });


        this.statsText.forEach(element => {
            element.style.color = "#00cc99";
            element.style.marginLeft = "3px"
        });
    }

    updateScramble(scramble) {
        this.scramble.innerHTML = scramble;
    }

    updateTimesFromDB() {
        this.allTimes.forEach((el) => {
            this.updateTimes.saveTime(this.convertTimeToTable(el.textContent));
            console.log(el.textContent)
            el.remove();
        })
    }

    convertTimeToTable(time) {
        if (time.length < 6) {
            let result = [];
            result.push("");

            time = time.split(".");
            time[0] += ".";

            result.push(time[0]);
            result.push(Number(time[1]));
            console.log(result);
            return result
        } else if (time.length >= 6) {
            let result = [];

            time = time.split(/[:.]/)
            time[0] += ":";
            time[1] += ".";
            console.log(time)
            result.push(time[0]);
            result.push(time[1]);
            result.push(Number(time[2]));

            console.log(result);

            return result
        }
    }

    insertToDB = async () => {

        let value = {
            item: this.timer.getTimeInOneString()
        };

        const response = await fetch('/insertToDB', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }


    getFromDB = async () => {
        const response = await fetch('/getTimesFromDB');
        const json = await response.json();
        console.log(json);
    }

    deleteFromDB = async (index) => {
        // const response = await fetch("/deleteFromDB");

        let value = {
            item: index
        };

        console.log(index)
        console.log(value.item)

        const response = await fetch('/deleteFromDB', {
            method: 'DELETE',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    deleteAllFromDB = async () => {
        const response = await fetch('/deleteAllTImesFromDB', {
            method: 'DELETE',
        });
    }

}

const main = new Main();
main.updateTimesFromDB();