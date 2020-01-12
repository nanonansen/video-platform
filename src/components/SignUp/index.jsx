import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import app, { provider, db } from "../../base";
import Input from "../Input";

const SignUp = ({ history }) => {
    //handle Sign Up with email and password
    const handleSignUp = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value)
                    .then(() => {
                        console.log("USER UID", app.auth().currentUser.uid);
                        const newUserID = app.auth().currentUser.uid;
                        const newUserEmail = app.auth().currentUser.email;
                        db.collection("users")
                            .doc(newUserID)
                            .set({
                                userName: "",
                                email: newUserEmail,
                                uid: newUserID,
                                role: "Reader"
                            })
                            .then(docRef => {
                                console.log(
                                    "Document written with ID: ",
                                    docRef.id
                                );
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );
    //handle Sign Up With Google
    const handleSignUpWithGoogle = useCallback(
        async event => {
            event.preventDefault();
            try {
                await app
                    .auth()
                    .signInWithPopup(provider)
                    .then(() => {
                        console.log("USER UID", app.auth().currentUser.uid);
                        const newUserID = app.auth().currentUser.uid;
                        const newUserEmail = app.auth().currentUser.email;
                        db.collection("users")
                            .doc(newUserID)
                            .set(
                                {
                                    userName: "",
                                    email: newUserEmail,
                                    uid: newUserID,
                                    role: "Reader"
                                },
                                { merge: true }
                            )
                            .then(docRef => {
                                console.log(
                                    "Document written with ID: ",
                                    docRef.id
                                );
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
            } catch (error) {
                alert(error);
            }
            history.push("/dashboard");
        },
        [history]
    );

    return (
        <div className="signup">
            <div className="signup-wrapper">
                <h1 className="signup__title fs-xl">Create an Account</h1>
                <div className="signup__social-login">
                    <button
                        className="button button--google-signup button--large"
                        onClick={handleSignUpWithGoogle}
                    >
                        <img
                            className="google-signup-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google logo"
                        />
                        Continue with Google
                    </button>
                </div>
                <div className="signup__email">
                    <form onSubmit={handleSignUp} autoComplete="off">
                        <label htmlFor="email">
                            <Input
                                className="input input--large"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                autoComplete={false}
                            />
                        </label>
                        <label htmlFor="password">
                            <Input
                                className="input input--large"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Create a password"
                                autoComplete={false}
                            />
                        </label>
                        <button
                            className="button button--primary button--large"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div>
                    Already have an Account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignUp);
