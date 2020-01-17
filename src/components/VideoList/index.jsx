import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";
import VideoListItem from "../VideoListItem";

const VideoList = ({ firebase }) => {
    const [videoData, setVideoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = firebase.videos().onSnapshot(snapshot => {
            if (snapshot.size) {
                let videos = [];
                snapshot.forEach(doc => {
                    videos.push({
                        ...doc.data(),
                        uid: doc.ref.id
                    });
                });
                setVideoData(videos);
                setIsLoading(false);
            } else {
                //It's empty
                setIsLoading(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    if (isLoading) return <div>Is Loading...</div>;
    return (
        <div className="video-list auto-grid">
            {videoData.map(video => (
                <VideoListItem key={video.uid} data={video} />
            ))}
        </div>
    );
};

export default withFirebase(VideoList);
