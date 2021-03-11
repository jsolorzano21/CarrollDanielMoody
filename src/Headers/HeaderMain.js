import React, { Component } from 'react';
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AuthHelperMethods from '../services/AuthHelperMethods';
import { Link } from 'react-router-dom';
import axios from 'axios'



export default class Header extends Component{ 

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            dropdownOpen: false,
            email: "j.solorzano3317@gmail.com",
            password: "abc1234",
            title: "",
            liveView: "",
            jobSite: ""
          };
      }

      Auth = new AuthHelperMethods();
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      select(event) {
        localStorage.setItem( 'SelectedOption', event.target.innerText );
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          valueDropdown: event.target.innerText,
        });
      }

      _handleLogout = () => {
        this.Auth.logout()
        var str = window.location.href
        var school = str.split('/')
        console.log(school[4])
        var logoutVar = "/projects/" + school[4]
        this.props.history.replace(logoutVar);
      }

      componentDidMount(){
        
        axios.post('http://localhost:8081/api/auth/login', this.state, {
        headers: { "Content-Type" : "application/json"}
      })
      .then(response => {
        var data = response['data'];
        this.setToken(data.token); 
      }).catch(error => {
        console.log(error)
      })

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
          this.setState({ title: dataValue[0].description})
          this.setState({ liveView: dataValue[0].headers[3]})
      }).catch(error => {
        console.log(error)
      })


    }

    setToken = idToken => {
      // Saves user token to localStorage
      localStorage.setItem("data-token", idToken);
    };

    render(){
        
        const isLiveViewEnabled = this.state.liveView;
        var imageLocation = "/projects/" + this.state.jobSite + "/displayImages"

        return (
          <Navbar bg="transparent" >
                 <Navbar.Brand href="" style={{ textDecoration: 'none', whiteSpace: 'pre-line', color: 'white', fontSize: '18px', fontWeight: 'bold', marginRight: '32%' }}>
                 <p>{this.state.title}</p>
                </Navbar.Brand>
                <Nav defaultActiveKey={'/projects/' + this.state.jobSite} as="ul" className="menu-ul">
                    <Nav.Item as="li">
                        <Nav.Link href={'/projects/' + this.state.jobSite} style={{ textDecoration: 'none',color: 'white' }}>HOME</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href={'/projects/' + this.state.jobSite + '/about'} style={{ textDecoration: 'none',color: 'white' }}>ABOUT</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                        PHOTOS & VIDEOS
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Image Dates</DropdownItem>
                        <DropdownItem tag={Link} to={{pathname: imageLocation, state: {valueDropdown: this.state.valueDropdown}
                        }} onClick={this.select}>8_21_2019 
                        </DropdownItem>
                        <DropdownItem tag={Link} to={{pathname: imageLocation, state: {valueDropdown: this.state.valueDropdown}
                        }} onClick={this.select}>7_21_2019 
                        </DropdownItem>
                        <DropdownItem tag={Link} to={{pathname: imageLocation, state: {valueDropdown: this.state.valueDropdown}
                        }} onClick={this.select}>6_21_2019
                        </DropdownItem>
                        <DropdownItem tag={Link} to={{pathname: imageLocation, state: {valueDropdown: this.state.valueDropdown}
                        }} onClick={this.select}>5_21_2019
                        </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </Nav.Item>
                    <div as = "li">
                      {(() => {
                        if (isLiveViewEnabled === "true") {
                          return (
                            <Nav.Item>
                              <Nav.Link href={'/projects/' + this.state.jobSite + '/liveView'} style={{ textDecoration: 'none',color: 'white', display: 'inline-block' }}>LIVE VIEW</Nav.Link>
                            </Nav.Item>
                          )
                        } else {
                          return (
                            ''
                          )
                        }
                      })()}
                    </div>
                    <Nav.Item as="li">
                        <Nav.Link href={'/projects/' + this.state.jobSite + '/updates'} style={{ textDecoration: 'none',color: 'white' }}>UPDATES & NEWS</Nav.Link>
                    </Nav.Item>
                </Nav>
          </Navbar>
        )

    }
}

