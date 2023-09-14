import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
const { VITE_APP_HOST } = import.meta.env;

const userRequest = axios.create({
    baseURL : `${VITE_APP_HOST}/todos/`,
});

// request 攔截器，每一次送出request時觸發處理
userRequest.interceptors.request.use(
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
    async GET (){
        const res = await userRequest.get();
        //console.log(res.data.data);
        return res.data.data;
    },
    async TOGGLE (id) {
        const res = await userRequest.patch(`${id}/toggle`, {});
        //console.log(res);
    },
    async DELETE (id){
        await userRequest.delete(`${id}`, {});
    },
    async ADD (data){
        await userRequest.post('', data, {});
    }
}
    