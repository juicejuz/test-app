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
import Joi from 'joi-browser';
import Form from '../common/Form';

import { getProgram, saveProgram } from '../../service/programService';

class ProgramForm extends Form {
  state = {
    data: {
      name: ''
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label('Name')
  };

  async populateProgram() {
    try {
      const programId = this.props.params.id;
      if (programId === 'new') return;

      const { data: program } = await getProgram(programId);
      this.setState({ data: this.mapToViewModel(program) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('not-found');
    }
  }

  async componentDidMount() {
    await this.populateProgram();
  }

  mapToProgramView(program) {
    return {
      _id: program._id,
      name: program.name
    };
  }

  doSubmit = async () => {
    await saveProgram(this.state.data);

    this.props.history.push('/program');
  };

  render() {
    return (
      <div>
        <h1>Add Program</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default ProgramForm;
