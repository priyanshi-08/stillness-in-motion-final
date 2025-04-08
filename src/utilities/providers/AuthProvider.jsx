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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            setError(error.code);
            setLoader(false);
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
        let isMounted = true;
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!isMounted) return;
            
            setUser(user);
            setLoader(true);

            try {
                if (user) {
                    const { data } = await axios.post(
                        'https://stillness-in-motion-server.onrender.com/api/set-token',
                        { 
                            email: user.email, 
                            name: user.displayName 
                        }
                    );
                    localStorage.setItem('token', data.token);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Token management error:', error);
            } finally {
                if (isMounted) {
                    setLoader(false);
                }
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    
    
    const contextValue = {
        // State
        user,
        loader, 
        error,
        
        // Methods
        signUp,
        login,
        logout,
        updateUser,
        googleLogin,
        
        // Setters
        setError,
        setLoader
    };


return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
)
}
export default AuthProvider
