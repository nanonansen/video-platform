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
            <header className="site-header loggedIn">
                <div className="site-header__branding">Logo</div>
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
            <header className="site-header">
                <div className="site-header__branding">
                    <Link to="/">Logo</Link>
                </div>
                <div className="site-header__search">Search</div>
                <nav className="site-header__navigation">
                    <Link to="Login">
                        <button className="button">Login</button>
                    </Link>
                    <Link to="Signup">
                        <button className="button button--primary">
                            Sign Up
                        </button>
                    </Link>
                </nav>
            </header>
        );
    }
};

export default Header;
