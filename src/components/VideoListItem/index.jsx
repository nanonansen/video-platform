import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VideoListItem = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [videoImgUrl, setVideoImgUrl] = useState("");
    const { data } = props;

    const YouTubeGetID = url => {
        var ID = "";
        url = url
            .replace(/(>|<)/gi, "")
            .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            // eslint-disable-next-line
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        } else {
            ID = url;
        }
        return ID;
    };

    useEffect(() => {
        if (data) {
            let videoId = YouTubeGetID(data.videoUrl);
            if (videoId) {
                setVideoImgUrl(
                    // `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                );
                setIsLoading(false);
            } else {
            }
        }
    }, [data]);

    if (isLoading) return <div>Is Loading...</div>;
    return (
        <div className="video-teaser">
            <Link to={`/video/${data.uid}`}>
                <img src={videoImgUrl} alt="" />
                <h2>{data.name}</h2>
            </Link>
        </div>
    );
};

export default VideoListItem;
