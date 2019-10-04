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
 * Description: Main File for Creating URLs & importing Moule
 * --------------------------------------------------------------------------------
 */

const express = require('express');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/v1/auth', require('../routes/auth'));
  app.use('/api/v1/programs', require('../routes/programs'));
  app.use('/api/v1/compression', require('../routes/compressions'));
  app.use(error);
};
