import React, { useCallback, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app, { provider } from "../../base";
import { AuthContext } from "../../Auth";

import Input from "../Input";

const Login = ({ history }) => {
    //handle Login with Email Password
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/dashboard");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    //handle Login With Google
    const handleLoginWithGoogle = useCallback(async () => {
        try {
            await app
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    console.log(result);
                    history.push("/dashboard");
                });
        } catch (error) {
            alert(error);
        }
    }, [history]);

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
                            Login
                        </button>
                    </form>
                </div>
                <div>
                    Don't have an Account yet? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
