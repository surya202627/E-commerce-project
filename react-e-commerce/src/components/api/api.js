import axios from 'axios';

// Network Layer

const api = axios.create({baseURL: "http://localhost:8080"});

api.interceptors.request.use((config)=>{

    const publicUrls = ["/register","/login","/api/products"];

    const isbublic = publicUrls.some((url)=>
        config.url.includes(url)
    );

    if(!isbublic){

        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;

        }

    }

    return config;


})

export default api;


