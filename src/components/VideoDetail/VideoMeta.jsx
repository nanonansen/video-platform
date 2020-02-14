import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import SaveVideo from "../SaveVideo";
import Text from "../Text";
import Avatar from "../Avatar";

const VideoMeta = props => {
    const { currentUser, videoData, isSaved, handleSave, handleRemove } = props;
    return (
        <div className="video__meta">
            <div className="video__content">
                {videoData.speaker.map(speaker => {
                    return (
                        <Link
                            className="video__speaker"
                            to={`/speaker/${speaker.uid}`}
                            key={speaker.uid}
                        >
                            {speaker.name}
                        </Link>
                    );
                })}
                <Text rank={1} subtitle>
                    {videoData.title}
                </Text>

                <Avatar
                    imgUrl={videoData.conference.profileImage}
                    id={videoData.conference.uid}
                    name={videoData.conference.name}
                />
                <div className="video__description">
                    <Text>{videoData.description}</Text>
                </div>

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
            <div className="video__actions">
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
            </div>
        </div>
    );
};

export default VideoMeta;
