/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
// import {
//   Collapse,
//   Navbar,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavbarText,
// } from 'reactstrap';
import {
  Nav,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

// pass user as parameter when user auth is setup
class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

logoutClickEvent = (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
  });
  this.props.history.push('/');
}

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { user, dbUser } = this.props;

    return (
      <>
      <div className='navbar'>
      <Nav expand="lg" fill variant="tabs">
          <Nav className="link-container mr-auto" navbar>
            <Nav.Item className=''>
              <Link to='/' className='nav-link m-2'>Parent Portal</Link>
            </Nav.Item>
            <Nav.Item>
              {dbUser?.is_registered && (
                <Link to='/announcements' className="nav-link m-2" href="#">Announcements</Link>
              )}
            </Nav.Item>
            <Nav.Item>
            {dbUser?.is_registered && !dbUser?.is_admin && (
                <Link to='/assignments' className="nav-link m-2" href="#">Assignments</Link>
            )}
            </Nav.Item>
            <Nav.Item>
            {dbUser?.is_registered && (
              <Link to='/messages' className="nav-link m-2" href="#">Messages</Link>
            )}
            </Nav.Item>
            <Nav.Item>
            {dbUser?.is_registered && (
              <Link to='/profile' className="nav-link m-2" href="#">Profile</Link>
            )}
            </Nav.Item>
          </Nav>
          <Nav.Item>
            <div className='logOutButton'>
                {user && (
                  <Link className="nav-link m-2" onClick={this.logoutClickEvent}>Logout</Link>
                )}
            </div>
          </Nav.Item>
      </Nav>
    </div>
        </>
    );
  }
}

export default withRouter(MyNavbar);
