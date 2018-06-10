var cash = 0;
var happyfan = 0;
var neutralfan = 1000000;
var angryfan = 0;
var prestige = 0;


var cookies = 0;
var cursors = 0;


//Choose either save method
function save() {
	var save = {
		cash: cash,
		happyfan: happyfan,
		neutralfan: neutralfan,
		angryfan: angryfan,
		prestige: prestige
	}
	localStorage.setItem("save",JSON.stringify(save));
}

//Function gets called every time page loads
function onload() {
	///Ian's save function
	load();
	///Alec's save function
	//loadSave();
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.cash !== "undefined") cash = savegame.cash;
	if (typeof savegame.happyfan !== "undefined") happyfan = savegame.happyfan;
	if (typeof savegame.neutralfan !== "undefined") neutralfan = savegame.neutralfan;
	if (typeof savegame.angryfan !== "undefined") angryfan = savegame.angryfan;
	updateCurrencies();
}

function saveGame(){
    if (supports_html5_storage()){
        
        var save = {
          cookies: cookies,
          cursors: cursors
        }
        
        localStorage.setItem("save",JSON.stringify(save));
        //console.log("Saved!  cookies at: " + cookies);
        
    }
};

function hardReset() {
	localStorage.removeItem("save")
}

///Alec save functions
function loadSave(){
    if (supports_html5_storage()){
        var savedGame = JSON.parse(localStorage.getItem("save"));
        if (typeof savedGame.cookies !== "undefined") cookies = savedGame.cookies;
        if (typeof savedGame.cursors !== "undefined") cursors = savedGame.cursors;
        console.log("Loaded save! cookies now: " + cookies);
    }
};

function wipeSave(){
    if (supports_html5_storage()){
        localStorage.removeItem("save");
        cookies = 0;
        cursors = 0;
    }
};


function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}






///Math functions
function addCash(number){
	cash = cash + number;
	document.getElementById('cash').innerHTML = prettify(cash);
}

//Simulates change in population, fans decrease naturally while neutrals increase
function populationGrowth() { //A day
	happyfan -= Math.floor((happyfan* .008)/356)
	neutralfan += Math.floor(((neutralfan*.0011)/356)+((happyfan*.0011)/356)+((angryfan*.0011)/356))
	angryfan -= Math.floor((angryfan* .008)/356)
	document.getElementById('happyfan').innerHTML = prettify(happyfan);
	document.getElementById('neutralfan').innerHTML = prettify(neutralfan);
	document.getElementById('angryfan').innerHTML = prettify(angryfan);
}



///Arty functions
//Rounds off numbers okayly well
function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}
//Updates all currencies on html page
function updateCurrencies() {
	document.getElementById('cash').innerHTML = prettify(cash);
	document.getElementById('happyfan').innerHTML = prettify(happyfan);
	document.getElementById('neutralfan').innerHTML = prettify(neutralfan);
	document.getElementById('angryfan').innerHTML = prettify(angryfan);
}



///Html functions
//When selecting a tab, display only that tab
function openTab(tabName) {
    // Hide all elements with class="tabcontent" by default */
    var tabcontent = document.getElementsByClassName("tabcontent");
	var i;
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";
}

function addInstrument() {
    // Hide all elements with class="tabcontent" by default */
	var btn = document.createElement("INPUT");        // Create a <button> element
	var txt = document.createTextNode("Instrument");        // Create a <button> element
	var div = document.createElement("DIV");        // Create a <button> element
	document.body.appendChild(txt);
	document.body.appendChild(btn);
	document.body.appendChild(div);
}


///Alec cookie funcitons
function clickCookie(number){
    cookies = cookies + number;
	document.getElementById("cookies").innerHTML = cookies; //updates cookies variable
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
    if(cookies >= cursorCost){                                 
        cursors = cursors + 1;                                 
    	cookies = cookies - cursorCost;                        
        document.getElementById('cursors').innerHTML = cursors; 
        document.getElementById('cookies').innerHTML = cookies;  
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       
    document.getElementById('cursorCost').innerHTML = nextCost;  
};



///When webpage loaded these functions are called
//Start game on whichever tab is tagged as defaultTab
document.getElementById("defaultTab").click();

//Update currencies on page load
updateCurrencies();
window.setInterval(function(){ //this function is called every {1000} ms

	populationGrowth();
    clickCookie(cursors);
    
    saveGame();
    
}, 1000);