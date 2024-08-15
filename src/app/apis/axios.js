import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    mode: 'cors',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.token}`
    },
})

export default axios