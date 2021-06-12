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
import { Link, withRouter } from 'react-router-dom';
import Loader from './loader';

// pass user as parameter when user auth is setup
class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    loading: true
  }

logoutClickEvent = (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
  });
  this.props.history.push('/');
}

componentDidMount() {
  this.setLoading();
}

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    const { user, dbUser } = this.props;
    const { loading } = this.state;
    return (
      <>
      { loading ? (<Loader />)
        : (<div>
      <Navbar color="warning" expand="lg">
        <NavbarBrand className='gradient-text'>
          <Link to='/' className='nav-link'>Parent Portal</Link>
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
            {/* !dbUser.is_admin */}
            {!dbUser.is_admin && (
                <Link to='/assignments' className="nav-link m-2" href="#">Assignments</Link>
            )}
            </NavItem>
            <NavItem>
            {user && (
              <Link to='/messages' className="nav-link m-2" href="#">Messages</Link>
            )}
            </NavItem>
            <NavItem>
            {user && (
              <Link to='/profile' className="nav-link m-2" href="#">Profile</Link>
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
    </div>)
        }
        </>
    );
  }
}

export default withRouter(MyNavbar);
