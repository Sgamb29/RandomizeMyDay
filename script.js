




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
    addNewTextArea();
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

    // Hack for making button animation run every press by removing the focus
    setTimeout(() => {
        document.getElementById("dummyButton").focus();

    }, 1000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}