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
 * Description: Model definition for Programs
 *              Including Validation Funktion (Joi)
 * --------------------------------------------------------------------------------
 */

const mongoose = require('mongoose');
const Joi = require('joi');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  }
});

const Program = mongoose.model('Program', programSchema);

function validateProgram(program) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
  };
  return Joi.validate(program, schema);
}
exports.validate = validateProgram;

exports.programSchema = programSchema;
exports.Program = Program;
