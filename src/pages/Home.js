import React, { Component } from 'react';
//import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import { Nav, Dropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'


export default class Home extends Component{

    constructor(props){
      super(props)

      this.state = {
        smallScreenSize: true,
        screenWidth: 0,
      }

      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount(){
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
        //console.log(checkScreenSize)
        return (
          <>
          <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
         <Navbar.Brand><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right'}}>
             <Nav className="ml-auto">
             <Dropdown>
                <Dropdown.Toggle style={{ color: 'white', backgroundColor: '#005A8B', borderColor: '#005A8B'}}>
                  PROJECTS
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1"><Link to={{ pathname: "/projects/collegePark", param1: "COLLEGE PARK" }} style={{ textDecoration: 'none',color: 'black' }}><p>COLLEGE PARK</p></Link></Dropdown.Item>
                  <Dropdown.Item href="#/action-2"><Link to={{ pathname: "/projects/fivePoints", param1: "FIVE POINTS" }} style={{ textDecoration: 'none',color: 'black' }}><p>FIVE POINTS</p></Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                 <Nav.Link style={{color: 'white'}} href="/projects/prequalification">PREQUALIFICATION</Nav.Link>
                 <Nav.Link style={{color: 'white'}} href="/projects/contact">CONTACT</Nav.Link>
             </Nav>
           </Navbar.Collapse>
         </Navbar>
         { checkScreenSize ?   <>      
              <Container style={{ maxWidth: '100%'}}>
              <Row style={{ paddingTop: '2%', paddingLeft: '18.5%', paddingRight: '17%'}}>
              <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B'}}>
                <Image src={require(`../images/3.jpg`)} alt="MartaRehabilitationProgram" fluid/>
              </Col>
              </Row>
              </Container>
              <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>
              <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>The MARTA Station Rehabilitation Program consists of upgrading and repairing MARTA’s rail transit stations. The Carroll Daniel / Moody joint venture team (CDM) has been selected as one of the CM at Risk (CMAR) firms holding a prime contract under this program. It is anticipated that the first phase of the program will include up to twenty stations over a period of approximately four years. The stations are assigned to the CMAR teams by MARTA and while the specific scopes will vary from station to station, the work will generally include: </p>
              </Col>
              </Row>
              <Row style={{ paddingLeft: '19%'}}>
              <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>
                <ul>
                    <li>Demolition</li>
                    <li>Landscaping</li>
                    <li>Concrete Paving</li>
                    <li>Flooring</li>
                    <li>Interior and Exterior Finishes</li>
                </ul>
              </Col>
              <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}> 
              <ul>
                    <li>Painting</li>
                    <li>Signage</li>
                    <li>Mechanical</li>
                    <li>Electrical</li>
                    <li>Plumbing Work</li>
                </ul> 
                </Col>
                <Col></Col>
                </Row>
                <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
                  <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B'}}>
                  <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>Currently, the CDM team will serve as the CMAR for the work at the College Park station and the Five Points station. The stations are all proceeding under different schedules and at different rates, so both the specific scopes of work and the schedules will vary across stations. Please use the links provided below for the stations currently in progress for more information about the work at each location. As the CDM team assumes responsibility for additional stations or additional MARTA work packages, information regarding those opportunities will be included on this site as well, so check back often for updates.</p>
                  <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>Participation in these opportunities by Disadvantaged Business Enterprises (DBEs) is critical to the overall success of the program. To that end, the CDM team has committed to spending a minimum of 36% of the total dollar value of our contract , including amendments, modifications, options and change orders, with DBE firms. Credit towards the DBE goal for a contract shall be limited to the participation of firms performing within the designated NAICS code(s) for which the firms have been certified as a DBE and to firms providing a Commercially Useful Function (CUF).</p>
                  <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>The CDM team understands the importance of maximizing participation and fully engaging DBEs in the performance of our projects. Retention, maximization, good faith efforts, due diligence of DBE certified lower tier subcontractors and suppliers, will be a constant focus during the Preconstruction and Construction phases. All firms must be certified with MARTA and/or the GDOT. If you are a certified MARTA / GDOT DBE firm, please indicate this in the appropriate section of the Prequalification forms, which can be found by following the PREQUALIFICATION link on this page.</p>
                  <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>If you have any questions for the CDM team after reviewing the information included on this site, please don't hesitate to contact Daryl Witt at {<Link className="mailto" to="/projects/contact">dwitt@carrolldaniel.com</Link>}.</p>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '19%', paddingRight: '17%', paddingBottom: '2%'}} >
                  <Col style={{ textAlign: 'center', paddingTop: '1%', color: 'white'}}>
                  <Link to={{ 
                    pathname: "/projects/collegePark", 
                    param1: "COLLEGE PARK" 
                    }} style={{ textDecoration: 'none',color: 'white' }}>
                    <Image src={require(`../images/500 px College Park Station.jpg`)} alt="AboutPic1" fluid/></Link>
                  </Col>
                  <Col md="auto" style={{ paddingTop: '2%'}}></Col>
                  <Col style={{ textAlign: 'center', paddingTop: '1%', color: 'white'}}>
                  <Link to={{ 
                    pathname: "/projects/fivePoints", 
                    param1: "FIVE POINTS" 
                    }} style={{ textDecoration: 'none',color: 'white' }}>
                    <Image src={require(`../images/500 px Fi Points Station.jpg`)} alt="AboutPic1" fluid/></Link>
                  </Col>
                </Row>
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
          : <>
           <Image src={require(`../images/3.jpg`)} style={{ width: '100%'}} alt="MartaRehabilitationProgram" fluid/>
           <Row style={{ paddingLeft: '2%'}}>
           <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>
           <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>The MARTA Station Rehabilitation Program consists of upgrading and repairing MARTA’s rail transit stations. The Carroll Daniel / Moody joint venture team (CDM) has been selected as one of the CM at Risk (CMAR) firms holding a prime contract under this program. It is anticipated that the first phase of the program will include up to twenty stations over a period of approximately four years. The stations are assigned to the CMAR teams by MARTA and while the specific scopes will vary from station to station, the work will generally include: </p>
           </Col>
           </Row>
           <Row style={{ paddingLeft: '2%'}}>
            <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>
              <ul>
                  <li>Demolition</li>
                  <li>Landscaping</li>
                  <li>Concrete Paving</li>
                  <li>Flooring</li>
                  <li>Interior and Exterior Finishes</li>
              </ul>
            </Col>
            <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}> 
            <ul>
                  <li>Painting</li>
                  <li>Signage</li>
                  <li>Mechanical</li>
                  <li>Electrical</li>
                  <li>Plumbing Work</li>
              </ul> 
              </Col>
              <Col></Col>
              </Row>
              <Row style={{ paddingLeft: '2%'}}>
                <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B'}}>
                <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>Currently, the CDM team will serve as the CMAR for the work at the College Park station and the Five Points station. The stations are all proceeding under different schedules and at different rates, so both the specific scopes of work and the schedules will vary across stations. Please use the links provided below for the stations currently in progress for more information about the work at each location. As the CDM team assumes responsibility for additional stations or additional MARTA work packages, information regarding those opportunities will be included on this site as well, so check back often for updates.</p>
                <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>Participation in these opportunities by Disadvantaged Business Enterprises (DBEs) is critical to the overall success of the program. To that end, the CDM team has committed to spending a minimum of 36% of the total dollar value of our contract , including amendments, modifications, options and change orders, with DBE firms. Credit towards the DBE goal for a contract shall be limited to the participation of firms performing within the designated NAICS code(s) for which the firms have been certified as a DBE and to firms providing a Commercially Useful Function (CUF).</p>
                <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>The CDM team understands the importance of maximizing participation and fully engaging DBEs in the performance of our projects. Retention, maximization, good faith efforts, due diligence of DBE certified lower tier subcontractors and suppliers, will be a constant focus during the Preconstruction and Construction phases. All firms must be certified with MARTA and/or the GDOT. If you are a certified MARTA / GDOT DBE firm, please indicate this in the appropriate section of the Prequalification forms, which can be found by following the PREQUALIFICATION link on this page.</p>
                <p style={{ textAlign: 'left', fontSize: '14px', fontFamily: 'Lato,sans-serif'}}>If you have any questions for the CDM team after reviewing the information included on this site, please don't hesitate to contact Daryl Witt at {<a class="mailto" href="/projects/contact">dwitt@carrolldaniel.com</a>}.</p>
                </Col>
              </Row>
              <div style={{ width: '100%', paddingBottom: '2%'}}>
              <Link to={{ 
                    pathname: "/projects/collegePark", 
                    param1: "COLLEGE PARK" 
                    }} style={{ textDecoration: 'none',color: 'white' }}>
                    <Image src={require(`../images/500 px College Park Station.jpg`)} alt="AboutPic1" fluid/></Link>
              </div>
              <div>      
              <Link to={{ 
                    pathname: "/projects/fivePoints", 
                    param1: "FIVE POINTS" 
                    }} style={{ textDecoration: 'none',color: 'white' }}>
                    <Image src={require(`../images/500 px Fi Points Station.jpg`)} alt="AboutPic1" fluid/></Link>
              </div>
              <div style={{ paddingTop: '2%'}}>
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
              </div>
           </>
          }
          </>
        )

    }
}
