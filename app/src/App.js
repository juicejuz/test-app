/*
 * Copyright 2019 OpenAdvice & Vodafone SM-4.0 TV
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import auth from './service/authService';

import NavBar from './components/navbar/NavBar';
import LoginForm from './components/auth/LoginForm';
import Logout from './components/auth/Logout';
import Programs from './components/program/Programs';
import ProgramForm from './components/program/ProgramForm';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            {/* <ProtectedRoute exact path='/programs' component={Programs} /> */}
            <ProtectedRoute
              path='/programs'
              render={props => <Programs {...props} user={this.state.user} />}
            />
            <Route exact path='/login' component={LoginForm} />
            <ProtectedRoute path='/logout' component={Logout} />
            <ProtectedRoute
              exact
              path='/add_program/'
              component={ProgramForm}
            />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/login' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
