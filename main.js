var cash = 0;
var happyfan = 0;
var neutralfan = 1000000;
var angryfan = 0;
var prestige = 0;

const DAYSINYEAR = 365;



//If supported, saves game to html5 storage
function save() {
    if (supports_html5_storage()){
			
		var save = {
			cash: cash,
			happyfan: happyfan,
			neutralfan: neutralfan,
			angryfan: angryfan,
			prestige: prestige
		}
        
        localStorage.setItem("save",JSON.stringify(save));
        //console.log("Saved!  cookies at: " + cookies);
        
    }
}

//Function gets called every time page loads
function onload() {
	load();
}

//Checks if can load from html5 then loads from html5
function load() {
	if (supports_html5_storage()){
		var savegame = JSON.parse(localStorage.getItem("save"));
		if (typeof savegame.cash !== "undefined") cash = savegame.cash;
		if (typeof savegame.happyfan !== "undefined") happyfan = savegame.happyfan;
		if (typeof savegame.neutralfan !== "undefined") neutralfan = savegame.neutralfan;
		if (typeof savegame.angryfan !== "undefined") angryfan = savegame.angryfan;
		updateCurrencies();
		console.log("Loaded save! cash now: " + cash);
	}
}

//Removes html5 save data
function wipeSave(){
    if (supports_html5_storage()){
        localStorage.removeItem("save");
        cookies = 0;
        cursors = 0;
    }
};



///Tool functions
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
	happyfan -= Math.floor((happyfan* .008)/DAYSINYEAR)
	neutralfan += Math.floor(((neutralfan*.0011)/356)+((happyfan*.0011)/DAYSINYEAR)+((angryfan*.0011)/356))
	angryfan -= Math.floor((angryfan* .008)/DAYSINYEAR)
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

//Adds html elements to page 
function addInstrument() {
    // Hide all elements with class="tabcontent" by default */
	var btn = document.createElement("INPUT");        // Create a <button> element
	var txt = document.createTextNode("Instrument");        // Create a <button> element
	var div = document.createElement("DIV");        // Create a <button> element
	document.body.appendChild(txt);
	document.body.appendChild(btn);
	document.body.appendChild(div);
}



///When webpage loaded these functions are called
//Start game on whichever tab is tagged as defaultTab
document.getElementById("defaultTab").click();

//Update currencies on page load
updateCurrencies();
window.setInterval(function(){ //this function is called every {1000} ms
	populationGrowth();
    
}, 1000);