//Make sure the first character is capitalized
function fixText(text){
    text = text.trim();
    let capitalLetter = text.charAt(0).toUpperCase();
    let restOfTheWord = text.slice(1);
    let theWholeWord = capitalLetter + restOfTheWord;
    return theWholeWord;
}

//Make sure every character except the first one are lower case
function fixTextTwo(text){
    text = text.trim();
    let makeLowerCase = text.toLowerCase();
    let makeFirstOneUppercase = makeLowerCase.charAt(0).toUpperCase() + makeLowerCase.slice(1);
    return makeFirstOneUppercase;
}