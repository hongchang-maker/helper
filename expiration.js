

// 1. SELECT AND DEFAULT

const list = document.getElementById("newInput")
const expBtn = document.getElementById("expBtn")
expBtn.addEventListener("click", addExp);

let expArray = [];
let parsedArray = [];

// 2. load

load();

function load(){
    const loadedArray = localStorage.getItem("EXP");
     if (loadedArray !== null) {
    const parsedArray = JSON.parse(loadedArray);
    parsedArray.forEach(function(data){
    loadExp(data.input); 
     })
    }
}

//        console.log("complete");


// add Sold thing function
function addExp() {
    let input = document.getElementById("expText").value;
    if (input !== ""){
        let id = expArray.length + 1;
        expArray.push({
            input : input,
            id : id
        });
    
    drawNewInput(input, id);
    localStorage.setItem("EXP", JSON.stringify(expArray));
    }
}

function loadExp(data) {
    let id = expArray.length + 1;
        expArray.push({
            input : data,
            id : id
        });
    let num = parseInt(id);
        drawloadedInput(data, num);
        localStorage.setItem("EXP", JSON.stringify(expArray));
}


function drawNewInput(data, id) {
    const p = document.createElement("p");
    const br = document.createElement("br");
    const btn = document.createElement("button");
    btn.innerHTML = "X"
    btn.addEventListener("click", expired);
    p.innerText += " <" + data + "> ";
    p.appendChild(btn);
    p.id = id;
    p.appendChild(br);
    list.appendChild(p);
}

function drawloadedInput(data, num) {
    const p = document.createElement("p");
    const br = document.createElement("br");
    const btn = document.createElement("button");
    btn.innerHTML = "X"
    btn.addEventListener("click", expired);
    p.innerText += " <" + data + "> ";
    p.appendChild(btn);
    p.id = num;
    p.appendChild(br);
    list.appendChild(p);
}

function expired(event) {
    const btn = event.target;
    const sltP = btn.parentNode;
    list.removeChild(sltP);

    const cleanArray = expArray.filter(function(data){
        return data.id !== parseInt(sltP.id);
    
    }); // filter해서 조건에 맞는 것들만 배열로 반환
    expArray = cleanArray;
    localStorage.setItem("EXP", JSON.stringify(expArray)); // SAVE DATA
    location.reload();
}