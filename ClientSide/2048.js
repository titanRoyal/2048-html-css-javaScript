class Game {
    constructor(arr, saves = 1) {
        this.grid = [];
        this.saves = saves;
        Game.gameOverr = select(".gameOver");
        Game.gameWon = select(".gameWon")
        Game.pause = false;
        this.oneTime = true;
        this.savesArr = []
        this.Init(arr);
        select(".restart").mousePressed(() => {
            this.ReInit()
        })
        select(".restartW").mousePressed(() => {
            this.ReInit()
        })
        select(".continueGame").mousePressed(() => {
            Game.disableGameWon();
        })
    }
    static activateGameOver() {
        Game.gameOverr.style("opacity:1; top: 0%;");
    }
    static disableGameOver() {
        Game.gameOverr.style("opacity:0; top: -100%;");
    }
    static activateGameWon() {
        Game.pause = true;
        Game.gameWon.style("opacity:1; top: 0%;");
    }
    static disableGameWon() {
        Game.pause = false;
        Game.gameWon.style("opacity:0; top: -100%;");
    }
    ReInit() {
        this.grid.flat(Infinity).forEach((data) => {
            if (data.elt.children.length != 0) {
                data.elt.children[0].remove()
            }
        })
        Game.disableGameOver();
        Game.disableGameWon();
        this.savesArr = []
        this.addTile()
        this.addTile()
    }
    Init(arr) {
        this.grid = [
            [],
            [],
            [],
            []
        ]
        arr.forEach((data, index) => {
            this.grid[Math.floor(index / 4)][index % 4] = data;
        })
        this.addTile();
        this.addTile();
    }
    saveStatus() {
        this.savesArr.push(this.status());
        if (this.savesArr.length > this.saves) {
            this.savesArr.shift();
        }
    }
    loadStatus() {
        if (this.savesArr.length == 0) {
            console.log("no more saves");
        } else {
            Game.disableGameOver();
            Game.pause = false;
            this.grid.flat().forEach(data => {
                if (data.elt.children.length != 0) {
                    data.elt.children[0].remove()
                }
            })
            let dat = this.savesArr.pop();
            this.grid.forEach((data1, i) => {
                data1.forEach((data, i1) => {
                    if (dat[i][i1] != null) {
                        let divi = createDiv(dat[i][i1]);
                        divi.style("animation: newTile .3s;background:" + this.color_it(dat[i][i1]))
                        data.child(divi)
                    }
                })
            })
        }
    }
    addTile() {
        let available = []
        this.grid.forEach(data1 => {
            data1.forEach(data => {

                if (data.elt.children.length == 0) {
                    available.push(data);
                }
            })
        })
        if (available.length > 0) {
            let rand = random(available);
            let num = (random(1) < 0.2) ? 4 : 2;
            let divi = createDiv(num);
            divi.style("animation: newTile .3s;background:" + this.color_it(num))
            rand.child(divi)
        } else {
            console.log("no more space");

        }
    }
    status() {
        let r = [
            [],
            [],
            [],
            []
        ];
        this.grid.forEach((data, index) => {
            data.forEach((data1, index1) => {
                if (data1.elt.children.length == 0) {
                    r[index].push(null);
                } else {
                    r[index].push(data1.elt.innerText * 1);
                }
            })
        })
        return r;
    }
    shiftRight(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //y
            for (let index1 = this.grid.length - 2; index1 >= 0; index1--) { //x
                if (this.grid[index][index1].elt.children.length != 0 && this.grid[index][index1 + 1].elt.children.length == 0) {
                    if (Trigger) return true;
                    let num = this.grid[index][index1].elt.innerText * 1;
                    this.grid[index][index1].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: shiftright .3s ease-out;background:" + this.color_it(num))
                    this.grid[index][index1 + 1].child(divi);
                    index1 += 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }
        }
        if (Trigger) return false;
    }
    shiftLeft(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //y
            for (let index1 = 1; index1 < this.grid.length; index1++) { //x
                if (this.grid[index][index1].elt.children.length != 0 && this.grid[index][index1 - 1].elt.children.length == 0) {
                    if (Trigger) return true;
                    let num = this.grid[index][index1].elt.innerText * 1;
                    this.grid[index][index1].elt.children[0].remove();

                    let divi = createDiv(num)
                    divi.style("animation: shiftleft .3s ease-out;background:" + this.color_it(num))
                    this.grid[index][index1 - 1].child(divi);
                    index1 -= 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }
        }
        if (Trigger) return false;
    }
    shiftUp(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //x
            for (let index1 = 1; index1 < this.grid.length; index1++) { //y
                if (this.grid[index1][index].elt.children.length != 0 && this.grid[index1 - 1][index].elt.children.length == 0) {
                    if (Trigger) return true;
                    let num = this.grid[index1][index].elt.innerText * 1;
                    this.grid[index1][index].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: shiftup .3s ease-out;background:" + this.color_it(num))
                    this.grid[index1 - 1][index].child(divi);
                    index1 -= 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }

        }
        if (Trigger) return false;
    }
    shiftDown(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //x
            for (let index1 = this.grid.length - 2; index1 >= 0; index1--) { //y
                if (this.grid[index1][index].elt.children.length != 0 && this.grid[index1 + 1][index].elt.children.length == 0) {
                    if (Trigger) return true;
                    let num = this.grid[index1][index].elt.innerText * 1;
                    this.grid[index1][index].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: shiftdown .3s ease-out;background:" + this.color_it(num))
                    this.grid[index1 + 1][index].child(divi);
                    index1 += 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }
        }
        if (Trigger) return false;
    }
    comboRight(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //y
            for (let index1 = this.grid.length - 2; index1 >= 0; index1--) { //x
                if (this.grid[index][index1].elt.children.length != 0 && this.grid[index][index1 + 1].elt.children.length != 0 && this.grid[index][index1 + 1].elt.innerText == this.grid[index][index1].elt.innerText) {
                    if (Trigger) return true;
                    let num = this.grid[index][index1].elt.innerText * 2;
                    this.grid[index][index1].elt.children[0].remove();
                    this.grid[index][index1 + 1].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: Tile .5s;background:" + this.color_it(num))
                    this.grid[index][index1 + 1].child(divi);
                    // index1 += 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }

        }
        if (Trigger) return false;
    }
    comboLeft(Trigger) {
        for (let index = 0; index < this.grid.length; index++) { //y
            for (let index1 = 1; index1 < this.grid.length; index1++) { //x
                if (this.grid[index][index1].elt.children.length != 0 && this.grid[index][index1 - 1].elt.children.length != 0 && this.grid[index][index1 - 1].elt.innerText == this.grid[index][index1].elt.innerText) {
                    if (Trigger) return true;
                    let num = this.grid[index][index1].elt.innerText * 2;
                    this.grid[index][index1].elt.children[0].remove();
                    this.grid[index][index1 - 1].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: Tile .5s;background:" + this.color_it(num))
                    this.grid[index][index1 - 1].child(divi);
                    // index1 -= 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }
        }
        if (Trigger) return false;
    }
    comboUp(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //x
            for (let index1 = 1; index1 < this.grid.length; index1++) { //y
                if (this.grid[index1][index].elt.children.length != 0 && this.grid[index1 - 1][index].elt.children.length != 0 && this.grid[index1 - 1][index].elt.innerText == this.grid[index1][index].elt.innerText) {
                    if (Trigger) return true;
                    let num = this.grid[index1][index].elt.innerText * 2;
                    this.grid[index1][index].elt.children[0].remove();
                    this.grid[index1 - 1][index].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: Tile .3s;background:" + this.color_it(num))
                    this.grid[index1 - 1][index].child(divi);
                    // index1 -= 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }
        }
        if (Trigger) return false;
    }
    comboDown(Trigger = false) {
        for (let index = 0; index < this.grid.length; index++) { //x
            for (let index1 = this.grid.length - 2; index1 >= 0; index1--) { //y
                if (this.grid[index1][index].elt.children.length != 0 && this.grid[index1 + 1][index].elt.children.length != 0 && this.grid[index1 + 1][index].elt.innerText == this.grid[index1][index].elt.innerText) {
                    if (Trigger) return true;
                    let num = this.grid[index1][index].elt.innerText * 2;
                    this.grid[index1][index].elt.children[0].remove();
                    this.grid[index1 + 1][index].elt.children[0].remove();
                    let divi = createDiv(num)
                    divi.style("animation: Tile .3s;background:" + this.color_it(num))
                    this.grid[index1 + 1][index].child(divi);
                    // index1 += 2;
                    index1 = constrain(index1, 0, this.grid.length - 1);
                    //break;
                }
            }
        }
        if (Trigger) return false;
    }
    goUp() {
        if ((this.shiftUp(true) || this.comboUp(true)) && !Game.pause) {
            this.saveStatus()
            this.comboUp()
            this.shiftUp()
            // this.shiftUp()
            this.addTile()
        }
        this.gameOver()
    }
    goDown() {
        if ((this.shiftDown(true) || this.comboDown(true)) && !Game.pause) {
            this.saveStatus()
            this.comboDown()
            this.shiftDown()
            // this.shiftDown()
            this.addTile()
        }
        this.gameOver()
    }
    goLeft() {
        if ((this.shiftLeft(true) || this.comboLeft(true)) && !Game.pause) {
            this.saveStatus()
            this.comboLeft()
            this.shiftLeft()
            // this.shiftLeft()
            this.addTile()
        }
        this.gameOver()
    }
    goRight() {
        if ((this.shiftRight(true) || this.comboRight(true)) && !Game.pause) {
            this.saveStatus()
            this.comboRight()
            this.shiftRight()
            // this.shiftRight()
            this.addTile()
        }
        this.gameOver()
    }

    color_it(x) {
        switch (x) {
            case null:
                return "#d98911"
                break;
            case 2:
                return "#9c1136"
                break;
            case 4:
                return "#1f0cc1"
                break;
            case 8:
                return "#1295be"
                break;
            case 16:
                return "#09b361"
                break;
            case 32:
                return "#28c60e"
                break;
            case 64:
                return "#398e0c"
                break;
            case 128:
                return "#97c820"
                break;
            case 256:
                return "#b1261d"
                break;
            case 512:
                return "#e1e616"
                break;
            case 1024:
                return "#51753e"
                break;
            case 2048:
                return "#dfdd14"
                break;
            default:
                return "#601b09"
        }
    }
    gameOver() {
        if (!this.shiftUp(true) && !this.comboUp(true) && !this.shiftDown(true) && !this.comboDown(true) && !this.shiftLeft(true) && !this.comboLeft(true) && !this.shiftRight(true) && !this.comboRight(true)) {
            Game.activateGameOver();
        } else if (this.oneTime) {
            this.grid.flat().forEach((data) => {
                if (data.elt.innerText == 2048) {
                    Game.activateGameWon();
                    this.oneTime = false;
                }
            })
        }
    }
}