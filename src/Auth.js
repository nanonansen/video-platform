import React, { useState, useEffect } from "react";
import { withFirebase } from "./components/Firebase";

export const AuthContext = React.createContext();

const AuthProvider = ({ children, firebase }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //     app.auth().onAuthStateChanged(authUser => {
    //         if (authUser) {
    //             const docRef = db.collection("users").doc(authUser.uid);

    //             docRef.get().then(doc => {
    //                 const dbUser = doc.data();
    //                 authUser = { ...authUser, ...dbUser };
    //                 setCurrentUser(authUser);
    //             });
    //         }
    //     });
    // }, []);
    useEffect(() => {
        firebase.auth.onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export default withFirebase(AuthProvider);
