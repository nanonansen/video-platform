import React, { useState, useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthContext } from "../../Auth";

import Input from "../Input";

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
};

const Login = ({ firebase }) => {
    const [formState, setFormState] = useState({ ...INITIAL_STATE });

    let history = useHistory();

    //handle Login with Email Password
    const handleLogin = async event => {
        event.preventDefault();
        const { email, password } = formState;
        if (email.length > 0 && password.length > 0) {
            firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(authUser => {
                    console.log("Login Successfull");
                })
                .then(() => {
                    history.push("/");
                })
                .catch(error => {
                    setFormState({ ...formState, error: error.message });
                });
        }
    };

    const handleLoginWithGoogle = () => {
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

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                <h1 className="login__title fs-xl">Login</h1>
                <div className="login__social-login">
                    <button
                        className="button button--google-signup button--large"
                        onClick={handleLoginWithGoogle}
                    >
                        <img
                            className="google-signup-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google logo"
                        />
                        Continue with Google
                    </button>
                </div>
                <span className="login__seperator">or</span>
                <div className="login__email">
                    <form onSubmit={handleLogin} autoComplete="off">
                        <label htmlFor="email">
                            <Input
                                className="input input--large"
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={onChange}
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
                                value={formState.password}
                                onChange={onChange}
                                id="password"
                                placeholder="Create a password"
                                autoComplete={false}
                            />
                        </label>
                        <button
                            className="button button--primary button--large"
                            type="submit"
                        >
                            Login
                        </button>
                        {formState.error && <p>{formState.error}</p>}
                    </form>
                </div>
                <div>
                    Don't have an Account yet? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default withFirebase(Login);
