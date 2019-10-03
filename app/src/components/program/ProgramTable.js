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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../service/authService';

import Table from '../common/Table';

class PrgramTable extends Component {
  columns = [
    {
      path: 'name',
      label: 'Prgram Name',
      content: program => (
        <Link to={`/programs/${program._id}`}>{program.name}</Link>
      )
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: program => (
      <button
        onclick={() => this.props.onDelete(program)}
        className='btn btn-danger btn-sm'
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    // if (user && user.isAdmin) this.columns.push(this.deleteColumn); // role checking
    if (user) this.columns.push(this.deleteColumn);
  }

  render() {
    const { programs, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={programs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PrgramTable;
