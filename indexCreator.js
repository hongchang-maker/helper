// SELECT LIST

const list = document.getElementById("list");
const datas = [];
const item = document.getElementById("item");
let indexArray = [];

// DATA TEMP

let data = "";

// let savedData = localStorage.getItem("SAVEINDEX");

loadIndex();

// LOAD INDEXES DATA
function loadIndex() {
    const loadedIndex = localStorage.getItem("SAVEINDEX");
    if (loadedIndex !== null) {
        const parsedIndex = JSON.parse(loadedIndex);
             // data exist
        parsedIndex.forEach(function(data){
            put(data.data);
                              
        })
    }
}



// DATA FUNCTION **********************************************************


// GET DATA
function getdata() {
    let data = document.getElementById("item").value;
    put(data);
                             
}

// PUT and DRAW

function put(data){
    let id = indexArray.length + 1;
    indexArray.push({
        data : data,
        id : id});
    localStorage.setItem("SAVEINDEX", JSON.stringify(indexArray)); // SAVE DATA
    draw(data);
                               

function draw(data) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const resBtn = document.createElement("button");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteIN);
    const span = document.createElement("span");
    span.innerHTML = data;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = id;
    list.appendChild(li);
    //item.value = "";
};
                                
}

function deleteIN(event){
    //console.log(event.target);
    //console.dir   (parentnode 찾기)
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
    //complete....
 
    const cleanArray = indexArray.filter(function(data){
        return data.id !== parseInt(li.id);
    
    }); // filter해서 조건에 맞는 것들만 배열로 반환
    indexArray = cleanArray;
    localStorage.setItem("SAVEINDEX", JSON.stringify(indexArray)); // SAVE DATA
    location.reload();
}


