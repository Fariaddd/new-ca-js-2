import {GET_USER_POSTS} from "./API-URL/api.js";
import { getToken } from "./Storage/Storage.js";

const postContainer = document.querySelector("#posts-container")
const accessToken = getToken();

(async function getUserPosts() {
    const response = await fetch(GET_USER_POSTS, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response: ", response);
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log("jsonResponse posts: ", jsonResponse.posts);
        const {posts} = jsonResponse;
        const numberOfPosts = posts.length;
        for (let i = 0; i < numberOfPosts; i++) {
            postContainer.innerHTML += `
            <li class="relative px-4 py-5 bg-white">
                <div class="flex justify-between space-x-3">
                    <div class="flex-1 min-w-0">
                        <a href="#" class="block focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            <p class="text-sm font-medium text-gray-900 truncate">Gloria Roberston</p>
                            <p class="text-sm text-gray-500 truncate">${posts[i].title}</p>
                        </a>
                    </div>
                </div>
                <div class="mt-1">
                    <p class="text-sm text-gray-600 line-clamp-2">${posts[i].body}</p>
                </div>
            </li>`
        }
    } else {
        const err = await response.json();
        // console.log(err);
    }
})()