import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { useParams } from "react-router";

import Wrapper from "../Wrapper";
import VideoList from "../VideoList";

const TagDetail = ({ firebase }) => {
    const [data, setData] = useState(null);
    const { uid } = useParams();

    useEffect(() => {
        let tagName = uid.replace("_", " ");
        let newtagname = tagName
            .split(" ")
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(" ");
        console.log(newtagname);

        firebase
            .videos()
            .where("tags", "array-contains", newtagname)
            .get()
            .then(querySnapshot => {
                console.log("********TAG PAGE*******");
                console.log("READ");
                let videos = [];
                querySnapshot.forEach(doc => {
                    videos.push(doc.data());
                });
                setData(videos);
            });
    }, [firebase, uid]);

    return (
        <Wrapper>
            <h1>Tag Detail</h1>
            <VideoList data={data} />
        </Wrapper>
    );
};

export default withFirebase(TagDetail);
