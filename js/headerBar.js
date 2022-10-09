import {getUserName} from "./Storage/Storage.js";
function createHeaderBar() {
    const {pathname} = document.location;
    const navBar = document.querySelector("#nav-bar");

    const userName = getUserName();
    let authLink = `
            <li class="p-8">
                <a href="/sign-up.html" class="${pathname === "/sign-up.html" ? "text-blue-600" : ""}">SignUp</a>
            </li>
            <li class="p-8">
            <a href="/sign-in.html" class="${pathname === "/sign-in.html" ? "text-blue-600" : ""}">LogIn</a>
            </li>
`;
    if (userName) {
        authLink = `
            <li class="p-8">
                <a href="/index.html" class="${pathname === "/" ? "text-blue-600" : ""}">Home</a>
            </li>
            <li class="p-8"><span>Hello 👋  ${userName}</span></li>
            <li class="p-8"><a href="/create-post.html" class="${pathname === "/create-post.html" ? "text-blue-600" : ""}">Create Post</a></li>
                    `
    }
    navBar.innerHTML = `
        <ul class="flex">
            ${authLink}
        </ul>`
}

export default createHeaderBar;
