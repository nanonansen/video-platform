import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthContext } from "../../Auth";
import ReactPlayer from "react-player";

import Wrapper from "../Wrapper";
import SaveVideo from "../SaveVideo";
import Button from "../Button";
// import VideoRelated from "../VideoRelated";

const VideoDetail = ({ firebase }) => {
    const [videoData, setVideoData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let { id } = useParams();
    let { currentUser } = useContext(AuthContext);

    // useEffect(() => {
    //     console.log("VideoDetail USE EFFECT");
    //     setIsLoading(true);
    //     firebase
    //         .videos()
    //         .doc(id)
    //         .get()
    //         .then(doc => {
    //             if (doc.exists) {
    //                 setVideoData(doc.data());
    //                 setIsLoading(false);
    //             } else {
    //                 console.log("doc not found");
    //                 setIsLoading(false);
    //             }
    //         });
    // }, [firebase, id]);

    useEffect(() => {
        console.log("VideoDetail USE EFFECT");

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
        <main>
            <div className="videoWrapper">
                <div className="video__player">
                    <div className="video__player-wrapper">
                        <ReactPlayer
                            className="react-player"
                            width="100%"
                            height="100%"
                            url={videoData.videoUrl}
                            light={true}
                            config={{
                                youtube: {
                                    playerVars: {
                                        showinfo: 0,
                                        controls: 0,
                                        fs: 0,
                                        modestbranding: 1,
                                        rel: 0
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="video__meta">
                    {currentUser !== null ? (
                        <SaveVideo
                            data={videoData}
                            isSaved={isSaved}
                            handleSave={handleSave}
                            handleRemove={handleRemove}
                            saveCount={videoData.saveCount}
                        />
                    ) : (
                        <Link to={"/login"}>
                            <Button className="button--primary">Save</Button>
                        </Link>
                    )}
                    <Button>Share</Button>

                    <h1 className="fs-xl">{videoData.name}</h1>
                    <Link to={`/speaker/${videoData.speaker.uid}`}>
                        {videoData.speaker.name}
                    </Link>

                    <Link to={`/conference/${videoData.conference.uid}`}>
                        <p>{videoData.conference.name}</p>
                    </Link>
                    <p>{videoData.description}</p>
                    <p>Likes: {videoData.users.length}</p>
                    <div className="video__tags">
                        {videoData.tags &&
                            videoData.tags.map(tag => {
                                let tagUrl = tag
                                    .toLowerCase()
                                    .split(" ")
                                    .join("_");
                                return (
                                    <Link to={`/tag/${tagUrl}`} key={tag}>
                                        <span className="tag">{tag}</span>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </div>
            <Wrapper>
                {/* <VideoRelated category={videoData.categories} /> */}
            </Wrapper>
        </main>
    );
};

export default withFirebase(VideoDetail);
