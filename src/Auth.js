import React, { useState, useEffect } from "react";
import app, { db } from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                const docRef = db.collection("users").doc(authUser.uid);

                docRef.get().then(doc => {
                    const dbUser = doc.data();
                    authUser = { ...authUser, ...dbUser };
                    setCurrentUser(authUser);
                });
            }
        });
    }, []);
    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
