let modInfo = {
	name: "The-Evolution-of-Formula-Tree",
	id: "???",
	author: "me",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new OmegaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}
var fn;
//var fd = "";
//function formulaDt() {
//    return "当前公式:" + fd;
//}

function min(a,b) {
	if (a >= b) {
		return b
	} else {
		return a
	}
}
// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "",
}

let changelog = `<h1>更新日志:</h1><br>
    <h3>v0.1.1</h3><br>
    - 修复a2的显示bug<br>
	- 第三个里程碑增加自动a重置的奖励<br>
    <h3>v0.1</h3><br>
		- 当前残局：10000ap(au14).<br>`

let winText = `你成功到达了第四个升级！如果你想要玩更多内容，就催更吧`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new OmegaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new OmegaNum(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page

        //"<br>当前公式: " + fm;
var displayThings = [
	//{var fp = player.fo.points.toNumber()
	//	switch(fp){
	//	case 0:return `P = t = ${player.fo.t}`
	//	case 1:return `P = a * t = ${player.a.points} * ${player.fo.t}`
	//	}},
	//f() +
	"<br>当前残局：10000ap(au14)"
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("a",14);
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}