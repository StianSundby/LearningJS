function checkEmailAt(email){
    if (email.includes("@")){
        return email;
    }
    else {
        return "Email must include @";
    }
}

function checkEmailSpace(email){
    if (!email.includes(" ")){
        return email;
    }
    else {
        return "Email can not include spaces";
    }
}

function checkEmailPeriod(email){
    email = getSecondPart(email);
    if (email.includes(".")){
        return email;
    }
    else {
        return "Email does not contain a period after the @";
    }

}
    function getSecondPart(email){
        return email.split('@')[1];
    }

function checkEmailCorrect(email){
    if (email=email){
        return email;
    }
    else {
        return "something has gone terribly wrong, this should not be returned."
    }
}
