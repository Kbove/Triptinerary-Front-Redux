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
    savedItinerary: (token, itineraryInfo) => {
        return axios.get(`${URL_PREFIX}/api/itineraries/savedItinerary`, itineraryInfo, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getPurchasedItineraries: (token) => {
        return axios.post(`${URL_PREFIX}/api/itineraries/purchased`, token, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    createItinerary: (token, newItinerary) => {
        return axios.post(`${URL_PREFIX}/api/itineraries/createItinerary`, newItinerary, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    purchaseItinerary: (token, _id) => {
        return axios.put(
            `${URL_PREFIX}/api/itineraries/purchaseItinerary`, _id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    },
    getAllItineraries: () => {
        return axios.get(`${URL_PREFIX}/api/itineraries/itinerary`)
    },
    searchCity: (token, city) => {
        return axios.post(
            `${URL_PREFIX}/api/itineraries/searchCity`, city, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    },

    itineraryById: (id) => {
        return axios.post(
            `${URL_PREFIX}/api/itineraries/itinerary/${id}`
        )
    },
    addPoints: (token, _id) => {
        return axios.put(`${URL_PREFIX}/api/users/addPoints`, token, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    rateItinerary: (token, ratings) => {
        return axios.put(`${URL_PREFIX}/api/itinerary/rateItinerary`, ratings, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
}

export default API;