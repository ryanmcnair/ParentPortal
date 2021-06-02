/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementCard from '../components/announcementCard';
import announcementData from '../helpers/data/announcementData';

export default class Announcements extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      announcements: [],
      parentsOnly: []
    };

    componentDidMount() {
      this.getAllAnnouncements();
      this.getParentAnnouncements();
    }

    getAllAnnouncements = () => {
      announcementData.getAllAnnouncements().then((response) => {
        this.setState({
          announcements: response
        });
      });
    }

    getParentAnnouncements = () => {
      announcementData.getParentAnnouncements().then((response) => {
        this.setState({
          parentsOnly: response
        });
      });
    }

    render() {
      let announcementRender;
      let buttonRender;
      const { announcements, parentsOnly, dbUser } = this.state;
      const renderAllAnnouncements = () => announcements.map((announcement) => (<AnnouncementCard key={announcement.id} announcement={announcement} />));
      const renderParentAnnouncements = () => parentsOnly.map((announcement) => (<AnnouncementCard key={announcement.id} announcement={announcement} />));
      if (dbUser.is_parent === true) {
        announcementRender = renderParentAnnouncements();
      } else {
        announcementRender = renderAllAnnouncements();
      }
      if (dbUser.is_admin === true) {
        buttonRender = (<Link className='btn btn-primary m-2' to='/announcementform'>Add New Announcement</Link>);
      } else {
        buttonRender = (<div></div>);
      }
      return (
            <>
            <h1>Announcements Page</h1>
            {buttonRender}
            {announcementRender}
            </>
      );
    }
}
