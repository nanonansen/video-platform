import React, { useState } from "react";
import { db } from "../../base";

import Input from "../Input";

const AddConference = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        url: ""
    });
    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("New Conference Data", formData);
        doAddConferenceToCollection();
    };
    const doAddConferenceToCollection = async () => {
        const newConferenceData = {
            ...formData,
            date: Date.now(),
            followers: [],
            videos: [],
            speakers: []
        };
        try {
            await db
                .collection("conferences")
                .add(newConferenceData)
                .then(docRef => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="fs-xl">Add new Conference</h1>
            <form onSubmit={handleFormSubmit}>
                {Object.keys(formData).map((input, index) => {
                    console.log(formData[input]);

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
                    Add Conference
                </button>
            </form>
        </div>
    );
};

export default AddConference;
