




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
        indicateNoSave();
        document.getElementById("inputs").removeChild(el);
        document.getElementById("inputs").removeChild(delBtn);
        if (saveOnRemove) {
            saveList();
        }
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
    try {
        const value = document.cookie.split(`${name}=`)[1].split(";")[0];
        if (name === "currentList") {
            const listStrings = value.split(",");
            return listStrings;
        }
        
        return value;
        } catch {
            return "";
        }
        
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
    setCookie('currentList', listStrings, 10000);
    document.getElementById("saveButton").innerText = "Saved"
}

// Run the main function on page load
document.addEventListener('DOMContentLoaded', () => {
    generateSavedList();
});



function generateSavedList() {
    const listStrings = getCookie("currentList");
    

    // Getting other settings cookies and checking for empty values
    const backgroundTemp = getCookie("background");
    if (backgroundTemp !== "") {
        document.getElementById("container").style.background = backgroundTemp;
    }
    
    const saveOnRemoveTemp = getCookie("saveOnRemove");
    if (saveOnRemoveTemp !== "") {
        saveOnRemove = saveOnRemoveTemp === "true" ? true : false;
        document.getElementById("saveOnRemove").innerText = saveOnRemove ? "Save On Remove: on" : "Save On Remove: off";
    }
    
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
    indicateNoSave();
    document.getElementById("removeSaveButton").innerText = "Save Removed";
}

function clearAll() {
    let deleteButtons = document.getElementsByClassName("deleteButton");
    let deleteElList = Array.from(deleteButtons);

    deleteElList.forEach((el) => {
        el.click();
    })

    indicateNoSave();


}

function indicateNoSave() {
    document.getElementById("saveButton").innerText = "Save List"; 
}

function randomizeColor() {
    let colors = [];

    for (let x = 0; x < 3; x++) {
        let rgbStr = "rgb("
        for (let i = 0; i < 3; i++) {
            if (i !== 0) {
                rgbStr = rgbStr + ",";
            }
            rgbStr = rgbStr + getRandomInt(255).toString();
        }
        rgbStr = rgbStr + ")";
        colors.push(rgbStr);
    }    
    const gradientStr = `linear-gradient(45deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`
    document.getElementById("container").style.background = gradientStr;
    setCookie("background", gradientStr, 10000);
}

function defaultColor() {
    document.getElementById("container").style.background = `linear-gradient(45deg, white, red, white)`;
    setCookie("background", `linear-gradient(45deg, white, red, white)`, 10000);

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let saveOnRemove = false;

function toggleSaveOnRemove() {
    saveOnRemove = !saveOnRemove;
    const elStr = "Save On Remove: ";
    document.getElementById("saveOnRemove").innerText = saveOnRemove ? elStr + "on" : elStr + "off";
    setCookie("saveOnRemove", saveOnRemove.toString(), 10000);

}