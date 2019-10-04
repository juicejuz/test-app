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
 * Description: TODO: Modernyze to Async TryCatch
 * --------------------------------------------------------------------------------
 */

const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  const db = process.env.DATABASE || config.get('db');
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    // winston.info(`Connected to ${db}...`);
    winston.info('Connected to db...');
  } catch (err) {
    winston.error(err.message);
    process.exit(1);
  }
};
