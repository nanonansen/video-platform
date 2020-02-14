import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Text from "../Text";
import Icon from "../Icon";

const VideoListItem = props => {
    const [isLoading, setIsLoading] = useState(true);

    const { data } = props;

    useEffect(() => {
        setIsLoading(false);
    }, [data]);

    if (isLoading) return <div>Is Loading...</div>;
    return (
        <div className="video-card">
            <Link to={`/video/${data.uid}`}>
                <figure className="video-card__image-container">
                    <img
                        className="video-card__image"
                        src={data.thumbnail}
                        alt=""
                    />
                    <span className="video-card__timestamp">23:28</span>
                    <span className="video-card__playicon">
                        <Icon name="play" color="#ffffff" />
                    </span>
                </figure>
                <Text className="video-card__title" bold>
                    {data.title}
                </Text>
            </Link>
        </div>
    );
};

export default VideoListItem;
