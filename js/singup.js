import {USER_SIGNUP} from "./API-URL/api.js";
import {emailValidation, passwordValidation} from "./validation.js"

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

contacForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isFirstName = false;
    if (firstName.value.trim().length > 0) {
        firstNameError.classList.add("hidden");
        isFirstName = true;
    } else {
        firstNameError.classList.remove("hidden");
    }
    let isEmail = false;
    if (email.value.trim().length > 0) {
        emailError.classList.add("hidden");
        isEmail = true;
    } else {
        emailError.classList.remove("hidden");
    }
    let isValidEmail = false;
    if (email.value.trim().length && emailValidation(email.value) === true) {
        emailErrorNotValid.classList.add("hidden");
        isValidEmail = true;
    } else if (email.value.trim().length && emailValidation(email.value) !== true) {
        emailErrorNotValid.classList.remove("hidden");
    }
    let isPassword = false;
    if (password.value.trim().length >= 8) {
        passwordError.classList.add("hidden");
        isPassword = true;
    } else {
        passwordError.classList.remove("hidden");
    }
    let isConfirmPassword = false;
    if (confirmPassword.value.trim().length >= 8) {
        confirmPasswordError.classList.add("hidden");
        isConfirmPassword = true;
    } else {
        confirmPasswordError.classList.remove("hidden");
    }
    let isValidPasswordMatch = false;
    isValidPasswordMatch = passwordValidation(password.value, confirmPassword.value); 
    if (isValidPasswordMatch) {
        confirmPasswordErrorNotMatching.classList.add("hidden");
        isValidPasswordMatch = true
    } else {
        confirmPasswordErrorNotMatching.classList.remove("hidden");
    }
    let isFormValid = isFirstName &&
        isEmail &&
        isValidEmail &&
        isPassword &&
        isConfirmPassword &&
        isValidPasswordMatch;

    if (isFormValid) {
        const userData = {
            "name": firstName.value,
            "email": email.value,
            "password": password.value
        }
        const REGISTER_USER_URL = USER_SIGNUP;
        (async function signUpUser() {
            try {
                const response = await fetch(REGISTER_USER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                const data = await response.json();
                if (response.ok) {
                    location.href = "sign-in.html"
                } else {
                    errorMessage.innerHTML = `Sorry !! ${data.message}`
                }
            } catch (error) {
                location.reload = "sign-up.html"
            }
        })();
    } else {
        // console.log("Validation FAILED!!");
    }
});