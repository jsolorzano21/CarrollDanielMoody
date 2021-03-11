import React, { Component } from 'react';
import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CalendarSecond from '../Calendar/CalendarSecond';
import "../calendarApp.css";
import GoogleMap from './Maps';
import ProgressSummaryPDF from '../components/ProgressSummaryPDF';
import { Link } from 'react-router-dom';
import axios from 'axios'



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

    componentDidMount(){

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


  }

    render(){
        return (
          <>
          <Container className="HeaderMainLogo">
          <Row>
            <Col><HeaderMain /></Col>
          </Row>
          <Row className="centerLabel">
            <Col className="menu-ul-header"><strong>{this.state.aboutTitle}</strong></Col>
          </Row>
          </Container>
          <Container className="SecondContainer">
          <Row>
          <Col xs="3" sm="4"></Col>  
          <Col xs="auto" className='aboutUs-label'><p><strong>{this.state.aboutDesc}</strong></p></Col>
          <Col sm="3"></Col>
          </Row>    
          <Row>
              <Col className='aboutUs-label'><strong>{this.state.aboutPartnerLabel}</strong></Col>
          </Row>
          <Row>
            <Col xs="3"></Col>
            <Col xs="auto" className='partner-logos'>
                 <a href="http://www.cobbk12.org/">
                 <img src={ require('../images/osborne/partners/cobbcounty.png') } alt="cclogo" className="partnerLogo" />
                 </a>
                 <a href="http://www.cglsarchitects.com/">
                 <img src={ require('../images/osborne/partners/CGLS.jpg') } alt="cglslogo" className="partnerLogo" />
                 </a>
                 <a href="http://www.carrolldaniel.com/">
                 <img src={ require('../images/osborne/partners/llogooooo.jpg') } alt="carolldaniellogo" className="partnerLogo" />
                 </a>
            </Col>
            <Col xs="3"></Col>
          </Row> 
          <Row>
            <Col className='aboutUs-label'><strong>Upcoming Events</strong></Col>
          </Row>  
          <Row>
            <Col className='calendar-padding'><CalendarSecond /></Col>
          </Row>  
          </Container>
          <Container>
            <Row>
              <Col className='aboutUs-label'><strong>Site Location</strong></Col>
            </Row>
            <Row>
                <Col xs="3" className='aboutUs-label'><strong>2451 Favor Road Southwest Marietta, GA, 30060, United States</strong></Col>
                <Col xs="auto" className='gooleMapSize'><GoogleMap /></Col>
                <Col xs="3"></Col>
            </Row>  
          </Container> 
          <Container>
            <Row>
              <Col className='aboutUs-label'><strong>Progress Summary: 20/20 Document</strong></Col>
            </Row>  
            <Row>
              <Col></Col>
              <Col><ProgressSummaryPDF /></Col>
              <Col></Col>
            </Row>  
          </Container>   
          <Container className="FooterCss">
            <Row>
              <Col></Col>  
              <Col><Link to="/projects/privacy" style={{ textDecoration: 'none',color: 'white' }}>Privacy Policy</Link></Col>
              <Col><a href='http://www.carrolldaniel.com' style={{ textDecoration: 'none',color: 'white' }}>About Carroll Daniel Construction</a></Col>
              <Col>Some information
          </Col>
        </Row>
      </Container> 
          </>
        )

    }
}
