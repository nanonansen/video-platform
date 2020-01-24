import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import { withFirebase } from "../Firebase";
import VideoList from "../VideoList";
import Wrapper from "../Wrapper";

const DashBoard = ({ firebase }) => {
    const [userVideos, setUserVideos] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        console.log("DashBoard USE EFFECT");

        const userId = firebase.getCurrentUserID();
        if (userId) {
            firebase.db
                .collection("videos")
                .where("users", "array-contains", userId)
                .get()
                .then(querySnapshot => {
                    let videos = [];
                    querySnapshot.forEach(doc => {
                        console.log("READ");

                        videos.push(doc.data());
                    });
                    setUserVideos(videos);
                });
        }
    }, [firebase]);
    return (
        <Wrapper>
            <h1 className="fs-xl">
                Hello,
                {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}{" "}
                ({currentUser.role})
            </h1>
            <h2>Saved Videos</h2>
            <VideoList data={userVideos} />
        </Wrapper>
    );
};

export default withFirebase(DashBoard);
