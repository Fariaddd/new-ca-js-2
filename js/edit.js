import { getToken } from "./Storage/Storage";

const postTitle = document.querySelector("#postTitle")
const postDescription = document.querySelector("#postDescription")
const editPostForm = document.querySelector("#edit-post-form")

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");

const accessToken = getToken();

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
    console.log("postData", postData);
})



