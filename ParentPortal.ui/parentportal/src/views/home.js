/* eslint-disable react/prop-types */
import React from 'react';
import Loader from '../components/loader';

export default class Home extends React.Component {
    state = {
      loading: false
    };

    render() {
      const { loading } = this.state;
      return (
        <>
        { loading ? (<Loader />)
          : (<div className='homeContainer'>
                <div className='home'>
                  <h2>Welcome to the Parent Portal, {this.props.dbUser?.first_name}!</h2>
                  <p>You are now able to view school announcements, your student&apos;s assignments and keep in touch with your teacher all in one place. </p>
                </div>
            </div>)
    }
            </>
      );
    }
}
