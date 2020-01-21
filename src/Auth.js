import React, { useState, useEffect } from "react";
import { withFirebase } from "./components/Firebase";

export const AuthContext = React.createContext();

const AuthProvider = ({ children, firebase }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        console.log("USE EFFECT");
        // firebase.auth.onAuthStateChanged(setCurrentUser);
        firebase.onAuthUserListener(setCurrentUser, () => {
            setCurrentUser(null);
        });
    }, [firebase, firebase.auth]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export default withFirebase(AuthProvider);
