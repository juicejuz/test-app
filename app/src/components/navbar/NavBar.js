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

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav class='navbar navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        D.A.V.E.-DB
      </Link>
      <div className='navbar-nav'>
        <ul className='navbar-nav mr-auto'>
          {user && (
            <NavLink className='nav-item nav-link' to='/programs'>
              Programs
            </NavLink>
          )}
          {user && (
            <React.Fragment>
              <NavLink className='nav-item nav-link' to='/'>
                Hello {user.name}
              </NavLink>
              <NavLink className='nav-item nav-link' to='/logout'>
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
