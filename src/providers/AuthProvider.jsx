import React, { useState, useEffect, createContext } from 'react';
import { getAccesTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from '../api/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext({
        user: null,
        isLoading: true
});

function checkUserLogin( setUser ){
    const accessToken = getAccesTokenApi();
    if ( !accessToken ) {
        const refreshToken = getRefreshTokenApi();
        if ( !refreshToken ) {
            logout();
            setUser({
                user: null,
                isLoading: false
            });
            console.log (" refresh token caducado");
        }else{
            refreshAccessTokenApi( refreshToken );
            console.log (" refresh token ");
        }
    }else{
        setUser({
            user : jwtDecode( accessToken ),
            isLoading : false
        });
    }
}

export default function AuthProvider( {children} ){

    const [ user, setUser ] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin( setUser );
      }, []);

    return (
        <AuthContext.Provider value = { user }>
            { children } 
        </AuthContext.Provider>
        );
}
