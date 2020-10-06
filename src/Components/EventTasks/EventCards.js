import React from 'react';
import cardData from '../HomePage/cardData';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const EventCards = ({eventInfo, checkDelete}) => {
    const {_id, eventTitle, date} = eventInfo;
    const [deleteEvent, setDataEvent] = checkDelete;

    const img =  cardData.find(eachData => eachData.title === eventTitle && eachData.image);
    
    const cancelEvent = (id) => {
        fetch(`https://still-cliffs-89513.herokuapp.com/cancel/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if (data.deleted) {
                const updateSate = {...deleteEvent};
                updateSate.shouldDelete = true;
                setDataEvent(updateSate);
            }
        })
    }

    return (
        <Col sm={12} md={6}>
            <Card style={{marginBottom: "30px", padding: "10px"}} className="shadow">
                <Row>
                    <Col sm={6} lg={4}>
                        <Card.Img variant="top" src={img.image} style={{width: "90%"}}/>
                    </Col>
                    <Col sm={6} lg={5}>
                        <h3>{eventTitle}</h3>
                        <p><b> {new Date(date).toDateString("dd/MM/yyyy")} </b></p>
                    </Col>
                    <Col sm={12} lg={3} className="d-flex align-items-end mt-sm-2 mt-md-2">
                        <Button variant="secondary" onClick={()=>cancelEvent(`${_id}`)} block > Cancel </Button>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default EventCards;