/* eslint-disable no-undef */
import React from 'react';
import firebase from 'firebase';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/routes';
import fbConnection from '../helpers/data/fbConnection';
import Navbar from '../components/navbar';
import userData from '../helpers/data/userData';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
    dbUser: null
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          sessionStorage.setItem('token', token);
          this.setState({ user });
        }).then(() => {
          this.setUserInState(this.state.user.uid);
        });
      } else {
        this.setState({ user: false });
      }
    });
  }

  // componentDidUpdate() {
  //   this.setUserInState(this.state.user.uid);
  // }

  setUserInState = (fbUid) => {
    userData.getUserByFBUid(fbUid).then((response) => {
      this.setState({
        dbUser: response,
      });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} dbUser={this.state.dbUser} {...this.props} />
          <Routes user={this.state.user} dbUser={this.state.dbUser} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
