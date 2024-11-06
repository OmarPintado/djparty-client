import axios from 'axios'

export const clientApi= axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    },
    timeout:10000
})
clientApi.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

