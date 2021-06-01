/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';
import { Link } from 'react-router-dom';

// pass user as parameter when user auth is setup
class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

logoutClickEvent = (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {

  });
}

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { user } = this.props;
    return (
    <div>
      <Navbar color="warning" expand="lg">
        <NavbarBrand className='gradient-text'>
          <div className='nav-link'>Parent Portal</div>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} className='custom-toggler'/>
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="link-container mr-auto" navbar>
            <NavItem>
              {user && (
                <Link to='/announcements' className="nav-link m-2" href="#">Announcements</Link>
              )}
            </NavItem>
            <NavItem>
            {user && (
                <Link to='/assignments' className="nav-link m-2" href="#">Assignments</Link>
            )}
            </NavItem>
            <NavItem>
            {user && (
              <Link to='/messages' className="nav-link m-2" href="#">Messages</Link>
            )}
            </NavItem>
          </Nav>
          <NavbarText>
            <div className="form-inline my-2 my-lg-0">
                {user && (
                  <button className="nav-link btn btn-outline-primary" onClick={this.logoutClickEvent}>Logout</button>
                )}
            </div>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
