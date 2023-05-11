import axios from "axios";

axios.defaults.baseURL='http://localhost:8080'
axios.interceptors.request.use(config=>{
   config.headers.Authorization=window.sessionStorage.getItem('token')
   return config
})

export default axios