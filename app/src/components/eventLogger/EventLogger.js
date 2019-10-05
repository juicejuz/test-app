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
import _ from 'lodash';
import EventLoggerTable from './EventLoggerTable';
import Pagination from '../common/Pagination';
import { getEventLogger } from '../../service/eventLoggerService';
import { paginate } from '../../utils/paginate';
import SearchBox from '../common/SearchBox';

class EventLogger extends Component {
  state = {
    eventLogger: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    sortColumn: {
      path: 'message',
      order: 'asc',
      path: 'timestamp',
      order: 'asc'
    }
  };

  async componentDidMount() {
    const { data: eventLogger } = await getEventLogger();
    this.setState({ eventLogger });
  }

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
      eventLogger: allEventLogger
    } = this.state;

    let filtered = allEventLogger;
    if (searchQuery)
      filtered = allEventLogger.filter(l =>
        l.message.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const eventLogger = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: eventLogger };
  };

  render() {
    const { length: count } = this.state.eventLogger;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>No data available</p>;

    const { totalCount, data: eventLogger } = this.getPagedData();
    return (
      <div className='row'>
        <div className='col'>
          <p>Showing {totalCount} EventLogs</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <EventLoggerTable
            eventLogger={eventLogger}
            sortColumn={sortColumn}
            // onDelete={this.handleDelete}
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

export default EventLogger;
