import { getUserName } from "../Storage/Storage.js";

const userName = getUserName();

const API_BASE_URL = "https://nf-api.onrender.com/"
const USER_LOGIN = API_BASE_URL + "api/v1/social/auth/login"
const USER_SIGNUP = API_BASE_URL + "api/v1/social/auth/register"


const CREATE_POST = API_BASE_URL + "api/v1/social/posts"
const GET_POSTS_URL = API_BASE_URL + "api/v1/social/posts"
const GET_USER_POSTS = API_BASE_URL + `api/v1/social/profiles/${userName}?_posts=true`

export {API_BASE_URL, USER_LOGIN, USER_SIGNUP, CREATE_POST, GET_POSTS_URL, GET_USER_POSTS};


