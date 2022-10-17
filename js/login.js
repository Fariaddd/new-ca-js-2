import { emailValidation } from "./validation.js"
import {USER_LOGIN} from "./API-URL/api.js"
import { saveUser, saveToken } from "./Storage/Storage.js";

const logForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const errorMessage = document.querySelector("#error-message");

if (logForm) {
    logForm.addEventListener("submit", function (event) {
        event.preventDefault();

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
        let isFormValid = isEmail && isValidEmail && isPassword;

        if (isFormValid) {
            const userData = {
                "email": email.value,
                "password": password.value
            }
            const USER_LOGIN_URL = `${USER_LOGIN}`;

            (async function logInUser() {
                const response = await fetch(USER_LOGIN_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    const data = await response.json();
                    saveToken(data.accessToken);  // save Token
                       const userToSave = {      // save user
                        name: data.name,
                        email: data.email
                    }
                    saveUser(userToSave);
                    location.href = "/index.html"
                } else {
                    const err = await response.json();
                    const message = `${err.message}`;
                    throw new Error(message);
                }
            })().catch(error => {
                // console.log(error);
                errorMessage.innerHTML = `Sorry amigo 🥹 !! ${error.message}`
            });
        } else {
        }
    });
}