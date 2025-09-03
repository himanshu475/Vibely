import React, {createContext, useState, useEffect, Children} from "react";


export const UserContext=createContext();

export const UserProvider=({children})=>{
    const [token, setToken]=useState(localStorage.getItem('token') || null);

    const [user, setUser]=useState(null);

    useEffect(()=>{
        if(token){
            console.log('Token is available:', token);
        }
    }, [token]);

    const authContext={
        token,
        setToken,
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={authContext}>
            {children}
        </UserContext.Provider>
    )

}