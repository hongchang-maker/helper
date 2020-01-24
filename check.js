
// select

const list = document.getElementById("list");

let loadedArray = localStorage.getItem("SOLDTHINGS");
let dataArray = [];
let allData = [];
let foundArray = [];
let unfound = [];
let temp = [];



// load data

load();

function load() {
const parsedArray = JSON.parse(loadedArray);
unfound = JSON.parse(loadedArray);
parsedArray.forEach(function(data){ 
    put(data);
})
}

function put(data){
        let id = dataArray.length + 1;
        dataArray.push({
            data : data,
            id : id});
        draw(data, id);    
        }                     
    
function draw(data, id) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = data;
    li.appendChild(span);
    li.id = id;
    list.appendChild(li);

    let target = data;
    allData = localStorage.getItem("SAVEINDEX");
    const parsedArray = JSON.parse(allData);
    allData = parsedArray;
    
    allData.forEach(function find(data){
    let parsedData = JSON.stringify(data);
    let index = parsedData.indexOf(target);

         
     
     if (index !== -1) {

            foundArray.push({data : data.data, id : id, object : target});
            unfound = unfound.filter(e => e !== target)
            const span = document.createElement("span");
            span.innerHTML = "  -   " + data.data;
            li.appendChild(span);
            list.appendChild(li);
            localStorage.setItem("FOUND", JSON.stringify(foundArray));
            
            }
    })

    console.log(foundArray);
    console.log(unfound);

    localStorage.setItem("UNFOUND", JSON.stringify(unfound));  
    }


function check() {
    let id = dataArray.length + 1;
    if (unfound.length !== 0) {
        unfound.forEach(function(data){
            temp.push({
                data : data,
                id : id});
        })
    }
    console.log("unfound " + unfound)
    localStorage.setItem("UNFOUND", unfound);
}
    // foreach문 이전의 배열과 이후의 배열을 비교해서 안 찾아진 데이터를 찾고 unfound 배열에 담음.
    // foreach문 이전의 배열 : const loadedArray = localStorage.getItem("SAVEINDEX");
    // foreach문 이후의 배열 : foundArray
    // 비교 자바스크립트
    // unfound 배열 : unfound