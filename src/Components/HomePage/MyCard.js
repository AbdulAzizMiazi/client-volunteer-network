import React from 'react';
import Card from 'react-bootstrap/Card';

const MyCard = ({info}) => {
    const {title, image, bgColor} = info;

    return (
        <Card className="my-3 myCardStyle" style={{backgroundColor:`${bgColor}`}}>

            <Card.Img 
                variant="top" 
                src={image} 
                className="w-100" 
                style={{borderRadius: "10px"}}
            />

            <Card.Body>
                <Card.Title className="cardTitle">{title}</Card.Title>
            </Card.Body>
            
        </Card>
    );
};

export default MyCard;