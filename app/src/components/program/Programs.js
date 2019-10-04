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

/*
 * --------------------------------------------------------------------------------
 * Description:
 * --------------------------------------------------------------------------------
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import ProgramTable from './ProgramTable';
import Pagination from '../common/Pagination';
import { getPrograms, deleteProgram } from '../../service/programService';
import { paginate } from '../../utils/paginate';
import SearchBox from '../common/SearchBox';

class Programs extends Component {
  state = {
    programs: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: { path: 'name', order: 'asc' }
  };

  async componentDidMount() {
    const { data: programs } = await getPrograms();
    this.setState({ programs });
  }

  handleDelete = async program => {
    const originalPrograms = this.state.programs;
    const programs = originalPrograms.filter(p => p._id !== program._id);
    this.setState({ programs });
    toast.success('Program deleted');

    try {
      await deleteProgram(program._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log('x');
      toast.error('Program already been deleted.');

      this.setState({ programs: originalPrograms });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      programs: allPrograms
    } = this.state;

    let filtered = allPrograms;
    if (searchQuery)
      filtered = allPrograms.filter(p =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const programs = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: programs };
  };

  render() {
    const { length: count } = this.state.programs;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>No data available</p>;

    const { totalCount, data: programs } = this.getPagedData();
    return (
      <div className='row'>
        <div className='col'>
          {user && (
            <Link
              to='/add_program'
              className='btn btn-primary'
              style={{ marginBottom: 20 }}
            >
              New Program
            </Link>
          )}
          <p>Showing {totalCount} Programs</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ProgramTable
            programs={programs}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Programs;
