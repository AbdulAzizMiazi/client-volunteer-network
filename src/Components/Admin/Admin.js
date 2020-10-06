import React, { useState } from 'react';
import './Admin.css';
import logo from '../../resources/logos/Group 1329.png';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VolunteerList from './VolunteerList';
import AddEvent from './AddEvent';

const Admin = () => {

    let [showList, setShowList] = useState(true);

    return (
        <div className="adminDiv mx-sm-2 mx-md-3 mx-5">
            <Row style={{marginLeft: "0px"}}>
                <Col sm={12} md={2}>
                    <Link to="/">
                    <img
                        alt=""
                        src={logo}
                        width="220px"
                        className="d-inline-block align-top mt-3 mb-5"
                    />
                    </Link>
                    <p onClick={()=>setShowList(showList = true)}>
                        {
                            showList
                            ?<span 
                                className="adminOption" 
                                style={{color: "rgb(57, 169, 235)"}}>
                                    Volunteer Register List
                            </span>
                            :<span className="adminOption">Volunteer Register List</span>
                        }
                    </p>
                    <p onClick={()=>setShowList(showList = false)} >
                        {
                            showList
                            ?<span className="adminOption">Add Event</span>
                            :<span 
                                className="adminOption" 
                                style={{color: "rgb(57, 169, 235)"}}>
                                    Add Event
                            </span>
                        }
                    </p>

                </Col>
                <Col sm={12} md={10} className="mt-4">
                    {
                        showList
                        ?<VolunteerList />
                        :<AddEvent />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Admin;