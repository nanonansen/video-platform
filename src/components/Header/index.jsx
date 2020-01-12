import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";
import app from "../../base";

const Header = () => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return (
            <header>
                <div>
                    Hello,{" "}
                    {currentUser.displayName
                        ? currentUser.displayName
                        : currentUser.email}
                </div>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={() => app.auth().signOut()}>Sign Out</button>
            </header>
        );
    }
    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="Login">Login</Link>
            <Link to="Signup">Sign Up</Link>
        </header>
    );
};

export default Header;
