// SELECT BY ID


const list = document.getElementById("list");
const objList = document.getElementById("objList");
const objInput = document.getElementById("objInput");
const sltData = [];


let indexArray = [];
let selectedArray = [];

let index4Pass = [];
let object4Pass = [];
let keyword = [];

const loadedKeyword = localStorage.getItem("KEYWORD_OBJT");
parsedkeyword = JSON.parse(loadedKeyword);

if (parsedkeyword !== null){
    keyword = parsedkeyword;
}

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
    const btn2 = document.createElement("button");
    const input = document.createElement("input");
    const datalist = document.createElement("datalist");
    datalist.setAttribute("id","itemList");
    
    
    if (parsedkeyword !== null) {
    parsedkeyword.forEach(function(data){
        let option = document.createElement("option");
        option.innerHTML = data;
        datalist.appendChild(option);
    })
}
    
    btn.addEventListener("click", putObj);
    btn2.addEventListener("click", voice);
    btn.innerHTML = "(+)";
    btn2.innerHTML = "Voice"
    input.setAttribute("type", "text");
    input.setAttribute("id", "objBlnk");
    input.setAttribute("list", "itemList")
    input.placeholder = "put the name of object here";
    objInput.innerHTML = "";
    objInput.appendChild(input);
    objInput.appendChild(datalist);
    objInput.appendChild(btn);
    objInput.appendChild(btn2);
}

// voice object

function voice(event) {

    let blank = document.getElementById("objBlnk"); // blank.value
    let voiceBtn = event.target

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
        
    };

    recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
        console.log(blank.value);
        if (blank.value !== "   ") {
            blank.value = blank.value + "," + transcript;
        } else { blacnk.value = transcript };
    }


    voiceBtn.addEventListener("click", () => {
        recognition.start();
    });
}

// objEditor - Event when u click (+) only

function putObj(event) {
    const obj = document.getElementById("objBlnk").value;
    if (obj !== "") {
    selectedArray[0].object = obj

    let givenText = obj


                                    if (givenText.includes(',')) {
                                        givenText = givenText.split(',');
                                        givenText.forEach(function(data){
                                            if (data.includes(' ')) {
                                                data = data.substring(1,data.length);
                                                console.log("editted")
                                                checkKey(data);
                                                
                                            } else {
                                                console.log("no edit")  
                                                checkKey(data);
                                                   
                                            }
                                        })
                                    } else {
                                        console.log("original")
                                        checkKey(givenText);
                                        
                                    }

    // localStorage.setItem("SAVEINDEX", JSON.stringify(indexArray));
    console.log(keyword);
    localStorage.setItem("KEYWORD_OBJT", JSON.stringify(keyword));
    drawObj(selectedArray);
    } else { alert("blank is not accepted !")}
}

function checkKey(data) {

    if (keyword[0] !== undefined){
        console.log("not null")
        let num = keyword.indexOf(data)
            if (num === -1) {
                console.log("not null and new data")
                keyword.push(data)
                console.log(keyword);
            } else {
                console.log("already data")
            }

    } else if (keyword[0] === undefined) { 
        console.log("null")
        keyword.push(data)
        console.log(keyword);
}}



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
