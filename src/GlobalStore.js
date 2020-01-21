import React, { useState, useEffect } from "react";
import { withFirebase } from "./components/Firebase";

export const StoreContext = React.createContext();

const StoreProvider = ({ children, firebase }) => {
    const [globalStore, setGlobalStore] = useState([]);
    useEffect(() => {
        console.log("APP USE EFFECT");

        //Fetch All Videos
        firebase
            .videos()
            .get()
            .then(function(querySnapshot) {
                let videos = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    videos.push(doc.data());
                });
                setGlobalStore(videos);
            });
    }, [firebase]);
    return (
        <StoreContext.Provider value={{ globalStore }}>
            {children}
        </StoreContext.Provider>
    );
};

export default withFirebase(StoreProvider);
