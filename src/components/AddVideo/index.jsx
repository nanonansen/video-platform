import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Input from "../Input";
import Button from "../Button";
import Wrapper from "../Wrapper";

const AddVideo = ({ firebase }) => {
    const [initialFormData, setInitialFormData] = useState({
        name: "",
        description: "",
        videoUrl: "",
        duration: 25,
        year: 2020,
        categories: ["Design", "UX-Design"],
        conferences: [],
        speaker: ""
    });
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        videoUrl: "",
        duration: 25,
        year: 2020,
        categories: [],
        conference: [],
        speaker: ""
    });
    const [selectValue, setSelectValue] = useState({ name: "", uid: null });

    let history = useHistory();

    const handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSelectChange = e => {
        let id = e.target.options[e.target.selectedIndex].dataset.id;
        setSelectValue({ name: e.target.value, uid: id });
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        if (selectValue.uid !== null) {
            doAddVideoToCollection();
        }
    };

    // Add new Video to Firestore Collection
    const doAddVideoToCollection = async () => {
        let confId = selectValue.uid;
        let videoUid = firebase.videos().doc();

        const newVideoData = {
            ...formData,
            date: Date.now(),
            saveCount: 0,
            uid: videoUid.id,
            conference: selectValue
        };
        const videoRefObj = {
            name: formData.name,
            uid: videoUid.id,
            videoUrl: formData.videoUrl
        };

        let confRef = firebase.conferences().doc(confId);
        let videoRef = firebase.videos().doc(videoUid.id);

        let batch = firebase.db.batch();

        batch.set(videoRef, newVideoData);
        batch.update(confRef, {
            videos: firebase.fieldValue.arrayUnion(videoRefObj)
        });

        // Commit the batch
        batch.commit().then(() => {
            console.log("Success");
        });

        history.push("/dashboard");
    };

    //Get All Conferences
    useEffect(() => {
        const conferences = [];
        firebase
            .conferences()
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    conferences.push({
                        name: doc.data().name,
                        uid: doc.id,
                        videoUrl: doc.data().videoUrl
                    });
                });
            })
            .then(() => {
                setInitialFormData(prevState => ({
                    ...prevState,
                    conferences: conferences
                }));
            });
    }, [firebase]);

    return (
        <Wrapper className="wrapper--small">
            <h1 className="fs-xl">Submit new Video</h1>
            <form onSubmit={handleFormSubmit}>
                {Object.keys(initialFormData).map((input, index) => {
                    if (input === "conferences") {
                        return (
                            <label htmlFor={input} key={index}>
                                {input}
                                <select
                                    name={input}
                                    value={selectValue.name}
                                    onChange={handleSelectChange}
                                >
                                    <option value="">Select Conference</option>
                                    {initialFormData[input].map(option => {
                                        return (
                                            <option
                                                key={option.uid}
                                                data-id={option.uid}
                                            >
                                                {option.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        );
                    }
                    return (
                        <label htmlFor={input} key={index}>
                            {input}
                            <Input
                                className="input"
                                type="text"
                                name={input}
                                value={formData[input]}
                                placeholder={input}
                                onChange={handleInputChange}
                            />
                        </label>
                    );
                })}

                <Button type={"submit"} className={"button--primary"}>
                    Submit Video
                </Button>
            </form>
        </Wrapper>
    );
};

export default withFirebase(AddVideo);
