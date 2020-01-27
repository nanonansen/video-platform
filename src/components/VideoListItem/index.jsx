import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VideoListItem = props => {
    const [isLoading, setIsLoading] = useState(true);

    const { data } = props;

    useEffect(() => {
        setIsLoading(false);
    }, [data]);

    if (isLoading) return <div>Is Loading...</div>;
    return (
        <div className="video-teaser">
            <Link to={`/video/${data.uid}`}>
                <img src={data.thumbnail} alt="" />
                <h2>{data.title}</h2>
            </Link>
        </div>
    );
};

export default VideoListItem;
