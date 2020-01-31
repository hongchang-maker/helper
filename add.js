

// 1. SELECT AND DEFAULT

const list = document.getElementById("newInput");
const soldBtn = document.getElementById("soldBtn");
soldBtn.addEventListener("click", addSold);
const itemList = document.getElementById("itemList");

let soldArray = [];

// 2. load

load();

function load(){
    const loadedArray = localStorage.getItem("SOLDTHINGS");
    const loadedKeyword = localStorage.getItem("KEYWORD_OBJT");
    const parsedKeyword = JSON.parse(loadedKeyword);
    console.log(parsedKeyword);
     if (loadedArray !== null) {
    const parsedArray = JSON.parse(loadedArray);
    soldArray = parsedArray;
     }
     
     if (parsedKeyword !== null) {
        parsedKeyword.forEach(function(data){
         const option = document.createElement("option");
         option.value = data;
         itemList.appendChild(option);
     });}
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