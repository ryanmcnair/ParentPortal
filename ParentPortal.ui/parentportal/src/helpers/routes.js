/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/landing';
import Register from '../components/register';
import Announcements from '../views/announcements';
import Assignments from '../views/assignments';
import Messages from '../views/messages';
import Home from '../views/home';
import Profile from '../views/profile';
import Waiting from '../views/waiting';

export default function Routes({ user, dbUser }) {
  console.warn('routes dbUser', dbUser, 'routes user', user);
  return (
        <Switch>
          {/* {!user ? <Route exact path='/' component={(props) => <Landing user={user} {...props}/>}/> : <Route exact path='/' component={(props) => <Home user={user} dbUser={dbUser} {...props}/>}/>} */}
          {!user ? <Route exact path='/' component={(props) => <Landing user={user} {...props}/>}/>
            : !dbUser?.is_registered ? <Route exact path='/' component={(props) => <Waiting user={user} dbUser={dbUser} {...props}/>}/>
              : <Route exact path='/' component={(props) => <Home user={user} dbUser={dbUser} {...props}/>}/>}
            <Route exact path='/register' component={(props) => <Register user={user} {...props}/>}/>
            <Route exact path='/announcements' component={(props) => <Announcements user={user} dbUser={dbUser} {...props}/>}/>
            <Route exact path='/assignments' component={(props) => <Assignments user={user} dbUser={dbUser} {...props}/>}/>
            <Route exact path='/messages' component={(props) => <Messages user={user} {...props}/>}/>
            <Route exact path='/profile' component={(props) => <Profile user={user} dbUser={dbUser} {...props}/>}/>
        </Switch>
  );
}
