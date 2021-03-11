import React, { Component } from 'react';
//import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CalendarSecond from '../Calendar/CalendarSecond';
import "../calendarApp.css";
import GoogleMap from './Maps';
import ProgressSummaryPDF from '../components/ProgressSummaryPDF';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'



export default class About extends Component{

    constructor(props) {
      super(props);

      this.state = {
          aboutTitle: "",
          aboutDesc: "",
          aboutPartnerLabel: "",
          aboutPartnerOne: "",
          aboutPartnerTwo: "",
          aboutPartnerThree: "",
          aboutCalendar: "",
          aboutSiteLocationLabel: "",
          aboutSiteLoactionAddress: "",
          aboutDocumentLabel: ""
        };
    }

    /*componentDidMount(){

      var tokenValue = localStorage.getItem("data-token")
      const AuthStr = 'Bearer '.concat(tokenValue);

      axios.get(
        "http://localhost:8081/api/pets",
        {headers: {
            "Authorization" : AuthStr,
            "Content-Type" : "application/json"
          }
        }
      ).then(response => {
        var dataValue = response['data'];

        this.setState({ aboutTitle: dataValue[0].aboutPage[0]})
        this.setState({ aboutDesc: dataValue[0].aboutPage[1]})
        this.setState({ aboutPartnerLabel: dataValue[0].aboutPage[2]})

    }).catch(error => {
      console.log(error)
    })


  }*/

    render(){
        return (
          <>
           <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
          <Navbar.Brand><img src={ require('../images/JointImage.jpg') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                  <Nav.Link style={{color: 'white'}} href="/home">Home</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/info">The Project</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/about">About</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/home">Prequalification</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/calendar">Calendar</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/home">Bid Updates</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Row style={{ paddingTop: '2%'}}>

          </Row>
          <Row style={{ paddingLeft: '2%'}}>
            <Col style={{ textAlign: 'center', paddingTop: '1%', backgroundColor: '#005A8B', color: 'white'}}>
            <p>THE PROJECT (College Park) </p>
            <p style={{ textAlign: 'left'}}>Carroll Daniel / Moody JV is looking for qualified Disadvantaged Business Enterprises (DBE) for the following trades:</p>
            <p style={{ textAlign: 'left'}}>Concrete repair, pressure washing, seating replacement, painting, trash receptable replacement, brick paver replacement, aggregate concrete repair, aggregate concrete installation, fencing repair / replacement, wayfinding signage installation / replacement, prep / paint metal surfaces, replace deteriorating sealants, replace tactile warning strips, landscaping, electrical infrastructure for signage, and repair windscreen concrete bases.</p>
            </Col>
          </Row>
          <Row style={{ paddingTop: '21%'}}></Row>
          <Container className="FooterCss">
            <Row>
            <Col style={{ backgroundColor: '#005A8B'}}><p style={{ color: 'white'}}>3300 Riverwood Parkway Atlanta GA 30339</p></Col>  
             <Col style={{ backgroundColor: '#005A8B'}}><Link to="/projects/privacy" style={{ textDecoration: 'none',color: 'white' }}>Privacy Policy</Link></Col>
             <Col style={{ backgroundColor: '#005A8B'}}><a href='http://www.carrolldaniel.com' style={{ textDecoration: 'none',color: 'white' }}>About Carroll Daniel Construction</a></Col>
             <Col style={{ backgroundColor: '#005A8B',color: 'white'}}>Some information</Col>
            </Row>
          </Container> 
          </>
        )

    }
}
