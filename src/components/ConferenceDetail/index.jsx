import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../base";

import Wrapper from "../Wrapper";

const ConferenceDetail = () => {
    const [conferenceData, setConferenceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        db.collection("conferences")
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
    }, [id]);

    if (isLoading) return <div>Is Loading...</div>;
    return (
        <Wrapper>
            <h1>{conferenceData.name}</h1>
            <h1>{conferenceData.description}</h1>
        </Wrapper>
    );
};

export default ConferenceDetail;
