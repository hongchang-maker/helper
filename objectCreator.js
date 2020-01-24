// SELECT BY ID


const list = document.getElementById("list");
const objList = document.getElementById("objList");
const objInput = document.getElementById("objInput");
const sltData = [];


let indexArray = [];
let selectedArray = [];

let index4Pass = [];
let object4Pass = [];


let objName = document.getElementById("objId");


// LOAD INDEXARRAY

loadIndex();

function loadIndex() {
    const loadedIndex = localStorage.getItem("SAVEINDEX");
    if (loadedIndex !== null) {
        const parsedIndex = JSON.parse(loadedIndex);
        indexArray = parsedIndex;
        parsedIndex.forEach(function(data){
            draw(data.data, data.id);
        })
    }
}



// DRAW INDEX


function draw(data, id) {
    const span = document.createElement("span");
    const Btn = document.createElement("button");
    Btn.innerHTML = data;
    Btn.addEventListener("click", openObj);
    span.appendChild(Btn);
    span.id = id;
    list.appendChild(span);
    Btn.style = "padding: 5px; margin: 5px;"
    index4Pass.push(data);
};



// TARGETTING BTN < -- Eventlistener.click
// + we should draw obj list here !!
function openObj(event){
    const btn = event.target;
    const span = btn.parentNode;
    selectedArray = indexArray.filter(function(data){
        return data.id === parseInt(span.id);
    })
    objName.innerHTML = "<h1>" + selectedArray[0].data + "</h1>";
    objEditor(selectedArray);
}


// objEditor (button, text)

function objEditor(selectedArray){

    drawObj(selectedArray);

    let data = selectedArray[0].data;
    let id = selectedArray[0].id;
    const btn = document.createElement("button");
    const input = document.createElement("input");
    btn.addEventListener("click", putObj);
    btn.innerHTML = "(+)";
    input.setAttribute("type", "text");
    input.setAttribute("id", "objBlnk");
    input.placeholder = "put the name of object here";
    objInput.innerHTML = "";
    objInput.appendChild(input);
    objInput.appendChild(btn);
}



// objEditor - Event when u click (+) only

function putObj(event) {
    const obj = document.getElementById("objBlnk").value;
    if (obj !== "") {
    selectedArray[0].object = obj
    // localStorage.setItem("SAVEINDEX", JSON.stringify(indexArray));
    drawObj(selectedArray);
    } else { alert("blank is not accepted !")}
}


// draw Obj (when the obj of array is exist, or 'null')

function drawObj(selectedArray) {
    let data = selectedArray[0].data;
    let id = selectedArray[0].id;
    let object = selectedArray[0].object; // exist or undefined !!
        if (object !== undefined){
    const p = document.createElement("p");
    p.innerHTML = object;
    objList.innerHTML = "";
    objList.appendChild(p);
    } else {
        objList.innerHTML = "";
    }
    
};


const service = document.getElementById("serviceBtn");
service.addEventListener("click", nextPage);

function nextPage() {
        indexArray.forEach(function(data){
        if (data.object !== undefined){
            object4Pass.push(data.object);
        }
    })
    localStorage.setItem("SAVEINDEX", JSON.stringify(indexArray));
    localStorage.setItem("SAVEOBJ", JSON.stringify(object4Pass));
    localStorage.setItem("SAVEIN", JSON.stringify(index4Pass));
}