import React, { Component } from 'react';
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import AuthHelperMethods from '../services/AuthHelperMethods';



export default class Header extends Component{ 

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            dropdownOpen: false,
            valueDropdown : "PHOTOS & VIDEOS"
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
        this.props.history.replace('/projects/osborne');
      }
      
    render(){
        return (
          <Navbar bg="transparent" >
                 <Navbar.Brand href="" style={{ textDecoration: 'none',color: 'white', fontSize: '18px', fontWeight: 'bold', marginRight: '75%' }}>
                 <p>OSBORNE HS <br /> REBUILD & COBB <br /> CAREER ACADEMY</p>
                </Navbar.Brand>
                <Nav defaultActiveKey="/projects/osborne" as="ul" className="menu-ul">
                  <Nav.Item as="li">
                    <Nav.Link href="/projects/osborne" onClick={this._handleLogout} style={{ textDecoration: 'none',color: 'white' }}>LOGOUT</Nav.Link>
                  </Nav.Item>
                </Nav>
          </Navbar>
        )

    }
}

