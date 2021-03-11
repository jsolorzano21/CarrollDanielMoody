import React, { Component } from 'react';
//import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
//import { useHistory } from 'react-router-dom'


export default class HomeMain extends Component{

  constructor(props) {
    super(props);

    this.state = {
        desc1: "",
        desc2: "",
        imgPath: ``,
        smallScreenSize: true,
        screenWidth: 0,
      };
      this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount(){
    //console.log("test" + this.props.match.params.projectId)
    //if(this.props.location.param1 === 'COLLEGE PARK'){
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
      let path = require('../images/splashPageCollege.jpg');
      this.setState({ desc1 : 'The College Park Station is located at 3800 East Main Street on the red and gold line, one stop away from Hartsfield-Jackson Atlanta International Airport. The historic downtown district of College Park is located across the street. College Park Station is over thirty years old, opening June 18, 1988. The station has two parking lots, including a long-term parking area in a parking garage.',
      desc2: 'Work under the Station Rehabilitation Program at the College Park Station is anticipated to take place at the Parking Areas, Plaza Areas, Concourse Level, and Platform Level. Specific scopes include, but are not limited to, concrete repair, pressure washing, seating replacement, painting, trash receptable replacement, brick paver replacement, aggregate concrete repair, aggregate concrete installation, fencing repair / replacement, wayfinding signage installation / replacement , replacing deteriorating sealants, replacing tactile warning strips, landscaping, electrical infrastructure for signage, and repairing windscreen concrete bases.',
      desc3: 'More information about the work at this station can be found using the CALENDAR and BID DOCUMENTS links in the top right corner of this page.',
      desc4: 'PROJECT HIGHLIGHTS',
      desc6: 'The Authority has established a DBE goal of 34% of the total dollar value of the bid total, including amendments, modifications, options and change orders. Credit towards the DBE goal for a contract shall be limited to the participation of firms performing within the designated NAICS codes (s) for which the firms have been certified as a DBE.',
      desc7: 'The CDM Joint Venture, understand the importance of maximizing participation and fully engaging disadvantaged business enterprises (DBEs) in the performance of our projects. Retention, maximization, good faith efforts, due diligence of DBE certified lower tier subcontractors and suppliers, will be a constant focus during the Preconstruction and Construction phases. All firms must be certified with MARTA and/or GDOT.',
      imgPath: path})
    }else if(this.props.match.params.projectId === 'fivePoints'){
      this.setState({ desc1 : 'The Five Points Station is the MARTA Transit Systems busiest and largest station. Built in 1979, the Five Points MARTA station is the main transfer point between the North-South (red and gold) and East-West (blue and green) rail lines, so it is the largest, and for some, the most confusing of all the MARTA stations. It is the transfer point for all rail lines and serves as the main transportation hub for MARTA. It provides access to Station Soccer, the Five Points Business District, Underground Atlanta, City Hall, the Richard B. Russell Federal Building, Cobb Community Transit, Gwinnett County Transit, GRTA Xpress Transit, and the tourism heart of Downtown Atlanta. It provides connecting bus service to Zoo Atlanta, Grant Park, Atlanta University Center, East Atlanta Village, Martin Luther King, Jr., National Historic Site, Carter Center, Atlanta City Hall, South Dekalb Mall and Fulton County Government Center.',
      desc2: 'The work under the Rehabilitation Program at the Five Points station will take place on all levels of the station and includes demolition, concrete repairs, pressure washing, seating replacement, flooring system installation, painting, replacing trash receptacles, signage installation, replacement of tactile warning strips, installation of new wall and ceiling systems, light fixture replacement, renovation of inter ior office spaces, HVAC, and electrical work.',
      desc3: 'More information about the work at this station can be found using the CALENDAR and BID DOCUMENTS links in the top right corner of this page.',
      desc4: 'PROJECT HIGHLIGHTS',
      imgPath: require('../images/splashPageFivePoints.jpg')})
    }
  }

  componentWillUnmount() {
    // you need to unbind the same listener that was binded.
    window.removeEventListener('resize', this.handleResize, { passive: true });
  }

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
      const checkScreenSize = this.state.smallScreenSize === true;
      //console.log(this.props.location.param1)
        return (
          <>
         {
          checkScreenSize ?  <>
          <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
         <Navbar.Brand><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right'}}>
             <Nav className="ml-auto">
                 <Nav.Link style={{color: 'white', paddingTop: '2%'}} href="/home">HOME</Nav.Link>
                 <Nav.Link style={{color: 'white'}} href="/projects/contact">CONTACT</Nav.Link>
                 <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.5rem 1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/calendar`,param1: this.props.location.param1 }} >CALENDAR</Link>
                 <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.5rem 1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/bidDocuments`,param1: this.props.location.param1 }}>BID DOCUMENTS</Link>
             </Nav>
           </Navbar.Collapse>
         </Navbar>
          <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
         <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif'}}>
           <Image src={this.state.imgPath} alt="AboutPic1" fluid/>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif',paddingTop: '2%'}}>{this.state.desc1}</p>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>{this.state.desc2}</p>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>{this.state.desc3}</p>
           </Col>
         </Row>
         <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
           <Col>
           <Image src={ require('../images/Resized - project highlights.jpg') } alt="projectBanner" fluid />
           </Col>
         </Row>  
         <Row style={{ paddingLeft: '2%'}}>
           <Col style={{ textAlign: 'center', paddingTop: '1%', color: 'black'}}>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>{this.state.desc5}</p>
           </Col>
         </Row></>

         : <>
         <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
         <Navbar.Brand><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right'}}>
             <Nav className="ml-auto">
                 <Nav.Link style={{color: 'white', paddingTop: '2%'}} href="/home">HOME</Nav.Link>
                 <Nav.Link style={{color: 'white'}} href="/projects/contact">CONTACT</Nav.Link>
                 <Link style={{color: 'white', paddingTop: '2%', display: 'block', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/calendar`,param1: this.props.location.param1 }} >CALENDAR</Link>
                 <Link style={{color: 'white', paddingTop: '2%', display: 'block', padding: '.1rem .1rem', textDecoration: 'none'}} to={{ pathname: `/projects/${this.props.match.params.projectId}/bidDocuments`,param1: this.props.location.param1 }}>BID DOCUMENTS</Link>
             </Nav>
           </Navbar.Collapse>
         </Navbar>
         <Image src={this.state.imgPath} style={{ width: '100%'}} alt="AboutPic1" fluid/>
         <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
         <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif'}}>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif',paddingTop: '2%'}}>{this.state.desc1}</p>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>{this.state.desc2}</p>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>{this.state.desc3}</p>
           </Col>
         </Row>
         <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
           <Col>
           <Image src={ require('../images/Resized - project highlights.jpg') } alt="projectBanner" fluid />
           </Col>
         </Row>  
         <Row style={{ paddingLeft: '2%'}}>
           <Col style={{ textAlign: 'center', paddingTop: '1%', color: 'black'}}>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>{this.state.desc5}</p>
           </Col>
         </Row></>
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
