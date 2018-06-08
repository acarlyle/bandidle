var cookies = 0;
var cursors = 0;

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

window.setInterval(function(){ //this function is called every {1000} ms

    clickCookie(cursors);
    
    saveGame();
    
}, 1000);