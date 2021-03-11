import React, { Component } from 'react';
import HeaderMain from "../Headers/HeaderMain";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
//import axios from 'axios'



export default class HomeMain extends Component{

  constructor(props) {
    super(props);

    this.state = {
        homeTitle: "",
        homeLabel: "",
        jobSite: "",
        objectId: "",
        headerLiveView: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

          var str = window.location.href
          var school = str.split('/')
          this.setState({ jobSite: school[4]})
          var objectId  
          Object.keys(dataValue).forEach(function(key) {

                if(dataValue[key].name.toUpperCase() === school[4].toUpperCase()){
                    console.log(dataValue[key]._id)
                    objectId = dataValue[key]._id
                    this.setState({ objectId: "http://localhost:8081/api/pets/".concat(objectId)})
                }
          })

          axios.put(objectId,
            {headers: {
            "Authorization" : AuthStr,
            "Content-Type" : "application/json"
          }
        }

          )

        }).catch(error => {
        console.log(error)
        })


    }*/

    handleChange(event) {
        this.setState({
            headerLiveView: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        alert(`You chose the ${this.state.headerLiveView} pizza.`);
    }

    setHeader(event) {
        console.log(event.target.value);
      }

    render(){
          
        return (
          <>
          <Container className="HeaderMainLogo">
          <Row>
            <Col><HeaderMain /></Col>
          </Row>
          <Row className="centerLabel">
            <Col></Col>
            <Col className="menu-ul-header" style={{ whiteSpace: 'pre-line' }}><strong>{this.state.homeTitle}</strong></Col>
            <Col></Col>
          </Row>
          </Container>
          <Container className="HomeMainSecondContainer">
            <Row>
              <Col></Col>  
                <Col xs="auto">  
                <form onSubmit={this.handleSubmit}>
                <p>Input Live View Header:</p>
                
                    <label style={{ paddingRight: '10%' }}>
                        <input
                        type="radio"
                        value="true"
                        checked={this.state.headerLiveView === "true"}
                        onChange={this.handleChange}
                        />
                        Yes
                    </label>

                    <label style={{ paddingRight: '10%'}}>
                        <input
                        type="radio"
                        value="false"
                        checked={this.state.headerLiveView === "false"}
                        onChange={this.handleChange}
                        />
                        No
                    </label>

                <button type="submit" >Save</button>
                </form>
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
