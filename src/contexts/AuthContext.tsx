import React, {createContext, FC, useEffect } from 'react';
import { useState } from 'react';
import {fbInit, logInToFirebase, registerUserInFirebase, signOutUser } from '../services/firebaseServices';

interface IAuthContext {
    isUserSignedIn: boolean;
    register: (displayName: string, username: string, password: string) => void;
    login: (username: string, password: string) => void;
    logOut: () => void,
}

export const AuthContext = createContext<IAuthContext | undefined> (undefined);

export const AuthContextProvider: FC = (props) => {

    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    useEffect(() => {
        fbInit();
    })

    const login = async (userName: string, password: string) => {
        const userCredentials = await logInToFirebase(userName, password)

        if (userCredentials) {
            if(userCredentials.user) {
                setIsUserSignedIn(true);
            }
        } else {
            alert("Wrong username/password")
            // loginState(false)
        }
    }

    const register = async (displayName: string, username: string, password: string) => {
        await registerUserInFirebase(displayName, username, password);
    }

    const logOut = async () => {
        const signOut = await signOutUser()
        setIsUserSignedIn(false);
    }

    return(
        <AuthContext.Provider value={{isUserSignedIn, register, login, logOut}}>
            {props.children}
        </AuthContext.Provider>
    );
}
