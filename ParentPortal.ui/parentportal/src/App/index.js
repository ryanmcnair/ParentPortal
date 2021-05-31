/* eslint-disable no-undef */
import React from 'react';
import firebase from 'firebase';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/routes';
import fbConnection from '../helpers/data/fbConnection';
import Navbar from '../components/navbar';

fbConnection();

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => sessionStorage.setItem('token', token));
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user}/>
          <Routes user={this.state.user}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
