import React, { Component } from 'react';
//import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
//import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

const items = [
  {
    src: '/images-osborne/site1.jpg',
    altText: 'Slide 1',
    caption: 'Southwest View',
  },
  {
    src: '/images-osborne/site2.jpg',
    altText: 'Slide 2',
    caption: 'Dangerous'
  },
  {
    src: '/images-osborne/site3.jpg',
    altText: 'Slide 3',
    caption: 'Working Hard'
  }
];

export default class Prequalification extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      smallScreenSize: true,
      screenWidth: 0, 
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
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

        return (
          <>
          <Navbar className="color-nav" style={{paddingTop: '2%', paddingBottom: '1%'}} expand="lg">
         <Navbar.Brand><img src={ require('../images/Carrol-Daniel-and-CD-Moody-Joint-Logo800x320.png') } alt="jointVentureLogo" className="mainLogo" /></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right'}}>
             <Nav className="ml-auto">
                 <Nav.Link style={{color: 'white'}} href="/home">HOME</Nav.Link>
                 <Nav.Link style={{color: 'white'}} href="/projects/prequalification">PREQUALIFICATION</Nav.Link>
                 <Nav.Link style={{color: 'white'}} href="/projects/contact">CONTACT</Nav.Link>
             </Nav>
           </Navbar.Collapse>
         </Navbar>
         {
          checkScreenSize ? 
              <Row style={{ paddingTop: '2%', paddingLeft: '19%', paddingRight: '17%'}}>
              <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B'}}>
              <p style={{ color: 'red', fontFamily: 'Lato,sans-serif'}}>Under the “Add / Edit Trades” field below, please be sure to select MARTA under 01 – GENERAL REQUIREMENTS in order to be considered for MARTA work. You may also select the trades in which your company performs work.</p>
              <p><iframe title="web" style={{ width: '100%', height: '950px'}} src="//projects.isqft.com/10589822/embeddedform" frameBorder="0"></iframe></p>
              </Col>
              </Row>
              : <Row style={{ paddingTop: '2%', paddingLeft: '2%', paddingRight: '2%'}}>
              <Col style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B'}}>
                <p style={{ color: 'red', fontFamily: 'Lato,sans-serif'}}>Under the “Add / Edit Trades” field below, please be sure to select MARTA under 01 – GENERAL REQUIREMENTS in order to be considered for MARTA work. You may also select the trades in which your company performs work.</p>
                <p><iframe title="mobile" style={{ width: '100%', height: '950px'}} src="//projects.isqft.com/10589822/embeddedform" frameBorder="0"></iframe></p>
                </Col>
              </Row>
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
