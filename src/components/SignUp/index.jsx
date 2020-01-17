import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { withFirebase } from "../Firebase";
import Input from "../Input";
import Button from "../Button";

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
};

const SignUpPage = () => (
    <div className="signup">
        <div className="signup-wrapper">
            <h1 className="signup__title fs-xl">Create an Account</h1>
            <SignUpForm />
        </div>
    </div>
);

const SignUp = ({ firebase }) => {
    const [formState, setFormState] = useState({ ...INITIAL_STATE });

    let history = useHistory();

    // Handle SignUp with Email and Password
    const handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = formState;
        if (email.length > 0 && password.length > 0) {
            firebase
                .doCreateUserWithEmailAndPassword(email, password)
                .then(authUser => {
                    //Create User in "Users" Collection
                    let userID = firebase.getCurrentUserID();
                    const newUser = {
                        username: "",
                        uid: firebase.getCurrentUserID(),
                        email: firebase.getCurrentUserEmail(),
                        role: "reader"
                    };
                    firebase.doCreateDocument("users", userID, newUser);
                    //Redirect to Home
                    history.push("/");
                })
                .catch(err => {
                    setFormState({ ...formState, error: err.message });
                });
        }
    };

    const handleSignUpWithGoogle = () => {
        firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                return firebase.user(socialAuthUser.user.uid).set(
                    {
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: {}
                    },
                    { merge: true }
                );
            })
            .then(() => {
                history.push("/");
            })
            .catch(error => {
                setFormState({ ...formState, error: error.message });
            });
    };

    // Input onChange Event
    const onChange = e => {
        setFormState({
            ...formState,
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    return (
        <>
            <div className="signup__social-login">
                <Button
                    className="button--google-signup button--large"
                    onClick={handleSignUpWithGoogle}
                >
                    <img
                        className="google-signup-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="google logo"
                    />
                    Continue with Google
                </Button>
            </div>
            <span className="signup__seperator">or</span>
            <div className="signup__email">
                <form onSubmit={handleSignUp} autoComplete="off">
                    <label htmlFor="email">
                        <Input
                            className="input input--large"
                            type="email"
                            name="email"
                            id="email"
                            value={formState.email}
                            placeholder="Email"
                            autoComplete={false}
                            onChange={onChange}
                        />
                    </label>
                    <label htmlFor="password">
                        <Input
                            className="input input--large"
                            type="password"
                            name="password"
                            id="password"
                            value={formState.password}
                            placeholder="Create a password"
                            autoComplete={false}
                            onChange={onChange}
                        />
                    </label>
                    <Button
                        type={"submit"}
                        className="button--primary button--large"
                    >
                        Sign Up
                    </Button>
                    {formState.error && <p>{formState.error}</p>}
                </form>
            </div>
            <div>
                Already have an Account? <Link to="/login">Login</Link>
            </div>
        </>
    );
};

const SignUpForm = withFirebase(SignUp);

export default SignUpPage;

// const handleSignUpWithGoogle = useCallback(
//     async event => {
//         event.preventDefault();
//         try {
//             await app
//                 .auth()
//                 .signInWithPopup(provider)
//                 .then(() => {
//                     console.log("USER UID", app.auth().currentUser.uid);
//                     const newUserID = app.auth().currentUser.uid;
//                     const newUserEmail = app.auth().currentUser.email;
//                     db.collection("users")
//                         .doc(newUserID)
//                         .set(
//                             {
//                                 userName: "",
//                                 email: newUserEmail,
//                                 uid: newUserID,
//                                 role: "Reader"
//                             },
//                             { merge: true }
//                         )
//                         .then(docRef => {
//                             console.log(
//                                 "Document written with ID: ",
//                                 docRef.id
//                             );
//                         })
//                         .catch(error => {
//                             console.log(error);
//                         });
//                 });
//         } catch (error) {
//             alert(error);
//         }
//         history.push("/dashboard");
//     },
//     [history]
// );
