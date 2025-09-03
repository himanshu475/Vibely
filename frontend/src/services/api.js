import axios from "axios";
// import { fromJSON } from "postcss";

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

export const updateUserProfile=async(FormData, token)=>{
    try{
        const res=await api.patch('/auth/profile', FormData, {
            headers:{
                'x-auth-token':token,
            },
        });
        return res.data;
    }
    catch(err){
        throw err.response.data;
    }
};


export const getUserProfile = async (token) => {
  try {
    const res = await api.get('/auth/me', {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};