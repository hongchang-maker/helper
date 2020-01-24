function homefunc() {   
    alert("is it okay?")
    localStorage.removeItem("SOLDTHINGS");
    localStorage.removeItem("UNFOUND");
    localStorage.removeItem("FOUND");
    localStorage.removeItem("SAVEOBJ");
    location.replace('controlmain.html');
    //localStorage.removeItem(key : "FOUND");  
    //localStorage.removeItem(key : "SAVEINDEX");  
    //localStorage.removeItem(key : "SAVEOBJ");  
}



// select

const list1 = document.getElementById("list1"); // FOUND
const list2 = document.getElementById("list2"); // UNFOUND

let dataArray1 = [];
let dataArray2 = [];
let dataArray3 = [];


// localstorage

const allData = JSON.parse(localStorage.getItem("SAVEINDEX"));
const savedIndex = JSON.parse(localStorage.getItem("SAVEIN"));
const foundObj = JSON.parse(localStorage.getItem("FOUND")); // Found [data: - , id: -, object: - ]
const unfoundObj = JSON.parse(localStorage.getItem("UNFOUND")) // unFound ["name"]

// sorting FOUND

let sortedFound = foundObj.sort(function (a, b){
    if (a.data > b.data) {
        return 1;
    }
    if (a.data < b.data) {
        return -1;
    }
    // a must be equal to b
    return 0;
});

// console.log(allData);
// console.log(savedIndex);
// console.log(foundObj);

load();

// load

function load(){
    sortedFound.forEach(function(data){ 
        put(data.data, data.object); 
    })
    unfoundObj.forEach(function(data){ 
        unPut(data);
    })    
}




// put

function put(data, object){
    let id = dataArray1.length + 1;
    dataArray1.push({
        data : data,
        id : id,
        object : object});
    draw1(data, id, object);
    }

function unPut(data){
    let id = dataArray2.length + 1;
    dataArray2.push({
        data : "X",
        id : id,
        object : data});
    let object = data;
    draw2(data="X", id, object);
    }


// draw

function draw1(data, id, object) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "done"
    btn.addEventListener("click", done1)
    const span = document.createElement("span");
    span.innerHTML = data + " >> " + object;
    li.appendChild(span);
    li.appendChild(btn);
    li.id = id;
    list1.appendChild(li);
}


function draw2(data, id, object) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "done"
    btn.addEventListener("click", done2)
    const span = document.createElement("span");
    span.innerHTML = data + " >> " + object;
    li.appendChild(span);
    li.appendChild(btn);
    li.id = id;
    list2.appendChild(li);
}

function done1(event){
    const btn = event.target;
    const sltP = btn.parentNode;
    list1.removeChild(sltP);

    const cleanArray1 = dataArray1.filter(function(data){
        return data.id !== parseInt(sltP.id);
    
    }); // filter해서 조건에 맞는 것들만 배열로 반환
    dataArray1 = cleanArray1;
    console.log(dataArray1);
    saveIt();
}

function done2(event){
    const btn = event.target;
    const sltP = btn.parentNode;
    list2.removeChild(sltP);

    const cleanArray2 = dataArray2.filter(function(data){
        return data.id !== parseInt(sltP.id);
    
    });
    dataArray2 = cleanArray2;
    let filteredArray = dataArray2.filter(function(data){
        console.log(data.object);
        dataArray3.push(data.object);
        console.log(dataArray3);
    });
    console.log(dataArray3);
    saveIt();
}

function saveIt(){
    localStorage.setItem("FOUND", JSON.stringify(dataArray1));
    localStorage.setItem("UNFOUND", JSON.stringify(dataArray3));
}
