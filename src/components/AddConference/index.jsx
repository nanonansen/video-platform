import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import Input from "../Input";
import Button from "../Button";
import Wrapper from "../Wrapper";

const AddConference = ({ firebase }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        url: ""
    });
    const handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
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
            await firebase
                .conferences()
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
        <Wrapper className="wrapper--small">
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
                                onChange={handleInputChange}
                            />
                        </label>
                    );
                })}

                <Button type={"submit"} className="button--primary">
                    Add Conference
                </Button>
            </form>
        </Wrapper>
    );
};

export default withFirebase(AddConference);
