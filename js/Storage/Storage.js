const tokenKey = "token";
const userKey = "user";

function saveToken(token) {
    console.log("token: ", token)
    console.log("tokenKey: ", tokenKey)
    saveToStorage(tokenKey, token);
}

function getToken() {
    return getFromStorage(tokenKey);
}
function saveUser(user) {
    saveToStorage(userKey, user);
}
function getUserName() {
    const user = getFromStorage(userKey);
    if (userKey) {
        return user.name
    } else {
        return null;
    }
}
function saveToStorage(key, value) {  // function which save data to the local storage
    localStorage.setItem(key, JSON.stringify(value))
}
function getFromStorage(key) {   // function which gets data from the local storage
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value); // convert to JS
    } else {
        return []
    }
}
export {getToken, saveToken, saveUser, getUserName}