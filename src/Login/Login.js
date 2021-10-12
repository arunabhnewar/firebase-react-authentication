import React, { useState } from 'react';
import './Login.css';
import { GoogleAuthProvider, signInWithPopup, getAuth, GithubAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, FacebookAuthProvider } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

initializeAuthentication();
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Login = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const { email, displayName, photoURL } = result.user;

                const userInfo = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(userInfo);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const { email, displayName, photoURL } = result.user;
                const user = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(user);
                setError("");
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const { email, displayName, photoURL } = result.user;
                const user = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(user);
                setError("");
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const { email, displayName, photoURL } = result.user;

                const userInfo = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(userInfo);
            });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleResetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(result => {
                setEmail(user)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className="">
            <h2>{user.email}</h2>
            <div className="login-box d-flex align-items-center justify-content-center mt-4 pt-4">
                <div className="login">
                    <div className="login-box">
                        <h3 className="text-success pb-3"> User Login</h3>
                        <form onSubmit={handleLogin}>
                            <p className="text-danger">{error}</p>
                            <input onBlur={handleEmailChange} className="input-field border-bottom border-0" type="email" name="email" placeholder="Email" required />
                            <br /> <br />
                            <input onBlur={handlePasswordChange} className="input-field border-bottom border-0" type="password" name="password" placeholder="Password" required />
                            <br />
                            <input
                                className="mt-5 w-50 btn btn-success m-auto"
                                type="submit"
                                value="Login" />
                            <br /> <br />
                        </form>
                    </div>
                    <button onClick={handleGoogleSignIn} className="me-2 mb-2 btn btn-info"> <FontAwesomeIcon icon={faGoogle} /> Login with Google </button>

                    <button onClick={handleFacebookSignIn} className="me-2 mb-2 btn btn-primary"> <FontAwesomeIcon icon={faFacebook} /> Login with Facebook </button>

                    <button onClick={handleGithubSignIn} className="me-2 mb-2 btn btn-dark"><FontAwesomeIcon icon={faGithub} /> Login with Github</button>

                    <button onClick={handleResetPassword} className="me-2 mb-2 btn btn-warning"><FontAwesomeIcon icon={faKey} /> Reset Password</button>
                </div>
            </div>
        </div>
    );
};

export default Login;