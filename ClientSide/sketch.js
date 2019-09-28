let socket;
let game;
function setup() {
	// createCanvas(windowWidth, windowHeight);
	noCanvas()
	//socket = io.connect("http://localhost:3000")
	//console.log(socket);
	let arr = [select("#0_0"), select("#0_1"), select("#0_2"), select("#0_3"),
		select("#1_0"), select("#1_1"), select("#1_2"), select("#1_3"),
		select("#2_0"), select("#2_1"), select("#2_2"), select("#2_3"),
		select("#3_0"), select("#3_1"), select("#3_2"), select("#3_3")
	]
	game = new Game(arr);

}

function keyPressed() {
	if (key == "Z") {
		game.goUp()
	} else if (key == "S") {
			game.goDown()
	} else if (key == "Q") {
		game.goLeft()
	} else if (key == "D") {
		game.goRight()
	} else if(key=="P"){
		game.loadStatus()
	} else if (key=="R"){
		game.ReInit()
	}
}