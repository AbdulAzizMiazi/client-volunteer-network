import React, { useContext } from 'react';
import './HomePage.css';
import cardData from './cardData';
import logo from '../../resources/logos/Group 1329.png'
import  Container  from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import MyCard from './MyCard';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const HomePage = () => {
    const [userState, setUserState] = useContext(UserContext);

    const cardClicked = (vTitle) => {
        const updateContext = {...userState};
        updateContext.eventTitle = vTitle;
        setUserState(updateContext);
    }

    return (
        <div>
            <Container>
            <Navbar className="bg-transparent" expand="lg">
                <Navbar.Brand>
                    <Link to="/">
                        <img
                            alt=""
                            src={logo}
                            width="220px"
                            className="d-inline-block align-top"
                        /> 
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="mr-3 navStyle"> <b>Home</b> </Link>
                        <Link to="/" className="mr-3 navStyle"> <b>Donation</b> </Link>
                        <Link to="/" className="mr-3 navStyle"> <b>Events</b></Link>
                        <Link to="/" className="mr-3 navStyle"> <b>Blogs</b> </Link>
                        <Link to="/register/Child Support" style={{textDecoration: "none"}}>
                            <Button variant="primary" className="mr-3 px-4 py-2"> Register </Button>
                        </Link>

                        <Link to="/admin" style={{textDecoration: "none"}}>
                            <Button variant="secondary" className="mr-3 px-4 py-2"> Admin </Button>
                        </Link>

                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                <div className="searchOption mt-5">
                    <h1>I grow by helping people in need.</h1>
                    <Form inline className="mt-3">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-0" />
                        <Button className="px-3 searchBtn"> Search </Button>
                    </Form>
                </div>

                <div className="myCardDiv mt-5">
                    {
                    cardData.map( cardInfo => {
                        return<Link to={`register/${cardInfo.title}`} onClick={()=>cardClicked(cardInfo.title)} style={{textDecoration: "none"}}>
                            <MyCard key={cardInfo.id} info={cardInfo}/>
                        </Link>
                    })
                    }
                </div>
            </Container>
        </div>
    );
};

export default HomePage;