import { getToken } from "./Storage/Storage";
import {GET_POST_BY_ID_DYNAMIC, EDIT_POST  } from "./API-URL/api.js";

const editPostForm = document.querySelector("#edit-post-form");
const postTitle = document.querySelector("#postTitle");
const postDescription = document.querySelector("#postDescription");
const postTitleError = document.querySelector("#postTitleError");
const postDescriptionError = document.querySelector("#postDescriptionError");
const errorMessage = document.querySelector("#error-message");
const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");

const accessToken = getToken();
if(!accessToken){
    location.href = "/sign-in.html" 
}

async function getPostByIdDynamic (){
    const response = await fetch (`${EDIT_POST}/${postId}`, {
    method : "GET",
    headers : { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
    })
    const data = await response.json();  // convert data to JSON();
    if(response.status === 200 ){
    const {title, body, created, updated, id} = data;
    postTitle.value = title;
    postDescription.value = body;
}
else {
    const err = await response.json();
    throw err.message;
}

}
getPostByIdDynamic().catch( err => {
    console.log(err);
});

editPostForm.addEventListener("submit", function (event){
    event.preventDefault(); 
    let isPostTitle = false;
    if(postTitle.value.trim().length > 0){
        postTitleError.classList.add("hidden");
        isPostTitle = true;
    } else {
        postTitleError.classList.remove("hidden");
    }
    let isPostDescription = false;
    if(postDescription.value.trim().length > 0){
        postDescriptionError.classList.add("hidden");
        isPostDescription = true;
    } else {
        postDescriptionError.classList.remove("hidden");
    }
    let formValid = isPostTitle && isPostDescription;
    if(formValid){
    const postData = {
        "title": postTitle.value,
        "body": postDescription.value
    }
    const accessToken = getToken();

    (async function editPost (){
        const response = await fetch (`${GET_POST_BY_ID_DYNAMIC}/${postId}`, {
            method : "PUT",
            headers : { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
            })
            if(response.ok){
                const data = await response.json();
                location.href = `single-post.html?post_id=${postId}`
            } else {
                const err = await response.json();
                const message = "Failed";
                throw new Error(message)
            }
            editPostForm.reset();
    })().catch(err => {
        errorMessage.innerHTML = ` post failed${err.message}`
    });

    } else {
        
    }
});




