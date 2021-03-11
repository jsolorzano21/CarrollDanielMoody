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
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default class Calendars extends Component{

  _isMounted = false;

  constructor(props) {
    super(props);

    const events = [
      {
          id: 0,
          title: '30% DESIGN COMPLETE ',
          allDay: true,
          start: new Date(2020, 9, 27),
          end: new Date(2020, 9, 27),
      },
      {
          id: 1,
          title: '60% DESIGN COMPLETE ',
          start: new Date(2021, 1, 5),
          end: new Date(2021, 1, 5),
      },
      {
          id: 2,
          title: '100% DESIGN DOCUMENTS COMPLETE ',
          start: new Date(2021, 2, 16),
          end: new Date(2021, 2, 16),
      },
      {
        id: 3,
        title: 'Paver Replacement Package',
        start: new Date(2020, 10, 1),
        end: new Date(2021, 3, 1),
    },
    {
      id: 4,
      title: 'Signage Package',
      start: new Date(2021, 0, 1),
      end: new Date(2021, 1, 1),
    },
    {
      id: 5,
      title: 'All other work',
      start: new Date(2021, 2, 1),
      end: new Date(2021, 7, 1),
    },
    ]

    const events2 = [
      {
          id: 0,
          title: 'SCHEMATIC DESIGN (30%) COMPLETE',
          allDay: true,
          start: new Date(2021, 0, 21),
          end: new Date(2021, 0, 21),
      },
      {
          id: 1,
          title: 'DESIGN DEVELOPMENT (60%) COMPLETE',
          start: new Date(2021, 2, 26),
          end: new Date(2021, 2, 26),
      },
      {
          id: 2,
          title: 'CONSTRUCTION DOCUMENTS (100%) COMPLETE',
          start: new Date(2021, 5, 4),
          end: new Date(2021, 5, 4),
      }
    ]

    /*this.userAgentApplication = new UserAgentApplication({
      auth: {
          clientId: config.appId
      },
      cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: true
      }
    });*/

    //var user = this.userAgentApplication.getAccount;

    /*this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null
    };*/

    /*if (user) {
    // Enhance user object with data from Graph
      this.getUserProfile();
    }*/

    this.state = {
      email: "",
      password: "",
      events,
      events2,
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

  componentDidMount() {
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
      let path = require('../images/MARTAAerial2.jpg');
      this.setState({ desc1 : '10/27/20- 30% DESIGN COMPLETE',
      desc2: '2/5/21 – 60% DESIGN COMPLETE',
      desc3: '3/16/21 – 100% DESIGN DOCUMENTS COMPLETE',
      desc4: '* BID DOCUMENTS WILL BE AVAILABLE SHORTLY AFTER THE 100% DESIGN IS COMPLETE',
      desc5: '* TIMES AND DATES FOR INFORMATION SESSIONS WILL BE INCLUDED AS THEY BECOME AVAILABLE',
      desc6: '',
      desc7: '',
      desc8: '',
      imgPath: path,
      locationName: 'College Park',
      calendarValue: 0})
    }else if(this.props.match.params.projectId === 'fivePoints'){
      this.setState({ desc1 : '1/22/21 – SCHEMATIC DESIGN (30%) COMPLETE',
      desc2: 'TBD – DESIGN DEVELOPMENT (60%) COMPLETE',
      desc3: 'TBD – CONSTRUCTION DOCUMENTS (100%) COMPLETE',
      desc4: '* BID DOCUMENTS WILL BE AVAILABLE SHORTLY AFTER THE 100% DESIGN IS COMPLETE',
      desc5: '* TIMES AND DATES FOR INFORMATION SESSIONS WILL BE INCLUDED AS THEY BECOME AVAILABLE',
      desc6: '',
      desc7: '',
      desc8: '',
      imgPath: require('../images/fivePoints.jpg'),
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
            <Row style={{ paddingTop: '2%', paddingLeft: '19%', paddingRight: '17%'}}>
            <Col style={{ textAlign: 'center', fontFamily: 'Lato,sans-serif', fontSize: '25px', color: 'grey', paddingTop: '2%'}}><strong>PRECONSTRUCTION SCHEDULE</strong></Col>
          </Row> 
          <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
            <Col style={{ textAlign: 'center', fontFamily: 'Lato,sans-serif', fontSize: '25px', color: 'grey'}}><p style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Lato,sans-serif'}}><strong>{this.state.locationName}</strong></p></Col>
          </Row>
          <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
            <Col><p style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Lato,sans-serif'}}>KEY DATES</p></Col></Row>
          <Row style={{ paddingTop: '2%', paddingLeft: '37%', paddingRight: '17%', paddingBottom: '11%'}}>
            <Col style={{ textAlign: 'center', fontFamily: 'Lato,sans-serif'}}>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc1}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc2}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc3}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc4}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc5}</p>
            </Col>
          </Row> </> :
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
          <Row style={{ paddingTop: '2%', paddingLeft: '2%', paddingRight: '2%'}}>
            <Col style={{ textAlign: 'center', fontFamily: 'Lato,sans-serif', fontSize: '25px', color: 'grey', paddingTop: '2%'}}><strong>PRECONSTRUCTION SCHEDULE</strong></Col>
          </Row> 
          <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
            <Col style={{ textAlign: 'center', fontFamily: 'Lato,sans-serif', fontSize: '25px', color: 'grey'}}><p style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Lato,sans-serif'}}><strong>{this.state.locationName}</strong></p></Col>
          </Row>
          <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
            <Col><p style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Lato,sans-serif'}}>KEY DATES</p></Col></Row>
          <Row style={{ paddingTop: '2%', paddingLeft: '2%', paddingRight: '2%'}}>
            <Col>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc1}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc2}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc3}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc4}</p>
            <p style={{ textAlign: 'left', fontFamily: 'Lato,sans-serif'}}>{this.state.desc5}</p>
            </Col>
          </Row> </>         
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

