import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Wrapper from "../Wrapper";
import VideoList from "../VideoList";
import Text from "../Text";
import Button from "../Button";

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
        <main className="page-speaker">
            <section className="hero-header hero-header--medium">
                <Wrapper medium>
                    <div className="hero-header__content">
                        {/* {conferenceData.profileImage && (
                            <figure className="hero-header__image">
                                <img src={conferenceData.profileImage} alt="" />
                            </figure>
                        )} */}

                        <Text rank={1} headline light>
                            {data.name}
                        </Text>
                        {/* <Text light>{conferenceData.description}</Text> */}
                        <div className="button-group">
                            <Button medium light>
                                Follow
                            </Button>
                            <Button medium light>
                                Website
                            </Button>
                        </div>
                    </div>
                </Wrapper>
            </section>
            <section className="content">
                <Wrapper>
                    {data.videos && (
                        <section className="speaker-videos">
                            <div>
                                <div className="auto-grid">
                                    {data && <VideoList data={data.videos} />}
                                </div>
                            </div>
                        </section>
                    )}
                </Wrapper>
            </section>
        </main>
    );
};

export default withFirebase(SpeakerDetail);
