import React, { useEffect, useState } from "react";
import VideoList from "../VideoList";
import Wrapper from "../Wrapper";
import { withFirebase } from "../Firebase";

const Home = ({ firebase }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        firebase
            .videos()
            .orderBy("date", "desc")
            .get()
            .then(querySnapshot => {
                let videos = [];
                querySnapshot.forEach(doc => {
                    console.log("READ");

                    videos.push(doc.data());
                });
                setData(videos);
            });
    }, [firebase]);

    return (
        <Wrapper>
            <h1>Home Component</h1>
            <VideoList data={data} />
        </Wrapper>
    );
};

export default withFirebase(Home);
