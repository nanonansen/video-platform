import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../Firebase";

import Input from "../Input";
import Button from "../Button";
import Wrapper from "../Wrapper";

const AddConference = ({ firebase }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: "",
        profileImage: ""
    });

    let history = useHistory();

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
        let newConfRef = firebase.conferences().doc();

        const newConferenceData = {
            ...formData,
            date: Date.now(),
            followers: [],
            videos: [],
            speakers: [],
            uid: newConfRef.id
        };
        try {
            await firebase
                .conferences()
                .doc(newConfRef.id)
                .set(newConferenceData)
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
