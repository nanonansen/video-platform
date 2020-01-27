import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Wrapper from "../Wrapper";
import VideoList from "../VideoList";

const SpeakerDetail = ({ firebase }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let { uid } = useParams();
    useEffect(() => {
        firebase
            .speakers()
            .where("uid", "==", uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(video => {
                    console.log("READ");
                    console.log("SPEAKER DATA", video.data());

                    setData(video.data());
                    setIsLoading(false);
                });
            });
    }, [firebase, uid]);
    if (isLoading) return <div>Is Loading...</div>;
    return (
        <Wrapper>
            <h1>{data.name}</h1>
            <div>
                <div className="auto-grid">
                    {data && <VideoList data={data.videos} />}
                </div>
            </div>
        </Wrapper>
    );
};

export default withFirebase(SpeakerDetail);
