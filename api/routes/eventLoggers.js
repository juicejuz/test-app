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

const express = require('express');
const router = express.Router();

const { EventLogger } = require('../models/eventLoggger');

router.get('/', async (req, res) => {
  const eventLogger = await EventLogger.find().sort('timestamp');
  res.send(eventLogger);
});

module.exports = router;
