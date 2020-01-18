import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";

import Wrapper from "../Wrapper";
import VideoListItem from "../VideoListItem";

const ConferenceDetail = ({ firebase }) => {
    const [conferenceData, setConferenceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        firebase
            .conferences()
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    console.log("doc", doc.data());
                    setConferenceData(doc.data());
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
            <h1>{conferenceData.name}</h1>
            <p>{conferenceData.description}</p>
            <div>
                <h2>All Videos</h2>
                <div className="auto-grid">
                    {conferenceData.videos.map(video => (
                        <VideoListItem data={video} key={video.uid} />
                    ))}
                </div>
            </div>
        </Wrapper>
    );
};

export default withFirebase(ConferenceDetail);
