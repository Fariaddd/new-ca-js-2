import {getUserName} from "./Storage/Storage.js";
import {getToken} from "./Storage/Storage.js";

const accessToken = getToken();
if(!accessToken){
location.href = "/sign-in.html"}

function createHeaderBar() {
 
    const {pathname} = document.location;
    const navBar = document.querySelector("#nav-bar");
    if (navBar) {
        const userName = getUserName();
        let navLinks = `
            <li class="p-6"><a href="/sign-up.html" class="${pathname === "/sign-up.html" ? "text-blue-600" : ""}">SignUp</a></li>
            <li class="p-6"><a href="/sign-in.html" class="${pathname === "/sign-in.html" ? "text-blue-600" : ""}">LogIn</a></li>
            `;
        if (userName) {
                navLinks = `
                                <li class="p-6 ">
                                <a href="/index.html" class="${pathname === "/index.html" ? "text-blue-600" : ""}">Home</a>
                                </li>
                                <li class="p-6">
                                    <a href="/create-post.html" class="${pathname === "/create-post.html" ? "text-blue-600" : ""}">Create Post</a>
                                </li>
                                <li class="p-6">
                                <a href="/my-post.html" class="${pathname === "/my-post.html" ? "text-blue-600" : ""}">My-Posts</a>
                                </li>
                                <li class="p-6"><span>Hello ${userName}</span></li>
                                <li class="p-6"> <button id="logOut-btn">LogOut</button></li> 
                            `
            } 
        navBar.innerHTML = `
        <ul  class="flex">
           ${navLinks}
        </ul>`
    }
}

export {createHeaderBar};
