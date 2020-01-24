

// 1. SELECT AND DEFAULT

const list = document.getElementById("newInput")
const soldBtn = document.getElementById("soldBtn")
soldBtn.addEventListener("click", addSold);

let soldArray = [];

// 2. load

load();

function load(){
    const loadedArray = localStorage.getItem("SOLDTHINGS");
     if (loadedArray !== null) {
    const parsedArray = JSON.parse(loadedArray);
    soldArray = parsedArray;
     }
    }

//        console.log("complete");


// add Sold thing function
function addSold() {
    let input = document.getElementById("soldText").value;
    if (input !== ""){
        soldArray.push(input);
    }
    drawNewInput(input);
    localStorage.setItem("SOLDTHINGS", JSON.stringify(soldArray));
}

function drawNewInput(input) {
    list.innerText += " <" + input + "> ";
}