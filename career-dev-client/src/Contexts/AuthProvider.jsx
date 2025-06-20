import {createContext, useEffect, useState} from 'react';
import {GoogleAuthProvider,
        signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebase.js';


export const AuthCotext = createContext(null)
const goggleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [saveUser, setSaveUser] = useState(null)

    const loginGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, goggleProvider)

    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setSaveUser(currentUser)
            setLoading(false)
            console.log(currentUser)

        })
        return () => {
            unsubscribe()
        }
    }, []);


    const userInfo = {
        loginGoogle,
        signOutUser,
        loading,
        saveUser
    }
    return (
        <AuthCotext value={userInfo}>
            {children}
        </AuthCotext>
    );
};

export default AuthProvider;