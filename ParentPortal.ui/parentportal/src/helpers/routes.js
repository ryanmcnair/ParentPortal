/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/landing';
import Register from '../components/register';
import Announcements from '../views/announcements';
import Assignments from '../views/assignments';
import Messages from '../views/messages';

export default function Routes({ user }) {
  return (
        <Switch>
            <Route exact path='/' component={(props) => <Landing user={user} {...props}/>}/>
            <Route exact path='/register' component={(props) => <Register user={user} {...props}/>}/>
            <Route exact path='/announcements' component={(props) => <Announcements user={user} {...props}/>}/>
            <Route exact path='/assignments' component={(props) => <Assignments user={user} {...props}/>}/>
            <Route exact path='/messages' component={(props) => <Messages user={user} {...props}/>}/>
        </Switch>
  );
}
