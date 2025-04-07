import React, { createContext, useState, useEffect } from 'react'
import { app } from '../../config/firebase.init';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, signInWithRedirect } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const signUp = async (email, password) => {
        setLoader(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    const login = async (email, password) => {
        setLoader(true);
        try {
            setLoader(false);
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); 
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    const updateUser = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL: photo
            })
            setUser(auth.currentUser);

        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    //google login
    const googleLogin = async () => {
        try {
            setLoader(true);
            return await signInWithPopup(auth, provider);    
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    //check for users
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);

            if(user){
                axios.post(('https://stillness-in-motion-server.onrender.com/api/set-token'), {email: user.email, name:user.displayName})
                .then(data => {
                    if(data.data.token){
                        localStorage.setItem('token', data.data.token);
                        setLoader(false)
                    } 
                })
            } else {
                localStorage.removeItem('token');
                setLoader(false);
            }
        })
        return unsubscribe();
    }, []);
    
    
    const contextValue = { user, signUp, login, logout, updateUser, googleLogin, error, setError, setLoader};

return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
)
}
export default AuthProvider
