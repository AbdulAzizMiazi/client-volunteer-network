import React, { useContext, useState } from 'react';
import '../LoginPage/LoginPage.css';
import cardData from '../HomePage/cardData';
import logo from '../../resources/logos/Group 1329.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const RegistrationPage = () => {
    const {title} = useParams();
    const [userState, setUserState] = useContext(UserContext);
    const [localSate, setLocalSate] = useState({
        warningText: "",
        showWarning: false,
    });
    const today = new Date();
    const history = useHistory();

    if (userState.eventTitle === undefined) {
        const updateUserInfo = {...userState};
        updateUserInfo.eventTitle = title;
        setUserState(updateUserInfo);
    }

    const updateContext = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updateUserInfo = {...userState};
        updateUserInfo[name] = value;
        setUserState(updateUserInfo);
    }

    const updateLocalSate = (warnText, warn) => {
        const creatingWarning = {...localSate};
        creatingWarning.warningText = warnText;
        creatingWarning.showWarning = warn;
        setLocalSate(creatingWarning);
    }

    const completeRegistration = (e) =>{

        //controlling description field
        if(userState.description === undefined){
            const addDefaultDescription = {...userState};
            addDefaultDescription.description = "";
            setUserState(addDefaultDescription);
        }
        userState.date === undefined && updateLocalSate("**Please, enter a date", true); //date validation
        (new Date(userState.date)) < today && updateLocalSate("**Please, enter a valid date", true); //date validation
    
        if (userState.date !== undefined && (new Date(userState.date)) >= today) {
            updateLocalSate("", false); //date validation

            const objectForPost = {...userState};
            delete objectForPost.isAuthorizedUser;
            
            fetch("https://still-cliffs-89513.herokuapp.com/newRegistration",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(objectForPost)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success === true){
                    history.push("/events");
                }
            })
        }

        e.preventDefault();
    }

    return (
        <div className="formDiv">
            <div className="logoDiv">
                <img src={logo} alt="logo" />
            </div>
            <div className="formContainer">
                <div className="form">
                    <h3>Register as a volunteer</h3>
                    <Form>   

                        <Form.Control type="text" name="name" className="mt-3" value={userState.name} readOnly />  

                        <Form.Control type="email" name="email" className="mt-3" value={userState.email} readOnly />

                        <Form.Control type="date" name="date" onBlur={updateContext} placeholder="Date" className="mt-3" required />
                        {
                            localSate.showWarning && <small style={{color:"red", float: "left"}}>{localSate.warningText}<br/></small>
                        }
    
                        <Form.Control as="textarea" name="description" onBlur={updateContext} rows={1} placeholder="Description" className="mt-3"/>

                        <Form.Control as="select" name="eventTitle" onChange={updateContext} className="my-3">
                            <option>{title}</option>
                            {
                                cardData.map( eachData => eachData.title !== title &&
                                <option key={eachData.id}> {eachData.title} </option> )
                            }
                        </Form.Control>   
                        <Button variant="primary" type="submit" onClick={completeRegistration} size="lg" block>Registration</Button>
                    </Form>

                </div>
            </div>
            
        </div>
    );
};

export default RegistrationPage;