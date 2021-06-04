/* eslint-disable react/prop-types */
import React from 'react';
// import { Link } from 'react-router-dom';
import AnnouncementCard from '../components/announcementCard';
import announcementData from '../helpers/data/announcementData';
import Modal from '../components/modal';
import AnnouncementForm from './announcementForm';

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

    removeAnnouncements = (id) => {
      announcementData.deleteAnnouncement(id).then(() => {
        this.getAllAnnouncements();
        this.getParentAnnouncements();
      });
    }

    updateAnnouncements = (update) => {
      announcementData.updateAnnouncement(update).then(() => {
        this.getAllAnnouncements();
        this.getParentAnnouncements();
      });
    }

    addAnnouncement = (theThing) => {
      announcementData.addAnnouncement(theThing).then(() => {
        this.getAllAnnouncements();
        this.getParentAnnouncements();
      });
    }

    render() {
      let announcementRender;
      let buttonRender;
      const { announcements, parentsOnly, dbUser } = this.state;
      const renderAllAnnouncements = () => announcements.map((announcement) => (<AnnouncementCard key={announcement.id} announcement={announcement} dbUser={dbUser} deleteThis={this.removeAnnouncements} updateThis={this.updateAnnouncements}/>));
      const renderParentAnnouncements = () => parentsOnly.map((announcement) => (<AnnouncementCard key={announcement.id} announcement={announcement} dbUser={dbUser} deleteThis={this.removeAnnouncements} updateThis={this.updateAnnouncements}/>));
      if (dbUser.is_parent === true) {
        announcementRender = renderParentAnnouncements();
      } else {
        announcementRender = renderAllAnnouncements();
      }
      if (dbUser.is_admin === true) {
        buttonRender = (<Modal title={'Add Announcement'} buttonLabel={'Add Announcement'}>
        {<AnnouncementForm dbUser={dbUser} addThis={this.addAnnouncement}/>}
      </Modal>);
      } else {
        buttonRender = (<div></div>);
      }
      return (
            <>
            <div className='announcementcards'>
              <h1>Announcements</h1>
              <div className='rendercards'>
                {buttonRender}
                {announcementRender}
              </div>
            </div>
            </>
      );
    }
}
