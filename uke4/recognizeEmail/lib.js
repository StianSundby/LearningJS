function testEmail (email){
    email = email.trim();
    let seperator = email.indexOf('@');
    let whiteSpace = email.indexOf(' ');
    if (seperator >= 1){
        if (whiteSpace > 0){
            return email;
        }
    }
}