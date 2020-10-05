import React, { useContext, useEffect, useState } from 'react';
import logo from '../../resources/logos/Group 1329.png';
import  Container  from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import EventCards from './EventCards';
import { Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const navStyle = {
    color: "rgba(0,0,0,.5)",
    fontWeight: "bolder",
    cursor: "pointer",
    textDecoration: "none",
}

const EventTasks = () => {

    const [userState] = useContext(UserContext);
    const [eventData, setEventData] = useState([]);
    const [deleteEvent, setDataEvent] = useState({shouldDelete: false});

    useEffect(()=>{
        fetch(`https://still-cliffs-89513.herokuapp.com/event?email=${userState.email}`)
        .then(res => res.json())
        .then(data => setEventData(data));
    },[deleteEvent])

    return (
        <div>
            <Container>
            <Navbar className="bg-transparent mb-5 align-self-center" expand="lg">
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src={logo}
                        width="220px"
                        className="d-inline-block align-top"
                    /> 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="mr-3" style={navStyle} > <b>Home</b> </Link>
                        <Link to="/" className="mr-3" style={navStyle}> <b>Donation</b> </Link>
                        <Link to="/" className="mr-3" style={navStyle}> <b>Events</b></Link>
                        <Link to="/" className="mr-3" style={navStyle}> <b>Blogs</b> </Link>
                        <Link to="/events" className="mr-3">
                            <span style={{fontWeight: "900", color: "black", cursor: "pointer", textDecoration: "none"}}>
                                {userState.name}
                            </span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <Row>
                    {
                        eventData.map(eachEvent => <EventCards eventInfo={eachEvent} checkDelete={[deleteEvent, setDataEvent]} />)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default EventTasks;