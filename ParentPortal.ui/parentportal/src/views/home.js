/* eslint-disable react/prop-types */
import React from 'react';
import Loader from '../components/loader';

export default class Home extends React.Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.setLoading();
    }

    setLoading = () => {
      this.timer = setInterval(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    render() {
      const { loading } = this.state;
      return (
        <>
        { loading ? (<Loader />)
          : (<>
            <h1>Home View</h1>
            <h2>Welcome, {this.props.dbUser.first_name}!</h2>
            </>)
    }
            </>
      );
    }
}
