




let activtyElements = document.getElementsByClassName("activityInput");


let activityElList = Array.from(activtyElements);

let currentAdderElement = activityElList[0];


activityElList.forEach((e) => {
    e.addEventListener("click", () => {  
        handleClick(e)
    
    });
})

function handleClick(el) {
    if (el != currentAdderElement) {
        return;
    }
    el.value = "";
    addDeleteButton(el);

    addNewTextArea();
    document.getElementById("saveButton").innerText = "Save List";
} 

function addDeleteButton(el) {
    const delBtn = document.createElement("button");
    delBtn.style.backgroundColor = "pink";
    delBtn.className = "deleteButton";
    delBtn.addEventListener("click", () => {
        document.getElementById("inputs").removeChild(el);
        document.getElementById("inputs").removeChild(delBtn);
    });
    delBtn.innerText = "Remove";
    document.getElementById("inputs").appendChild(delBtn);
}


function addNewTextArea() {
    const newEl = document.createElement("textarea");
    newEl.classList.add("activityInput");
    newEl.value = "+";
    document.getElementById("inputs").appendChild(newEl); 
    currentAdderElement = newEl;
    newEl.addEventListener("click", () => {
        handleClick(newEl);
    })  
}


function randomize() {
    const currentElements = document.getElementsByClassName("activityInput");
    const currentList = Array.from(currentElements);

    let alreadyChosen = [];
    let shuffledList = [];
    currentList.pop();
    while (shuffledList.length < currentList.length) {
        let activityElement = currentList[getRandomInt(currentList.length)];
        let isAlreadyChosen = false;
        alreadyChosen.forEach((i) => {
            if (activityElement === i) {
                isAlreadyChosen = true;
            }
        })

        if (!isAlreadyChosen) {
            shuffledList.push(activityElement.value);
            alreadyChosen.push(activityElement);
        }
    }
    for (let i = 0; i < shuffledList.length; i++) {
        currentList[i].value = shuffledList[i];
    }
    document.getElementById("saveButton").innerText = "Save List";
    // Hack for making button animation run every press by removing the focus
    setTimeout(() => {
        document.getElementById("dummyButton").focus();

    }, 1000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// Cookie Logic

function getCookie(name) {
    const value = document.cookie.split(`${name}=`)[1];
    const listStrings = value.split(",");
    return listStrings;    
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function saveList() {

    const currentElements = document.getElementsByClassName("activityInput");
    const currentList = Array.from(currentElements);
    let listStrings = [];
    currentList.forEach((el) => {
        if (el.value == "+" | el.value === "") {
            return;
        }
        listStrings.push(el.value.replaceAll(",", "commaEncode1"));
    });
    setCookie('currentList', listStrings, 365);
    document.getElementById("saveButton").innerText = "Saved"
}

// Run the main function on page load
document.addEventListener('DOMContentLoaded', () => {
    generateSavedList();
});



function generateSavedList() {
    const listStrings = getCookie("currentList");
    if (listStrings.length < 1) {
        return;
    }
    if (listStrings[0] === "") {
        return;
    }

    let activtyElements = document.getElementsByClassName("activityInput");
    let activityElList = Array.from(activtyElements);
    let currentAdderElement = activityElList[0];
    currentAdderElement.value = listStrings[0].replaceAll("commaEncode1", ",");
    addDeleteButton(currentAdderElement);

    for (let i = 1; i < listStrings.length; i++) {
        const newEl = document.createElement("textarea");
        newEl.classList.add("activityInput");        
        newEl.value = listStrings[i].replaceAll("commaEncode1", ",");
        document.getElementById("inputs").appendChild(newEl); 
        newEl.addEventListener("click", () => {
            handleClick(newEl);
        });
        addDeleteButton(newEl);
    }

    addNewTextArea();  
    document.getElementById("saveButton").innerText = "Saved"; 
}

function removeSave() {
    setCookie("currentList", "", 365);
    document.getElementById("saveButton").innerText = "Save List"; 
    document.getElementById("removeSaveButton").innerText = "Save Removed";
}

function clearAll() {
    let deleteButtons = document.getElementsByClassName("deleteButton");
    let deleteElList = Array.from(deleteButtons);

    deleteElList.forEach((el) => {
        el.click();
    })

    document.getElementById("saveButton").innerText = "Save List"; 


}