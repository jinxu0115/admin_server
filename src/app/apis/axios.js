import Axios from 'axios';

let token = "";
if (typeof window !== "undefined") {
    token = sessionStorage.getItem('token') || '';
}

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    mode: 'cors',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
    },
});

export default axios;