import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Wrapper from "../Wrapper";
import VideoList from "../VideoList";

const SpeakerDetail = ({ firebase }) => {
    const [data, setData] = useState(null);
    let { uid } = useParams();
    useEffect(() => {
        firebase
            .videos()
            .where("speaker.uid", "==", uid)
            .get()
            .then(querySnapshot => {
                let videos = [];
                querySnapshot.forEach(video => {
                    console.log("READ");
                    videos.push(video.data());
                });
                setData(videos);
            });
    }, [firebase, uid]);
    return (
        <Wrapper>
            <h1>Speaker Name</h1>
            <div>
                <div className="auto-grid">
                    {data && <VideoList data={data} />}
                </div>
            </div>
        </Wrapper>
    );
};

export default withFirebase(SpeakerDetail);
