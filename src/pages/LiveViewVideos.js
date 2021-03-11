import React, { Component } from 'react';
import LiveViewHeader from "../Headers/LiveViewHeader";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AuthHelperMethods from '../services/AuthHelperMethods';
import withAuth from '../services/withAuth';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';


class LiveViewVideos extends Component{

   /* Create a new instance of the 'AuthHelperMethods' compoenent*/
   Auth = new AuthHelperMethods();

   _handleLogout = () => {
     this.Auth.logout()
     this.props.history.replace('/projects/osborne');
   }


    render(){

      console.log("Rendering Main Page!")

        return (
          <>
          <Container className="HeaderMainLogo">
          <Row>
            <Col><LiveViewHeader /></Col>
          </Row>
          <Row className="centerLabel">
            <Col className="menu-ul-header"><strong>LIVE VIEW VIDEOS</strong></Col>
          </Row>
          </Container>
          <Container>
          <Row>
            <Col></Col>
            <Col className='player-wrapper'>
            <ReactPlayer playsinline url='https://youtu.be/jXBFG2GEvKQ'/>
            </Col>
            <Col></Col>
          </Row>
          </Container>  
          <Container className="FooterCss">
          <Row>
            <Col></Col>  
            <Col><Link to="/projects/privacy" style={{ textDecoration: 'none',color: 'white' }}>Privacy Policy</Link></Col>
            <Col><a href='http://www.carrolldaniel.com' style={{ textDecoration: 'none',color: 'white' }}>About Carroll Daniel Construction</a></Col>
            <Col>Some information</Col>
          </Row>
          </Container> 
          </>
        )

    }
}


export default withAuth(LiveViewVideos);
