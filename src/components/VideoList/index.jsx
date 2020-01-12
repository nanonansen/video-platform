import React, { useEffect, useState } from "react";
import { db } from "../../base";
import VideoListItem from "../VideoListItem";

const VideoList = () => {
    const [videoData, setVideoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = db
            .collection("videos")
            .onSnapshot(querySnapshot => {
                if (querySnapshot.size) {
                    let videos = [];
                    querySnapshot.forEach(doc => {
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
        <div className="video-list">
            {videoData.map(video => (
                <VideoListItem key={video.uid} data={video} />
            ))}
        </div>
    );
};

export default VideoList;
