import http from "./httpServices";
export function getAllData (){
    return http.get("");
}