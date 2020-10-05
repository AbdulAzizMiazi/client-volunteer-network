import React, { useContext, useState } from 'react';
import './LoginPage.css';
import logo from '../../resources/logos/Group 1329.png';
import googleLogo from '../../resources/logos/google.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const LoginPage = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const provider = new firebase.auth.GoogleAuthProvider();
    const [userState, setUserState] = useContext(UserContext);
    const [loginError, setLoginError] = useState({
        hasError: false,
        errorMsg: "",
    })
    
    const upDateUserContext = (name, email) => {
        const newInfo = {...userState};
        newInfo.name = name;
        newInfo.email = email;
        newInfo.isAuthorizedUser = true;
        setUserState(newInfo);
    }

    const updateLoginError = (bool, message) => {
        const updateCondition = {...loginError};
        updateCondition.hasError = bool;
        updateCondition.errorMsg = message;
        setLoginError(updateCondition);
    }

    const googleBtnClickHandler = () => {
        firebase.auth().signInWithPopup(provider)
        .then( result => {
            const user = result.user;
            upDateUserContext(user.displayName, user.email);
            updateLoginError(false, "");
            history.replace(from);
        })
        .catch( error => {
            const errorMessage = error.message;
            updateLoginError(true, errorMessage)
        });
    }

    return (
        <div className="formDiv">
            <div className="logoDiv">
                <img src={logo} alt="logo" />
            </div>
            <div className="formContainer">
                <div className="form">

                    <h3>Login with</h3>

                    <button className="formBtn" onClick={googleBtnClickHandler}>
                        <img src={googleLogo} alt="google logo"/>                      
                        Continue with Google
                    </button>

                    <p>
                        Don't have an account? 
                        <Link to="#"> <u>create an account</u> </Link>
                    </p>
                    {
                        loginError.hasError && <p style={{color:"red"}}><small>**{loginError.errorMsg}</small></p>
                    }

                </div>
            </div>
        </div>
    );
};

export default LoginPage;