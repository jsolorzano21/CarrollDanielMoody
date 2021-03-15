import React, { Component } from 'react';
//import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button'
//import { UserAgentApplication } from 'msal'
import axios from 'axios'
import config from '../Config/UserConfig';
import { getUserDetails } from '../Config/GraphService';
//import CalendarSecond from '../Calendar/CalendarSecond';
import "../calendarApp.css";
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

export default class Calendars extends Component{

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      smallScreenSize: true,
      screenWidth: 0,
      };

      this.handleResize = this.handleResize.bind(this);
    }

     login = async event => {
      try {

        const loginRequest = {
          scopes: config.scopes,
          prompt: "select_account"
      }

        await this.userAgentApplication.loginPopup(loginRequest).then(function (loginResponse) {
          
          //login success
          //var idToken = loginResponse.idToken;
          //console.log(idToken);
          }).catch(function (error) {
          //login failure
          console.log(error);
        });
        await this.getUserProfile();
        this.props.history.replace("/projects/osborne/liveViewVideos");
      }
      catch(err) {
        var errParts = err.toString().split('|');
        this._isMounted && this.setState({
          isAuthenticated: false,
          user: {},
          error: { message: errParts[1], debug: errParts[0] }
        });
      }
    }
    logout() {
      this.userAgentApplication.logout();
    }

    async getUserProfile() {

      try {
        // Get the access token silently
        // If the cache contains a non-expired token, this function
        // will just return the cached token. Otherwise, it will
        // make a request to the Azure OAuth endpoint to get a token
    
        if (window.location.hash.includes("id_token")) {
          window.close();
        }
        var accessToken = await this.userAgentApplication.acquireTokenSilent({
          scopes: config.scopes
        });

        if (accessToken) {
          // Get the user's profile from Graph

          var user = await getUserDetails(accessToken);
          this._isMounted && this.setState({
            isAuthenticated: true,
            user: {
              displayName: user.displayName,
              email: user.mail || user.userPrincipalName
            },
            error: null
          });
        }
      }
      catch(err) {
        var error = {};
        if (typeof(err) === 'string') {
          var errParts = err.toString().split('|');
          error = errParts.length > 1 ?
            { message: errParts[1], debug: errParts[0] } :
            { message: err };
        } else {
          error = {
            message: err.message,
            debug: JSON.stringify(err)
          };
        }
    
        this._isMounted && this.setState({
          isAuthenticated: false,
          user: {},
          error: error
        });
      }
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
      this._isMounted && this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleSubmit = async event => {
      event.preventDefault();

      if(localStorage.getItem("msal.idtoken") !== ''){
          this.props.history.replace("/projects/osborne/liveViewVideos");
      }if(this.state.email === '' && this.state.password === '' && localStorage.getItem("msal.idtoken") === null){
          this.login();
        }
      if(this.state.email !== '' && this.state.password !== ''){
      //console.log(this.state)
      axios.post('http://localhost:8081/api/auth/login', this.state, {
        headers: { 'Content-Type' : 'application/json'}
      })
      .then(response => {
        var data = response['data'];
        //console.log(data.token)
        this.setToken(data.token); // Setting the token in localStorage
        this.props.history.replace("/projects/osborne/liveViewVideos");
      })
      .catch(error => {
        alert("Invalid Username and Password");
      })
    }
  
  }

  componentWillUnmount() {
    // you need to unbind the same listener that was binded.
    this._isMounted = false;
    window.removeEventListener('resize', this.handleResize, { passive: true });
  } 

  componentDidMount(){
    this._isMounted = true;
    window.addEventListener('resize', this.handleResize, { passive: true })

    if(window.innerWidth !== this.state.screenWidth){
      if(window.innerWidth > 1600){
        //console.log("value entered 1")
        this.setState({ smallScreenSize: true, screenWidth: window.innerWidth})
        //window.location.reload()
      }else if(window.innerWidth > 1200 && window.innerWidth <= 1600){
        this.setState({ smallScreenSize: true, screenWidth: window.innerWidth})
        //window.location.reload()
      }else if(window.innerWidth >= 1024 && window.innerWidth <= 1200){
        this.setState({ smallScreenSize: false, screenWidth: window.innerWidth})
        //window.location.reload()
      }else if(window.innerWidth >= 768 && window.innerWidth < 1024){
        //ipad size
        this.setState({ smallScreenSize: false, screenWidth: window.innerWidth})
        //window.location.reload()
      }else if(window.innerWidth < 768){
        this.setState({ smallScreenSize: false, screenWidth: window.innerWidth})
        //window.location.reload()
      }
    }

    if(this.props.match.params.projectId === 'collegePark'){
      this.setState({ desc1 : 'MARTA – College Park Station Rehabilitation',
      desc2: 'https://cdcc.egnyte.com/fl/xgcx0IyaFX',
      desc3: '3/16/21 – 100% DESIGN DOCUMENTS COMPLETE',
      desc4: 'Paver- Replacement Package – November 2020-April 2021',
      desc5: 'Signage Package – January 2021-February 2021',
      desc6: 'All other work- March 2021-Augusy 2021',
      desc7: '*Bid documents will be available shortly after the 100% design is complete',
      desc8: '*Times and dates for information sessions will be included as they become available',
      locationName: 'College Park',
      calendarValue: 0})
    }else if(this.props.match.params.projectId === 'fivePoints'){
      this.setState({ desc1 : 'MARTA – Five Points Station Rehabilitation',
      desc2: 'https://cdcc.egnyte.com/fl/TYO7dd1sJn#folder-link/',
      desc3: '6/04/21 – Construction Documents (100%) complete',
      desc4: '',
      desc5: '',
      desc6: '',
      desc7: '',
      desc8: '',
      locationName: 'Five Points',
      calendarValue: 1})
    }
  }

    setToken = idToken => {
      // Saves user token to localStorage
      localStorage.setItem("msal.idtoken", idToken);
    };

    handleResize(){
      if(window.innerWidth !== this.state.screenWidth){
        if(window.innerWidth > 1600){
          //console.log('Value entered 2')
          this.setState({ smallScreenSize: true, screenWidth: window.innerWidth})
          //window.location.reload()
        }else if(window.innerWidth > 1200 && window.innerWidth <= 1600){
          this.setState({ smallScreenSize: true, screenWidth: window.innerWidth})
          //window.location.reload()
        }else if(window.innerWidth >= 1024 && window.innerWidth <= 1200){
          this.setState({ smallScreenSize: false, screenWidth: window.innerWidth})
          //window.location.reload()
        }else if(window.innerWidth >= 768 && window.innerWidth < 1024){
          //ipad size
          this.setState({ smallScreenSize: false, screenWidth: window.innerWidth})
          //window.location.reload()
        }else if(window.innerWidth < 768){
          this.setState({ smallScreenSize: false, screenWidth: window.innerWidth})
          //window.location.reload()
        }
      }
    }

    render(){
      //console.log(this.props.location.param1)
      const checkScreenSize = this.state.smallScreenSize === true;
      const event = this.state.calendarValue === 0;

        return (
             <>
          {
            checkScreenSize ?  
            <>
            <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
            <Navbar.Brand><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right'}}>
              <Nav className="ml-auto">
                  <Nav.Link style={{color: 'white', paddingTop: '1.5%'}} href="/home">HOME</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/contact">CONTACT</Nav.Link>
                  <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.5rem 1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}`,param1: this.props.location.param1 }} >PROJECT</Link>
                  <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.5rem 1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/calendar`,param1: this.props.location.param1 }} >CALENDAR</Link>
                  <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.5rem 1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/bidDocuments`,param1: this.props.location.param1 }}>BID DOCUMENTS</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
            {event ? 
            <>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col className='aboutUs-label' style={{ textAlign: 'center', color: '#005A8B', fontSize: '25px', fontFamily: 'Lato,sans-serif'}}><p>Please click the link(s) below for access to the project documents</p></Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%', paddingBottom: '21%'}}>
              <Col className='aboutUs-label' style={{ textAlign: 'center', textDecoration: 'underline', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}><a href={this.state.desc2} target="_blank" rel="noopener noreferrer">{this.state.desc1}</a></Col>
            </Row></>
          : <>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col className='aboutUs-label' style={{ textAlign: 'center', color: '#005A8B', fontSize: '25px', fontFamily: 'Lato,sans-serif'}}><p>Please click the link(s) below for access to the project documents</p></Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%', paddingBottom: '21%'}}>
              <Col className='aboutUs-label' style={{ textAlign: 'center', textDecoration: 'underline', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}><a href={this.state.desc2} target="_blank" rel="noopener noreferrer">{this.state.desc1}</a></Col>
            </Row></>}
          </>
          :
          <>
          <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
          <Navbar.Brand><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right'}}>
              <Nav className="ml-auto">
                  <Nav.Link style={{color: 'white', paddingTop: '2%'}} href="/home">HOME</Nav.Link>
                  <Nav.Link style={{color: 'white'}} href="/projects/contact">CONTACT</Nav.Link>
                  <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.1rem .1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}`,param1: this.props.location.param1 }} >PROJECT</Link>
                  <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.1rem .1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/calendar`,param1: this.props.location.param1 }} >CALENDAR</Link>
                  <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.1rem .1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/bidDocuments`,param1: this.props.location.param1 }}>BID DOCUMENTS</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {event ? 
          <>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%', paddingBottom: '2%'}}>
              <Col className='aboutUs-label' style={{ textAlign: 'center', textDecoration: 'underline'}}><p>Please click the link(s) below for access to the project documents</p></Col>
            </Row>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%', paddingBottom: '60%'}}>
            <Col className='aboutUs-label' style={{ textAlign: 'center', textDecoration: 'underline'}}><a href={this.state.desc2} target="_blank" rel="noopener noreferrer">{this.state.desc1}</a></Col>
          </Row></>
          : <>
          <Row style={{ paddingLeft: '2%', paddingRight: '2%', paddingBottom: '2%'}}>
              <Col className='aboutUs-label' style={{ textAlign: 'center', textDecoration: 'underline'}}><p>Please click the link(s) below for access to the project documents</p></Col>
            </Row>
          <Row style={{ paddingLeft: '2%', paddingRight: '2%', paddingBottom: '60%'}}>
            <Col className='aboutUs-label' style={{ textAlign: 'center', textDecoration: 'underline'}}><a href={this.state.desc2} target="_blank" rel="noopener noreferrer">{this.state.desc1}</a></Col>
          </Row></>}</>
          } 
          <Container style={{ maxWidth: '100%', backgroundColor: '#005A8B'}}>
                  <Row style={{ justifyContent: 'center'}}>
                      <Col style={{ paddingTop: '1%'}} md="auto"><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Col>
                  </Row>
          </Container>
          <Container style={{ maxWidth: '100%', backgroundColor: '#005A8B'}}>
                  <Row style={{ justifyContent: 'center'}}>
                      <Col style={{ paddingTop: '1%', color: 'white'}} md="auto"><a href="https://www.carrolldaniel.com/" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none',color: 'white' }}>Carroll Daniel Constrution</a> | <a href="https://cdmoodyconstruction.com/" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none',color: 'white' }}>C.D. Moody Construction</a></Col>
                  </Row>
          </Container>
          <Container style={{ maxWidth: '100%', backgroundColor: '#005A8B'}}>
                  <Row style={{ justifyContent: 'center'}}>
                      <Col md="auto"><p style={{ color: 'white', fontFamily: 'Lato,sans-serif'}}>445 Atlanta South Parkway Suite 160 College Park, GA 30349</p></Col>  
                  </Row>
          </Container>   
          </>
        )

    }
}

