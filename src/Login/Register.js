import React, { useState } from 'react';
import initializeAuthentication from './../Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

initializeAuthentication();

const Register = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleRegistration = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            console.log('Password must be at least 6 characters')
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            console.log("Password must contain 2 uppercase")
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                const { email, displayName, photoURL } = result.user;
                const user = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(user);
                verifyEmail(email);
                setError("");
            })
            .catch(error => {
                setError(error.message)
            })
    };

    const verifyEmail = (email) => {
        sendEmailVerification(auth.email)
            .then(result => { })
    }

    return (
        <div>
            <h1>{user.email}</h1>
            <h1>{error.message}</h1>
            <div className="login-box d-flex align-items-center justify-content-center">
                <div className="login">
                    <div className="login-box">
                        <h2 className="text-success pb-3">Create an Account</h2>
                        <form onSubmit={handleRegistration}>

                            <input
                                onBlur={handleEmailChange}
                                className="input-felid  border-bottom border-0"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                            <br /> <br />
                            <input
                                onBlur={handlePasswordChange}
                                className="input-felid  border-bottom border-0"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <input
                                className="mt-5 w-50 btn btn-success m-auto"
                                type="submit"
                                value="Register"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;