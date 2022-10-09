function emailValidation(email){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    if(email.match(emailRegex)){
        return true;
    }else{
        return false
    }
}
function passwordValidation(password, confirmPassword) {
    if (!password) {
        return false;
    }
    if (!confirmPassword) {
        return false;
    }
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}
export{emailValidation, passwordValidation}