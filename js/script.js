 import '../style/style.css'
 import {createHeaderBar} from "./headerBar.js";
 import {clearStorage} from "./Storage/Storage.js";

 createHeaderBar();






 const btn = document.querySelector("#logOut-btn");
 if(btn){
    btn.addEventListener("click", function(){
        console.log("im clicked");
        clearStorage();
        window.location.replace("/sign-in.html");
     });
 } 



