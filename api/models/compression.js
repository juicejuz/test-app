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
 * Description: TODO
 * --------------------------------------------------------------------------------
 */

const mongoose = require('mongoose');
const Joi = require('joi');

const submatrixSchema = new mongoose.Schema({
  port: {
    type: String,
    required: true,
    inlength: 1,
    maxlength: 20
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'programSchema',
    required: true
  }
});

const compressionSchema = new mongoose.Schema({
  block: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
    unique: true
  },
  locations: [String],
  submatrix: [submatrixSchema]
});

const Compression = mongoose.model('Compression', compressionSchema);

function validateCompression(service) {
  const submatrixSchema = {
    port: Joi.string()
      .min(1)
      .max(20)
      .required(),
    service: Joi.ref().required()
  };

  const compressionSchema = {
    block: Joi.string()
      .min(1)
      .max(1)
      .required(),
    locations: Joi.array()
      .required()
      .min(1),
    submatrix: Joi.object(submatrixSchema).required()
  };
  return Joi.validate(Compression, compressionSchema);
}
exports.validate = validateCompression;

exports.compressionSchema = compressionSchema;
exports.Compression = Compression;
