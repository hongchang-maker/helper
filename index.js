

const clearBtn = document.getElementById("clearBtn");
const nextBtn = document.getElementById("nextBtn");


clearBtn.addEventListener("click", clear);
nextBtn.addEventListener("click", next)


function clear() {
    let answer = confirm("r u sure that all the data will be deleted?");
    if (answer === true){
        localStorage.clear();
        console.log("cleared");
    } else { console.log("canceled"); }
    
}

function next() {
    location.href="indexCreator.html"
}