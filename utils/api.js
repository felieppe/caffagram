import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api'

async function register(data) {
    const endpoint = `${BASE_URL}/auth/register`;

    try {
        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (err) { throw err }
}

async function login(data) {
    const endpoint = `${BASE_URL}/auth/login`;

    try {
        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (err) { throw err }
}

async function fetchProfileById(id, jwt) {
    const endpoint = `${BASE_URL}/user/profile/${id}`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

async function uploadPost(jwt, post) {
    const endpoint = `${BASE_URL}/posts/upload`;
    const formData = new FormData();

    formData.append('image', post.image);
    formData.append('caption', post.caption);

    try {
        const response = await axios.post(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }, post);
        return response.data;
    } catch (err) { throw err }
}

async function fetchFeed(jwt) {
    const endpoint = `${BASE_URL}/posts/feed`;

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

async function commentPost(id, jwt, comment) {
    const endpoint = `${BASE_URL}/posts/${id}/comments`;

    try {
        const response = await axios.post(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }, comment);
        return response.data;
    } catch (err) { throw err }
}

async function likePost(id, jwt) {
    const endpoint = `${BASE_URL}/posts/${id}/like`;

    try {
        const response = await axios.post(endpoint, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (err) { throw err }
}

export { register, login, fetchProfileById, uploadPost, fetchFeed, commentPost, likePost };