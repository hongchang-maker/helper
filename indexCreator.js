// SELECT LIST

const list = document.getElementById("list");
const datas = [];
const item = document.getElementById("item");

const suggest = document.getElementById("itemList");

let indexKeyword = [];

let indexArray = [];


// DATA TEMP

let data = "";

// let savedData = localStorage.getItem("SAVEINDEX");

loadIndex();

// LOAD INDEXES DATA
function loadIndex() {
    const loadedIndex = localStorage.getItem("SAVEINDEX");
    let indexKeyword = localStorage.getItem("KEYWORD_INDEX");

    if (indexKeyword !== null) {
    indexKeyword = JSON.parse(indexKeyword);
    indexKeyword.forEach(function(data){
        const option = document.createElement("option");
        option.value = data;
        suggest.appendChild(option);
    });}

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
    indexKeyword.push(data);

    if (data.includes(',')) {
        data = data.split(',');
        data.forEach(function(data){
            if (data.includes(' ')) {
                data = data.substring(1,data.length);
                indexKeyword.push(data);
                put(data);
            } else {
                indexKeyword.push(data)
                put(data);
            }
        })
        
    } else {
        put(data);
        indexKeyword.push(data);
    }
    console.log(indexKeyword);
    localStorage.setItem("KEYWORD_INDEX", JSON.stringify(indexKeyword));
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


// auto complete index
