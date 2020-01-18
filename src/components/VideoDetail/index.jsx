import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Wrapper from "../Wrapper";

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
    if (isLoading) return <div>Is Loading...</div>;
    return (
        <Wrapper>
            <h1>{videoData.name}</h1>
            <h2>{videoData.speaker}</h2>
            <div>{videoData.videoUrl}</div>
            <Link to={`/conference/${videoData.conferences.id}`}>
                {videoData.conferences.name}
            </Link>
        </Wrapper>
    );
};

export default withFirebase(VideoDetail);
