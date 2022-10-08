 import '../style/style.css'

const contacForm = document.querySelector("#contact-form");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const confirmPasswordErrorNotMatching = document.querySelector("#confirmPasswordErrorNotMatching");
const errorMessage = document.querySelector("#error-message");

contacForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    let isFirstName = false;
    if(firstName.value.trim().length > 0 ){
    firstNameError.classList.add("hidden");
    isFirstName = true;
    }else {
        firstNameError.classList.remove("hidden");
    }
    let isEmail = false;
    if(email.value.trim().length > 0){
        emailError.classList.add("hidden");
        isEmail = true
    }else{
        emailError.classList.remove("hidden");
    }
    let isEmailValid = false;
    if(email.value.trim().length && emailValidation(email.value) === true){
        emailErrorNotValid.classList.add("hidden");
        isEmailValid = true;
    }else if (email.value.trim().length && emailValidation(email.value) !== true) {
        emailErrorNotValid.classList.remove("hidden");
    }
    let isPassword = false;
    if(password.value.trim().length >= 8 ){
        passwordError.classList.add("hidden");
        isPassword = true; 
    }else{
        passwordError.classList.remove("hidden");
    }
    let isConfPass = false
    if(confirmPassword.value.trim().length >= 8 ){
        confirmPasswordError.classList.add("hidden");
        isConfPass = true;   
    }else{
        confirmPasswordError.classList.remove("hidden");
    }
     let isPassMatch = false;
      isPassMatch = passwordValidation();
     let formValid =  isFirstName &&
            isEmail && 
            isEmailValid && 
            isPassword && 
            isConfPass && 
            isPassMatch 
            if(formValid){
                // console.log(" good, validation succesd!");
                const userData = {
                    "name" : firstName.value,
                    "email" : email.value,
                    "password" : password.value
                }
                console.log("userData ", userData);
                const REGISTER_USER_URL = "https://nf-api.onrender.com/api/v1/social/auth/register";
                (async function singUp (){
                    try{
                        const response = await fetch(REGISTER_USER_URL, {
                            method: "POST",
                            headers:{
                                "Content-type": "application/json"
                            },
                            body : JSON.stringify(userData)
                        });
                        const data = await response.json();
                        if(response.ok){
                        } else{
                            errorMessage.innerHTML = `Sorry ${data.message}`
                        }
                    }
                    catch (error){
                    }
                })();
                } else {
                    console.log("validation failed!");
            }
});
function emailValidation(email){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    if(email.match(emailRegex)){
        return true;
    }else{
        return false
    }
}
function passwordValidation(){
     const passValue = password.value;
     const confPassValue = confirmPassword.value;

     if(!passValue){
         return false;
     }
     if(!confPassValue){
         return false;
    }
    if(passValue !== confPassValue){
         confirmPasswordErrorNotMatching.classList.remove("hidden")
         return false;
     }else{
         confirmPasswordErrorNotMatching.classList.add("hidden")
         return true; 
    }
 }
