import React, { useCallback, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app, { provider } from "../../base";
import { AuthContext } from "../../Auth";

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin} autoComplete="new-password">
                <label htmlFor="email">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="none"
                    />
                </label>
                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="none"
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <button onClick={handleLoginWithGoogle}>Sign In with Google</button>
            <div>
                Don't have an Account yet? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default withRouter(Login);
