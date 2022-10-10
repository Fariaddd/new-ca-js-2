import { getToken } from "./Storage/Storage.js";
import { GET_POSTS_URL } from "./API-URL/api.js";

const postsContainer = document.querySelector("#posts-container");
const accessToken = getToken();
if(!accessToken){
    location.href = "/sign-in.html"
}

(async function getPosts(){
    const response = await fetch(GET_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if(response.ok){
        const posts = await response.json();
        const listHtmlPosts = posts.map((post) => {
            const postBody = post.body;
            const postTitle = post.title;
            return (` 
                <li class="relative px-4 py-5 bg-white  "> 
                    <div class="flex justify-between space-x-3 ">
                        <div class="flex-1 min-w-0 ">
                            <a href="/single-post.html?post_id=${post.id}" class="block focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <p class="text-sm font-medium text-gray-900 truncate">Gloria Roberston</p>
                                <p class="text-sm text-gray-500 truncate">${postTitle}</p>
                            </a>
                        </div>
                    </div>
                    <div class"mt-1">
                    <p class="text-sm text-gray-600 line-clamp-2">${postBody}</p>
                    </div>
                </li>    
                `)
        }).join('')
        console.log(listHtmlPosts);
        postsContainer.insertAdjacentHTML('beforeend', listHtmlPosts);

    } else{ 
        const err = await response.json();
        const message = `somethiung went wrong${err}`;
        throw new Error(message)
    }
})().catch( err=> {


});

