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
 * Description: Logging Module used for the follow logRules:
 *              - any Exception (<= 400) log to DB & Console
 *              - any UncaughtException (<= 500) log to Console
 * --------------------------------------------------------------------------------
 */

const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  winston.exceptions.handle(new winston.transports.Console({}));

  process.on('unhandledRejection', ex => {
    throw ex;
  });

  winston.add(new winston.transports.Console({}));

  winston.add(
    new winston.transports.MongoDB({
      db: process.env.DATABASE || config.get('db'),
      collection: 'logging',
      storeHost: true,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    })
  );
};
