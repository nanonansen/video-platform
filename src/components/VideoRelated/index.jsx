import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";

import Wrapper from "../Wrapper";
import VideoListItem from "../VideoListItem";

const VideoRelated = ({ firebase, category }) => {
    const [relatedState, setRelatedState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const videoRef = firebase.videos();
        videoRef
            .where("categories", "==", category)
            .orderBy("date", "asc")
            .limit(4)
            .get()
            .then(querySnapshot => {
                const videos = [];
                querySnapshot.forEach(doc => {
                    videos.push(doc.data());
                    setIsLoading(false);
                });
                setRelatedState(videos);
            })
            .catch(error => {
                console.log(error.message);
                setIsLoading(false);
            });
    }, [category, firebase]);
    if (isLoading) return <Wrapper>Is Loading...</Wrapper>;
    return (
        <div className="related-videos">
            <h2>Related Videos</h2>
            <div className="auto-grid">
                {relatedState.map((video, index) => {
                    return <VideoListItem data={video} key={video.uid} />;
                })}
            </div>
        </div>
    );
};

export default withFirebase(VideoRelated);
