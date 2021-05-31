import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'firebase/auth';
import { Link } from 'react-router-dom';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth d-flex justify-content-center">
        <button className="btn" onClick={this.loginClickEvent}>
          Google Sign In
        </button>
        <Link className='btn' to='/register'>
          Register
        </Link>
      </div>
    );
  }
}
