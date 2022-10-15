import { getToken } from "./Storage/Storage.js";
import {GET_POST_BY_ID} from "./API-URL/api.js";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");
const accessToken = getToken();
const singlePostContainer = document.querySelector("#post-details");
if(!accessToken){
    location.href = "/sign-in.html"
}

async function getPostById (){
    const response = await fetch(`${GET_POST_BY_ID}/${postId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    const data = await response.json(); // convert DATA to JSON
    const {title, body,  updated, id, created} = data; 

    
    singlePostContainer.innerHTML = `   <dl>
    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 capitalize">title</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${title}
        </dd>
    </div>
    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 capitalize">description</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${body}</dd>
    </div>
    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 capitalize">id</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${id}</dd>
    </div>
    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 capitalize">created</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${created}</dd>
    </div>
    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 capitalize">updated</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${updated}</dd>
    </div>
</dl>` 
}
getPostById();

