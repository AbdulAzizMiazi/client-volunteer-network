import React, { useEffect, useState } from "react";
import './Admin.css';
import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";

const AddEvent = () => {
    const today = new Date();
    const [eventData, setEventData] = useState({});
    let [dateWarning, setDateWarning] = useState("");
    let [titleWarning , setTitleWarning] = useState("");
    let [success , setSuccess] = useState("");

    const updateEventData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updateEventInfo = {...eventData};
        updateEventInfo[name] = value;
        setEventData(updateEventInfo);
        setSuccess(success = "");
    }

    const checkTitle = () => {
        let checker;
        if (eventData.title === undefined) {
            setTitleWarning(titleWarning = "please, enter title");
           return checker =  false;
        }
        else if (eventData.title === ""){
            setTitleWarning(titleWarning = "please, enter title");
            return checker =  false;
        }  
        else if((eventData.titles.find(eachTitle => eachTitle === eventData.title)) !== undefined){
            setTitleWarning(titleWarning = "This title has already used.");
            return checker =  false;
        }
        else{
            setTitleWarning(titleWarning = "");
            return checker =  true;
        }
    }

    useEffect(()=>{
        fetch("https://still-cliffs-89513.herokuapp.com/allEvents")
        .then(res => res.json())
        .then(data =>{
            const allTitles = data.map(eachEvent => eachEvent.title);
            const loadTitles = {...eventData};
            loadTitles.titles = allTitles;
            setEventData(loadTitles);
        })
    },[success === "Event Added successfully"])

    const uploadEvent = () => {
    const validTitle =  checkTitle(); //checking (unique) event title
    //controlling description field
    if(eventData.description === undefined){
        const addDefaultDescription = {...eventData};
        addDefaultDescription.description = "";
        setEventData(addDefaultDescription);
    }
    //controlling background color field
    if(eventData.bgColor === undefined){
        const defaultBGColor = {...eventData};
        defaultBGColor.description = "#3F90FC";
        setEventData(defaultBGColor);
    }
    //date validation
    eventData.date === undefined && setDateWarning(dateWarning = "**Please, enter a date"); 
    (new Date(eventData.date)) < today && setDateWarning(dateWarning = "**Please, enter a valid date");

    eventData.date !== undefined && (new Date(eventData.date)) >= today && setDateWarning(dateWarning = "");
    //date validation ends here ....

    if (eventData.date !== undefined && (new Date(eventData.date)) >= today && validTitle === true) {
        const objectForPost = {...eventData};
        delete objectForPost.titles;

        fetch("https://still-cliffs-89513.herokuapp.com/addEvent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objectForPost)
        })
        .then(res => res.json())
        .then(data => data.success === true && setSuccess(success = "Event Added successfully"))
    }
  };

  return (
    <div className="ml-3 pt-3">

      <h4 className="mb-4 ml-3 font-weight-bold">Add Event</h4>
      <p style={{color:"green"}}>{success}</p>

      <div className="myTable p-4 px-2 shadow-lg">
        <Form >
            <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" onBlur={updateEventData} placeholder="Enter Title" />
                <small style={{color:"red", float: "left"}}>
                    {titleWarning}<br/>
                </small>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" onChange={updateEventData} placeholder="Enter Date" />
                <small style={{color:"red", float: "left"}}>
                    {dateWarning}<br/>
                </small>
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" name="description" onBlur={updateEventData} />
            </Form.Group>

            <Form.Group as={Col}>
                    <Form.Group as={Col}>
                        <Form.Label>Banner</Form.Label>
                        <br/>
                        <input type="file" name="image" placeholder="upload image" disabled id=""/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Background color:</Form.Label>
                        <br/>
                        <input type="color" name="bgColor" onBlur={updateEventData} />
                    </Form.Group>
            </Form.Group>
            </Form.Row>
        </Form>

        <Button variant="primary" onClick={uploadEvent}> Submit </Button>

      </div>
    </div>
  );
};

export default AddEvent;
