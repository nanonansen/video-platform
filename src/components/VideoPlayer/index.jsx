import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className="video__player">
            <div className="video__player-wrapper">
                <ReactPlayer
                    className="react-player"
                    width="100%"
                    controls={false}
                    height="100%"
                    url={videoUrl}
                    light={false}
                    playing={false}
                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 0,
                                controls: 0,
                                fs: 0,
                                modestbranding: 1,
                                rel: 0
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
