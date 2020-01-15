import React from "react";
import { Link } from "react-router-dom";

const VideoListItem = props => {
    const { data } = props;

    const youtube_parser = url => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : false;
    };
    const videoId = youtube_parser(data.videoUrl);

    return (
        <div className="single-video">
            <Link to={`/video/${data.uid}`}>
                <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt=""
                />
                <h2>{data.name}</h2>
            </Link>
        </div>
    );
};

export default VideoListItem;
