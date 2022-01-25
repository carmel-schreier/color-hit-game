const instructionsParagraph = document.querySelector("p")
const instructionsTitle = document.querySelector("h2")

const blueButton = document.getElementById("blue-button")
const redButton = document.getElementById("red-button")
const greenButton = document.getElementById("green-button")
const plumButton = document.getElementById("plum-button")
const yellowButton = document.getElementById("yellow-button")
const orangeButton = document.getElementById("orange-button")

const hiddenAnswerButtons = document.querySelector(".hidden-answer")
const firstHiddenBtn = document.getElementById("first-hidden-btn")
const secondHiddenBtn = document.getElementById("second-hidden-btn")
const thirdHiddenBtn = document.getElementById("third-hidden-btn")
const fourthHiddenBtn = document.getElementById("fourth-hidden-btn")

const guessContainer = document.getElementById("guess-container")
let firstGuessBtn = document.querySelector(".first-guess-btn")
let secondGuessBtn = document.querySelector(".second-guess-btn")
let thirdGuessBtn = document.querySelector(".third-guess-btn")
let fourthGuessBtn = document.querySelector(".fourth-guess-btn")

const resultBar = document.getElementById("result-bar")
const submitButton = document.getElementById("submit-btn")
const restartButton = document.getElementById("restart-btn")

const clsList = ["blue", "red", "green", "plum", "yellow", "orange"];
const clsList_2 = ["first-guess-btn", "second-guess-btn", "third-guess-btn", "fourth-guess-btn"]

const hiddenArray = createRandomArray()
console.log("hiddenArray=" + hiddenArray)

let color = "";
let answerArray = [];
let rowCounter = 0


blueButton.addEventListener("click", () => {
    color = "blue"
})
redButton.addEventListener("click", () => {
    color = "red"
})
greenButton.addEventListener("click", () => {
    color = "green"
})
plumButton.addEventListener("click", () => {
    color = "plum"
})
yellowButton.addEventListener("click", () => {
    color = "yellow"
})
orangeButton.addEventListener("click", () => {
    color = "orange"
})


firstGuessBtn.addEventListener("click", () => {
    firstGuessBtn.classList.remove(...clsList)
    firstGuessBtn.classList.add(color)
    answerArray[0] = color
})

secondGuessBtn.addEventListener("click", () => {
    secondGuessBtn.classList.remove(...clsList)
    secondGuessBtn.classList.add(color)
    answerArray[1] = color
})

thirdGuessBtn.addEventListener("click", () => {
    thirdGuessBtn.classList.remove(...clsList)
    thirdGuessBtn.classList.add(color)
    answerArray[2] = color
})

fourthGuessBtn.addEventListener("click", () => {
    fourthGuessBtn.classList.remove(...clsList)
    fourthGuessBtn.classList.add(color)
    answerArray[3] = color
})

submitButton.addEventListener("click", submitAnswer)

function createRandomArray() {
    let hiddenArray = [];
    let colorArray = ["blue", "red", "green", "plum", "yellow", "orange"];

    for (let i = 3; i >= 0; i--) {
        let x = Math.random()
        let y = Math.round(x * (i + 2))
        hiddenArray.push(colorArray[y])
        colorArray.splice(y, 1)
    }

    return hiddenArray
}

function submitAnswer() {

    if (answerArray.length < 4) return fixAnswer_2()

    for (let i = 0; i <= 3; i++) {
        for (let j = i + 1; j <= 3; j++) {
            if (answerArray[i] == answerArray[j])
                return fixAnswer()
        }
    }
    let bullsEye = 0
    let hit = 0

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (answerArray[i] == hiddenArray[j] && i == j) bullsEye++
            if (answerArray[i] == hiddenArray[j] && i != j) hit++
        }
    }

    if (bullsEye == 4) return setEndOfGame()

    rowCounter++;

    let text = getResultBarText(bullsEye, hit)
    resultBar.innerText = text
    resultBar.classList.add('show')

    instructionsTitle.innerHTML = "Try again - Use every clue"
    instructionsParagraph.innerHTML = "● means right color in a wrong place <br/> √ means right color in the right place"

    createNextAnswerRow()
}

function fixAnswer() {
    instructionsParagraph.innerHTML = "Don't repeat one color more than once!"
}

function fixAnswer_2() {
    instructionsParagraph.innerHTML = "Pick a color for each circle!"
}

function getResultBarText(bullsEye, hit) {
    let text = "";

    if (bullsEye == 0 && hit == 2) text = "● ●";
    if (bullsEye == 0 && hit == 3) text = "● ● ●";
    if (bullsEye == 0 && hit == 4) text = "● ● ● ●";

    if (bullsEye == 2 && hit == 0) text = "√ √";
    if (bullsEye == 3 && hit == 0) text = "√ √ √";
    if (bullsEye == 4 && hit == 0) text = "√ √ √ √";

    if (bullsEye == 1 && hit == 1) text = "● √";
    if (bullsEye == 1 && hit == 2) text = "● ● √";
    if (bullsEye == 1 && hit == 3) text = "● ● ● √";

    if (bullsEye == 2 && hit == 1) text = "● √ √";
    if (bullsEye == 2 && hit == 2) text = "● ● √ √";

    if (bullsEye == 3 && hit == 1) text = "● √ √ √";

    return text
}

function createNextAnswerRow() {
    let closedRow = guessContainer.lastElementChild.cloneNode(true)
    guessContainer.insertBefore(closedRow, guessContainer.childNodes[rowCounter]);
    resetNewRow()
}

function resetNewRow() {
    let newRow = guessContainer.lastElementChild

    Array.from(newRow.children).forEach(button => {
        button.classList.remove(...clsList)

    });

    answerArray = [];

    newRow.lastElementChild.classList.remove("show")
}


function setEndOfGame() {
    submitButton.classList.add("hide")
    restartButton.classList.remove("hide")
    instructionsTitle.innerHTML = "Correct Answer - Well Done"
    instructionsParagraph.innerHTML = "Don't forget to recommend this game to a friend"

    Array.from(hiddenAnswerButtons.children).forEach(button => {
        button.classList.remove("black")
    });

    firstHiddenBtn.classList.add(hiddenArray[0]);
    secondHiddenBtn.classList.add(hiddenArray[1]);
    thirdHiddenBtn.classList.add(hiddenArray[2]);
    fourthHiddenBtn.classList.add(hiddenArray[3]);
}