//declerations
var contentDiv = document.getElementById('content');

//model
let numbers1 = []; //dummy array
let numbers2 = []; //used array
let chosenBar = "none";
let chosenBarValue = "";
let chosenBarValueText = "";
let inputValue;
let buttonDisable = "disabled";

//view
function elementReplace(){
    for (let i = 0; i <5; i++) {numbers1.push(i);}
    while (numbers1.length){
        let arrayPosition = Math.random() * numbers1.length;
        let newPosition = numbers1.splice(arrayPosition, 1)[0];
        numbers2.push(newPosition);}
    if (numbers2.includes(0)){//Replace '0' with a random number that is not a 0
        let array = numbers2;
        let randomNumberReplace = Math.floor(Math.random() * 10) +1;
        array[array.map((x, i) => [i, x]).filter(x => x[1] == 0)[0][0]] = randomNumberReplace;} //??????
    show();
}

function createBar(number, barNumber){
    const width = 8;
    const spacing = 2;
    let x = (barNumber - 1) * (width + spacing);
    let height = number * 6;
    let y = 60 - height;
    let color = calcColor(1, 10, barNumber);
    return `<rect 
                width="${width}" 
                height="${height}"
                x="${x+1}" y="${y}" 
                fill="${color}"
                id="barNumber${barNumber}"
                onclick="selectBar(${barNumber})"
                class=${chosenBar === barNumber ? "selected" : ""}>
            </rect>`;
}

function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}
//controller
function selectBar(selectedBar){
    if (chosenBar === selectedBar) {clearChosenBar();}
    else if (chosenBar !== selectedBar){
        chosenBar = selectedBar;
        chosenBarValueText = "It has a value of "
        chosenBarValue = numbers2[chosenBar-1];
        buttonDisable = "";
    }
    show();
}

function addNewBar(){
    if (inputValue >= 1 && inputValue != null && inputValue <= 10){
        numbers2.push(parseInt(inputValue));
        inputValue = undefined;
        show();}
    else if (inputValue <= 0) {inputValue = undefined; show();}
    else if (inputValue > 10) {inputValue = undefined; show();}
    else if (inputValue == null || undefined) {show();}
}

function removeBar(){
    numbers2.splice([chosenBar]-1, 1);
    console.log(numbers2);
    clearChosenBar();
}

function changeBar(){
    if (inputValue >= 1 && inputValue != null && inputValue <= 10){
        numbers2.splice([chosenBar]-1, 1, parseInt(inputValue));
        console.log(numbers2);
        clearChosenBar();
    }
    else if (inputValue <= 0){
        inputValue = undefined;
        show();
        setTimeout(function(){alert("The number you've entered is too small, please pick a number above 0");}, 100);
    }
    else if (inputValue > 10){
        inputValue = undefined;
        show();
        setTimeout(function(){alert("The number you've entered is too large, please pick a number between 1 and 10");}, 100);
    }
    else if (inputValue == null || undefined){
        show();
        setTimeout(function(){alert("Please enter a number");}, 100);
    }
}

function clearChosenBar(){
    chosenBar = "none";
    chosenBarValue = "";
    chosenBarValueText = "";
    buttonDisable = "disabled";
    show();
}