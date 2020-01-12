import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import app, { provider, db } from "../../base";

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
                            .add({
                                userName: "",
                                email: newUserEmail,
                                uid: newUserID
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
            try {
                await app
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => history.push("/dashboard"));
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp} autoComplete="off">
                <label htmlFor="email">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="vavadva"
                    />
                </label>
                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="vavadva"
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleSignUpWithGoogle}>
                Sign In with Google
            </button>
            <div>
                Already have an Account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default withRouter(SignUp);
