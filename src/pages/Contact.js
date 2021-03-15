import React, { Component } from 'react';
//import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Nav, Modal, Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import axios from 'axios'

export default class Contact extends Component{

  constructor(props){
    super(props)
    this.state = { 
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      comments: '',
      show: false,
      errors: {},
      smallScreenSize: true,
      screenWidth: 0,
      touched: {
        first_name: false,
        last_name: false,
        email: false,
        phone_number: false,
      }
    }

    this.handleResize = this.handleResize.bind(this);
  }

    validate(){
 
      let errors = {};
      let isValid = true;
    
      if (!this.state.first_name.length) {
        isValid = false;
        errors["first_name"] = "Please enter your first name.";
      }

      if (!this.state.last_name.length) {
        isValid = false;
        errors["last_name"] = "Please enter your last name.";
      }

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (this.state.email.length === 0 || !pattern.test(this.state.email)) {
        isValid = false;
        errors["email"] = "Please enter vailid email address.";
      }
    
      var patternPhone = new RegExp(/^[0-9\b]+$/);
      if (this.state.phone_number.length !== 10 || !patternPhone.test(this.state.phone_number)) {
        isValid = false;
        errors["phone_number"] = "Please enter vailid phone number.";
      }

      if (!this.state.comments.length) {
        isValid = false;
        errors["comments"] = "Please enter your comments.";
      }

      this.setState({
        errors: errors
      });

      return isValid;
    
    }

    showModal = () => {
      this.handleSubmit()
    };

    hideModal = () => {
      this.setState({ show: false });
    };

    handleFirstNameChange = evt => {
      this.setState({ first_name: evt.target.value });
    };

    handleLastNameChange = evt => {
      this.setState({ last_name: evt.target.value });
    };

    handleEmailChange = evt => {
      this.setState({ email: evt.target.value });
    };

    handlePhoneNumberChange = evt => {
      this.setState({ phone_number: evt.target.value });
    };

    handleCommentsChange = evt => {
      this.setState({ comments: evt.target.value });
    };

    handleSubmit = evt => {
      //console.log("entered handlesubmit")
      if(this.validate()){

        var body = {
          "emailAddress": this.state.email,
          "firstName": this.state.first_name,
          "lastName": this.state.last_name,
          "phone": this.state.phone_number,
          "comments": this.state.comments
      }

        axios.post(
          'https://mailservice-1613875794820.azurewebsites.net/getintouch', 
          body, 
          {
              headers: { 
                  'Content-Type' : 'application/json' 
              }
          }
          ).then(response => {
              //console.log(response)
              this.setState({
                show: true, first_name: '', last_name: '', email: '', phone_number: '', comments: ''
              });
          });  

      }  
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

            <Container style={{ paddingBottom: '6%'}}>
            <Row style={{ paddingTop: '2%', paddingLeft: '19%', paddingRight: '17%'}}>
              <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B'}}>
                <h2 style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 300}}>Get In Touch 
                </h2> <h2 style={{textAlign: 'center', fontSize: '14px', color: 'red', fontFamily: 'Lato,sans-serif'}}>All fields are required</h2>
                <br />
              </Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*First </label>
              <input
                  style={{  width: '100%'}}
                  type="text"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.handleFirstNameChange} /><br /> 
                    <label className="text-danger" style={{ paddingLeft: '1%'}}>{this.state.errors.first_name}</label>
              </Col>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Last</label>
              <input
                    style={{  width: '100%'}}
                    type="text"
                    placeholder="Enter Last Name"
                    value={this.state.last_name}
                    onChange={this.handleLastNameChange} /><br /> 
                    <label className="text-danger" style={{ paddingLeft: '1%'}}>{this.state.errors.last_name}</label>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Email</label><br />
              <input
                    style={{  width: '100%'}}
                    type="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange} /><br /> 
                    <label className="text-danger">{this.state.errors.email}</label>

              </Col>
              <Col>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Phone</label><br />
              <input
                    style={{  width: '100%'}}
                    type="text"
                    placeholder="Enter Phone Number Ex: 1234567891"
                    value={this.state.phone_number}
                    onChange={this.handlePhoneNumberChange} /><br /> 
                    <label className="text-danger">{this.state.errors.phone_number}</label>

              </Col>
              <Col>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Comments & Questions</label><br />
              <textarea
                    name="numberOfGuests"
                    type="string"
                    className= "textarea large"
                    style={{ width: '100%'}}
                    placeholder="Enter Comments & Questions"
                    value={this.state.comments}
                    onChange={this.handleCommentsChange} /><br /> 
                    <label className="text-danger">{this.state.errors.comments}</label>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '19%', paddingRight: '17%'}}>
              <Col> 
              <button style={{backgroundColor: 'silver', color: 'black' }} disabled={false} type='submit' onClick={this.showModal}>Submit</button>
              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
          :
          <Container style={{ paddingBottom: '6%'}}>
            <Row style={{ paddingTop: '2%', paddingLeft: '2%', paddingRight: '2%'}}>
              <Col style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B'}}>
                <h2 style={{ textAlign: 'center', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 300}}>Get In Touch 
                </h2> <h2 style={{textAlign: 'center', fontSize: '14px', color: 'red', fontFamily: 'Lato,sans-serif'}}>All fields are required</h2>
                <br />
              </Col>
            </Row>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*First </label>
              <input
                  style={{  width: '100%'}}
                  type="text"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.handleFirstNameChange} /><br /> 
                    <label className="text-danger" style={{ paddingLeft: '1%'}}>{this.state.errors.first_name}</label>
              </Col>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Last</label>
              <input
                    style={{  width: '100%'}}
                    type="text"
                    placeholder="Enter Last Name"
                    value={this.state.last_name}
                    onChange={this.handleLastNameChange} /><br /> 
                    <label className="text-danger" style={{ paddingLeft: '1%'}}>{this.state.errors.last_name}</label>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Email</label><br />
              <input
                    style={{  width: '100%'}}
                    type="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange} /><br /> 
                    <label className="text-danger">{this.state.errors.email}</label>

              </Col>
              <Col>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Phone</label><br />
              <input
                    style={{  width: '100%'}}
                    type="text"
                    placeholder="Enter Phone Number Ex: 1234567891"
                    value={this.state.phone_number}
                    onChange={this.handlePhoneNumberChange} /><br /> 
                    <label className="text-danger">{this.state.errors.phone_number}</label>

              </Col>
              <Col>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
              <Col>
              <label style={{ textAlign: 'left', paddingTop: '1%', color: '#005A8B', fontFamily: 'Lato,sans-serif', fontWeight: 700}}>*Comments & Questions</label><br />
              <textarea
                    name="numberOfGuests"
                    type="string"
                    className= "textarea large"
                    style={{ width: '100%'}}
                    placeholder="Enter Comments & Questions"
                    value={this.state.comments}
                    onChange={this.handleCommentsChange} /><br /> 
                    <label className="text-danger">{this.state.errors.comments}</label>
              </Col>
            </Row>
            <Row style={{ paddingLeft: '2%', paddingRight: '2%'}}>
              <Col> 
              <button style={{backgroundColor: 'silver', color: 'black' }} disabled={false} type='submit' onClick={this.showModal}>Submit</button>
              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
          }
          <Modal show={this.state.show} >
          <Modal.Header closeButton>
            <Modal.Title>Get In Touch</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your request has been submitted!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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

