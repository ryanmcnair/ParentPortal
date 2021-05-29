import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/landing';

export default function Routes() {
  return (
        <Switch>
            <Route exact path='/' component={Landing}/>
        </Switch>
  );
}
