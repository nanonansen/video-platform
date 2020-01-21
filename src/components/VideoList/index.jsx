import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";
import VideoListItem from "../VideoListItem";

const VideoList = ({ firebase, data }) => {
    const [videoData, setVideoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setVideoData(data);
        setIsLoading(false);
    }, [data]);
    if (isLoading) return <div>Is Loading...</div>;
    return (
        <div className="video-list auto-grid">
            {videoData &&
                videoData.map(video => (
                    <VideoListItem key={video.uid} data={video} />
                ))}
        </div>
    );
};

export default withFirebase(VideoList);
