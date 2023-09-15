import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
const { VITE_APP_HOST } = import.meta.env;

const todoRequest = axios.create({
    baseURL : `${VITE_APP_HOST}/todos/`,
});

const userRequest = axios.create({
    baseURL : `${VITE_APP_HOST}/users/`,
});

// request 攔截器，每一次送出request時觸發處理
todoRequest.interceptors.request.use(
    config => {
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

        config.headers['Authorization'] = token;
        return config;
    }
)
//export出去可以使用的方法
export default {
    async LOGIN (formData){
        const res = await userRequest.post(`sign_in`, formData);
        return res.data;
    },
    async LOGOUT(){
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

        await userRequest.post(`sign_out`, {}, {
            headers: {
                Authorization : token
            }
        });
    },
    async SIGNUP(formData){
        await userRequest.post(`sign_up`, formData);
    },
    async GET (){
        const res = await todoRequest.get();
        return res.data.data;
    },
    async TOGGLE (id) {
        const res = await todoRequest.patch(`${id}/toggle`, {});
        //console.log(res);
    },
    async DELETE (id){
        await todoRequest.delete(`${id}`, {});
    },
    async ADD (data){
        await todoRequest.post('', data, {});
    }
}
    