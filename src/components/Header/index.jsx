import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";
import app from "../../base";

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const doSignOut = () => {
        app.auth()
            .signOut()
            .then(() => {
                console.log("sign out");
            })
            .catch(error => {
                console.log(error);
            });
    };
    if (currentUser) {
        return (
            <header>
                <div>
                    Hello,
                    {currentUser.displayName
                        ? currentUser.displayName
                        : currentUser.email}{" "}
                    ({currentUser.role})
                </div>
                <Link to="/">Home</Link>
                {currentUser.role === "Admin" && <Link to="/admin">Admin</Link>}
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={doSignOut}>Sign Out</button>
            </header>
        );
    } else {
        return (
            <header>
                <Link to="/">Home</Link>
                <Link to="Login">Login</Link>
                <Link to="Signup">Sign Up</Link>
            </header>
        );
    }
};

export default Header;
