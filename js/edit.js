import { getToken } from "./Storage/Storage";

const postTitle = document.querySelector("#postTitle");
const postDescription = document.querySelector("#postDescription");
const editPostForm = document.querySelector("#edit-post-form");
const postTitleError = document.querySelector("#postTitleError");
const postDescriptionError = document.querySelector("#postDescriptionError");

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");

const accessToken = getToken();
if(!accessToken){
    location.href = "/sign-in.html" 
}

async function getPostByIdDynamic (){
    const response = await fetch (`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
    method : "GET",
    headers : { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
    })
    const data = await response.json();
    postTitle.value = data.title;
    postDescription.value = data.body;

}

getPostByIdDynamic();

editPostForm.addEventListener("submit", function (event){
    event.preventDefault();
    const postData = {
        "title": postTitle.value,
        "body": postDescription.value
    }
    async function editPost (){
        const response = await fetch (`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
            method : "PUT",
            headers : { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
            })
            if(response.ok){
                location.href = `single-post.html?post_id=${postId}`
            }

        
    }
    editPost();
})



