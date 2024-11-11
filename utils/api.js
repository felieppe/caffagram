/**
 * @file api.js
 * @description API functions
 * @name API Functions
 * @package utils
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

/**
 * @function register
 * @description Register a new user
 * @param {string} email 
 * @param {string} password
 * @param {string} username
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * register("test@example.com", "password", "username").then((res) => { console.log(res) });
 */
async function register(email, password, username) {
    const endpoint = `${BASE_URL}/auth/register`;

    try {
        const response = await axios.post(endpoint, { email, password, username });
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function login
 * @description Login a user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * login("test@example.com", "password").then((res) => { console.log(res) });
 */
async function login(email, password) {
    const endpoint = `${BASE_URL}/auth/login`;

    try {
        const response = await axios.post(endpoint, {email, password});
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function fetchProfileById
 * @description Fetch a user profile by ID
 * @param {string} id
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * fetchProfileById('USER_ID', 'JWT_TOKEN').then((res) => { console.log(res) });
 */
async function fetchProfileById(id, jwt) {
    const endpoint = `${BASE_URL}/user/profile/${id}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function uploadPost
 * @description Upload a new post
 * @param {string} jwt
 * @param {file} image
 * @param {string} caption
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * uploadPost('JWT_TOKEN', 'IMAGE', 'CAPTION' }).then((res) => { console.log(res) });
 */
async function uploadPost(jwt, image, caption) {
    const endpoint = `${BASE_URL}/posts/upload`;
    const formData = new FormData();

    formData.append('image', image);
    formData.append('caption', caption);

    try {
        const response = await axios.post(endpoint, formData, { 
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function fetchFeed
 * @description Fetch the feed
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * fetchFeed('JWT_TOKEN').then((res) => { console.log(res) });
 */
async function fetchFeed(jwt) {
    const endpoint = `${BASE_URL}/posts/feed`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function commentPost
 * @description Comment a post
 * @param {string} id
 * @param {string} jwt
 * @param {string} comment
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * commentPost('POST_ID', 'JWT_TOKEN', 'COMMENT').then((res) => { console.log(res) });
 */
async function commentPost(id, jwt, comment) {
    const endpoint = `${BASE_URL}/posts/${id}/comments`;

    try {
        const response = await axios.post(endpoint, { content: comment }, { 
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function likePost
 * @description Like a post by ID
 * @param {string} id
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * likePost('POST_ID', 'JWT_TOKEN').then((res) => { console.log(res) });
 */
async function likePost(id, jwt) {
    const endpoint = `${BASE_URL}/posts/${id}/like`;

    try {
        const response = await axios.post(endpoint, {}, { 
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err; }
}

/**
 * @function fetchAllProfiles
 * @description Fetch all profiles
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * fetchAllProfiles('JWT_TOKEN').then((res) => { console.log(res) });
 */
async function fetchAllProfiles(jwt) {
    const endpoint = `${BASE_URL}/user/all`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

/**
 * @function addFriendById
 * @description Add a friend by ID
 * @param {string} id
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * addFriendById('USER_ID', 'JWT_TOKEN').then((res) => { console.log(res) });
 */
async function addFriendById(id, jwt) {
    const endpoint = `${BASE_URL}/user/add-friend/${id}`;

    try {
        const response = await axios.post(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

/**
 * @function editMyProfile
 * @description Edit the current user's profile
 * @param {string} jwt
 * @param {object} data
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * editMyProfile('JWT_TOKEN', {username: 'NEW_USERNAME', description: 'NEW_DESCRIPTION', profilePicture: 'NEW_PROFILE_PICTURE'}).then((res) => { console.log(res) });
 */
async function editMyProfile(jwt, data) {
    const endpoint = `${BASE_URL}/profile/edit`;

    try {
        const response = await axios.post(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }, data);
        return response.data;
    } catch (err) { throw err }
}

/**
 * @function getCommentById
 * @description Get a comment by ID
 * @param {string} id
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * getCommentById('COMMENT_ID', 'JWT_TOKEN').then((res) => { console.log(res) });
 */
async function getCommentById(id, jwt) {
    const endpoint = `${BASE_URL}/posts/comments/${id}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

/**
 * @function removeLike
 * @description Remove a like by ID
 * @param {string} id
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * removeLike('POST_ID', 'JWT_TOKEN').then((res) => { console.log(res) });
 */
async function removeLike(id, jwt) {
    const endpoint = `${BASE_URL}/posts/${id}/like`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

/**
 * @function removeFriendById
 * @description Remove a friend by ID
 * @param {string} id
 * @param {string} jwt
 * @returns {Promise<object>}
 * @throws {Error}
 * @example
 * removeFriendById('USER_ID', 'JWT_TOKEN').then((res) => { console.log(res) });
 */
async function removeFriendById(id, jwt) {
    const endpoint = `${BASE_URL}/user/remove-friend/${id}`;

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

export { register, login, fetchProfileById, uploadPost, fetchFeed, commentPost, likePost, fetchAllProfiles, addFriendById, editMyProfile, getCommentById, removeLike, removeFriendById };