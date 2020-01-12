import React from "react";

const VideoListItem = props => {
    const { data } = props;

    return (
        <div className="single-video">
            <h2>{data.name}</h2>
        </div>
    );
};

export default VideoListItem;
