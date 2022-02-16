import axios from 'axios'

const URL_PREFIX = 'http://localhost:3001'

const API = {
    getProfile: (token) => {
        return axios.post(`${URL_PREFIX}/api/users/me`, token, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    login: (userData) => {
        return axios.post(`${URL_PREFIX}/api/users/login`, userData);
    },
    signup: (userData) => {
        return axios.post(`${URL_PREFIX}/api/users/signup`, userData);
    },
    getPoints: (token) => {
        return axios.post(`${URL_PREFIX}/api/users/points`, token, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    addPoints: (token, _id) => {
        return axios.put(`${URL_PREFIX}/api/users/addPoints`, token, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
}

export default API;