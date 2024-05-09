import axios from "axios";
axios.defaults.baseURL ="https://api.coincap.io/v2/assets";

axios.interceptors.response.use((response)=>{
    return response
}
,(err)=>{
    return Promise.reject();
});
const http = {
    get:axios.get,
}
export default http;