import {GET_USER_POSTS, DELETE_POST_BY_ID} from "./API-URL/api.js";
import { getToken } from "./Storage/Storage.js";

const postContainer = document.querySelector("#posts-container");
const postsNotification = document.querySelector(".posts-notification")
const accessToken = getToken();

async function getUserPosts() {
    const response = await fetch(GET_USER_POSTS, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.ok) {
        const jsonResponse = await response.json();
        postContainer.innerHTML= "";
        const {posts} = jsonResponse;
        if(!posts.length) {
            postsNotification.innerHTML = "Sorry you currently don't have any posts";
        } else{
             const numberOfPosts = posts.length;
             for (let i = 0; i < numberOfPosts; i++) {
             postContainer.innerHTML += `
                <li class="relative px-4 py-5 bg-white">
                    <div class="flex justify-between space-x-3">
                        <div class="flex-1 min-w-0">
                            <a href="#" class="block focus:outline-none">
                                <p class="text-sm font-medium text-gray-900 truncate">Gloria Roberston</p>
                                <p class="text-sm text-gray-500 truncate">${posts[i].title}</p>
                            </a>
                        </div>
                    </div>
                    <div class="mt-1">
                        <p class="text-sm text-gray-600 line-clamp-2">${posts[i].body}</p>
                    </div>
                    <div class="flex">
                        <button
                            data-id="${posts[i].id}"
                            type="button"
                            class="delete-btn items-center rounded bg-red-100 px-4 py-3 text-base font-medium leading-4 text-red-700 hover:bg-red-300">Delete</button>
                    </div>
                </li>`
        }
    }
    } else {
        postsNotification.innerHTML = await response.json()
    }
}
    getUserPosts().then(()=>{
        handleDeleteBtns();
    });
        function handleDeleteBtns(){
        const deletes = document.getElementsByClassName("delete-btn")
        const totalDeleteBtns = deletes.length;
        for (let i = 0; i < totalDeleteBtns; i++){
            deletes[i].addEventListener("click", function(){
                const postId = this.dataset.id;
                deletePostById(postId);
            });
        }
    }
function deletePostById(id){
    const deleteUserById = async () =>{
        try{
            let resposne = await fetch(`${DELETE_POST_BY_ID}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if(resposne.status === 200){
                getUserPosts().then(() => {
                    handleDeleteBtns();
                });
            } else {
                const err = await resposne.json();
                const message = `something went wrong ${err}`;
                throw Error (message)
            }
        } catch (error) {
            // console.log(error);
        }
     }
     deleteUserById().then(r => {
     });
}
