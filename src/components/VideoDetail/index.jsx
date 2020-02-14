import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthContext } from "../../Auth";

import Wrapper from "../Wrapper";

import VideoMeta from "./VideoMeta";
import VideoPlayer from "../VideoPlayer";
// import VideoRelated from "../VideoRelated";

const VideoDetail = ({ firebase }) => {
    const [videoData, setVideoData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let { id } = useParams();
    let { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);
        if (currentUser !== null) {
            const cleanUp = firebase
                .videos()
                .doc(id)
                .onSnapshot(function(doc) {
                    if (doc.exists) {
                        console.log("Read");
                        setVideoData(doc.data());
                        if (doc.data().users) {
                            const currentUserID = firebase.getCurrentUserID();
                            const found = doc
                                .data()
                                .users.includes(currentUserID);
                            if (found) {
                                setIsSaved(true);
                            }
                        }

                        setIsLoading(false);
                    } else {
                        console.log("doc not found");
                        setIsLoading(false);
                    }
                });

            return () => {
                cleanUp();
            };
        } else {
            firebase
                .videos()
                .doc(id)
                .get()
                .then(doc => {
                    console.log("READ");

                    setVideoData(doc.data());
                    setIsLoading(false);
                });
        }
    }, [firebase, currentUser, id]);

    const handleSave = () => {
        const userID = firebase.getCurrentUserID();
        const videoID = videoData.uid;
        const videoObj = {
            name: videoData.name,
            uid: videoData.uid,
            videoUrl: videoData.videoUrl,
            isSaved: true
        };
        console.log("userID", userID);
        console.log("videoObj", videoObj);

        firebase.doSaveVideoToUserDoc(userID, videoObj, videoID);
    };
    const handleRemove = () => {
        const userID = firebase.getCurrentUserID();
        const videoID = videoData.uid;
        firebase.doRemoveUserFromVideo(userID, videoID);
        setIsSaved(false);
    };

    if (isLoading) return <Wrapper>Is Loading...</Wrapper>;
    return (
        <main className="videodetail">
            <Wrapper>
                <VideoPlayer videoUrl={videoData.videoUrl} />
            </Wrapper>
            <Wrapper>
                <VideoMeta
                    currentUser={currentUser}
                    videoData={videoData}
                    isSaved={isSaved}
                    handleSave={handleSave}
                    handleRemove={handleRemove}
                />
            </Wrapper>
        </main>
    );
};

export default withFirebase(VideoDetail);
