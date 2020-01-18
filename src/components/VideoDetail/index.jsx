import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Wrapper from "../Wrapper";
import VideoList from "../VideoList";

const VideoDetail = ({ firebase }) => {
    const [videoData, setVideoData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        firebase
            .videos()
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    console.log("doc", doc.data());
                    setVideoData(doc.data());
                    setIsLoading(false);
                } else {
                    console.log("doc not found");
                    setIsLoading(false);
                }
            });
    }, [id, firebase]);

    const youtube_parser = url => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : false;
    };
    let videoId;
    let videoImgUrl;
    if (videoData.videoUrl) {
        videoId = youtube_parser(videoData.videoUrl);
        if (!videoId) {
            videoImgUrl = "https://place-hold.it/1200x800";
        } else {
            videoImgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
    }

    console.log(videoId);

    if (isLoading) return <Wrapper>Is Loading...</Wrapper>;
    return (
        <main>
            <div className="videoWrapper">
                <div className="video__player">
                    <img src={videoImgUrl} alt={videoData.name} />
                </div>
                <div className="video__meta">
                    <h1 className="fs-xl">{videoData.name}</h1>
                    <p>{videoData.speaker}</p>
                    <Link to={`/conference/${videoData.conferences.id}`}>
                        {videoData.conferences.name}
                    </Link>
                    <p>{videoData.description}</p>
                </div>
            </div>
            <Wrapper>
                <div className="video__related">
                    <h2>Related Videos</h2>
                    <VideoList />
                </div>
            </Wrapper>
        </main>
    );
};

export default withFirebase(VideoDetail);
