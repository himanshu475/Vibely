import axios from "axios";
import { fromJSON } from "postcss";

const api=axios.create({
    baseURL:'http://localhost:5000/api',
});


export const registerUser=async(FormData)=>{
    try{
        const res=await api.post('/auth/register', FormData);
        return res.data;
    }
    catch(err){
        throw err.response.data;
    }
}

export const loginUser=async(FormData)=>{
    try{
        const res=await api.post('/auth/login', FormData);
        return res.data;

    }
    catch(err){
        throw err.response.data;
    }
}