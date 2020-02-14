import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { useParams } from "react-router";

import Wrapper from "../Wrapper";
import VideoList from "../VideoList";
import Text from "../Text";

const TagDetail = ({ firebase }) => {
    const [data, setData] = useState(null);
    const [tagName, setTagName] = useState(null);
    const { uid } = useParams();

    useEffect(() => {
        let tagname = uid
            .replace("_", " ")
            .split(" ")
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(" ");
        console.log(tagname);
        setTagName(tagname);

        firebase
            .videos()
            .where("tags", "array-contains", tagname)
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
        <main className="page-tag">
            <div className="archive-header">
                <Wrapper>
                    <Text rank={1} subtitle>
                        Videos in <span>{tagName}</span>
                    </Text>
                </Wrapper>
            </div>
            <Wrapper>
                <VideoList data={data} />
            </Wrapper>
        </main>
    );
};

export default withFirebase(TagDetail);
