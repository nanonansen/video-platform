import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { db } from "../../base";

import Input from "../Input";

const AddVideo = ({ history }) => {
    const [initialFormData, setInitialFormData] = useState({
        name: "",
        description: "",
        videoUrl: "",
        duration: 25,
        year: 2020,
        categories: ["Design", "UX-Design"],
        conferences: [],
        speaker: "",
        saveCount: 0
    });
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        videoUrl: "",
        duration: 25,
        year: 2020,
        categories: ["Design", "UX-Design"],
        conferences: [],
        speaker: ""
    });
    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSelectChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("New Video", formData);
        doAddVideoToCollection();
    };

    // Add new Video to Firestore Collection
    const doAddVideoToCollection = async () => {
        const newVideoData = {
            ...formData,
            date: Date.now(),
            saveCount: 0
        };
        try {
            await db
                .collection("videos")
                .add(newVideoData)
                .then(docRef => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(error => {
                    console.log(error);
                });
            history.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    //Get All Conferences
    useEffect(() => {
        const conferences = [];
        db.collection("conferences")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    conferences.push({
                        name: doc.data().name,
                        uid: doc.id
                    });
                });
            })
            .then(() => {
                setInitialFormData(prevState => ({
                    ...prevState,
                    conferences: conferences
                }));
            });
    }, []);

    return (
        <div>
            <h1 className="fs-xl">Submit new Video</h1>
            <form onSubmit={handleFormSubmit}>
                {Object.keys(initialFormData).map((input, index) => {
                    if (input === "conferences") {
                        return (
                            <label htmlFor={input} key={index}>
                                {input}
                                <select
                                    name={input}
                                    id={input}
                                    onChange={e =>
                                        handleSelectChange(
                                            input,
                                            e.target.value
                                        )
                                    }
                                >
                                    {initialFormData[input].map(option => {
                                        return (
                                            <option key={option.uid}>
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
                                onChange={e =>
                                    handleInputChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                    );
                })}
                <button className="button" type="submit">
                    Submit Video
                </button>
            </form>
        </div>
    );
};

export default withRouter(AddVideo);
