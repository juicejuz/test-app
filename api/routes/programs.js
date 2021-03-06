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
 * Description: CRUD Module for Programs
 *              data only accassable via ReST-API
 *        TODO: ADD Logging IMPORTANT!!
 * --------------------------------------------------------------------------------
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const validateObjectId = require('../middleware/validateObjectId');

const { Program, validate } = require('../models/program');

const auth = require('../middleware/auth');

const eventLogger = require('../startup/eventLogger');

router.get('/', auth, async (req, res) => {
  const programs = await Program.find().sort('name');

  res.send(programs);
});

router.get('/:id', auth, validateObjectId, async (req, res) => {
  const program = await Program.findById(req.params.id);

  if (!program) return res.status(404).send('Program not exist');

  res.send(program);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let program = new Program({ name: req.body.name });
  program = await program.save();

  res.send(program);
});

router.put('/:id', auth, validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const program = await Program.findByIdAndUpdate(
    req.body.id,
    { name: req.body.name },
    { new: true }
  );

  if (!program) return res.status(404).send('Program not exist');

  const decoded = jwt.verify(
    req.header('x-auth-token'),
    process.env.JWT_PRIVATE_KEY || config.get('jwtPrivateKey')
  );

  /******* Event Logging System *******/
  // TODO: MAKE SERVICE OUT OF DECODE
  eventLogger.info(
    `${program.name}, ${req.method}, ${req.baseUrl}, ${decoded.name}, ${req.headers.origin}, ${program}`
  );
  /************************/

  res.send(program);
});

router.delete('/:id', auth, validateObjectId, async (req, res) => {
  const program = await Program.findByIdAndRemove(req.params.id);

  if (!program) return res.status(404).send('Program not exists');

  /******* Event Logging System *******/
  // TODO: MAKE SERVICE OUT OF DECODE
  const decoded = jwt.verify(
    req.header('x-auth-token'),
    process.env.JWT_PRIVATE_KEY || config.get('jwtPrivateKey')
  );
  eventLogger.info(
    `${program.name}, ${req.method}, ${req.baseUrl}, ${decoded.name}, ${req.headers.origin}, ${program}`
  );
  /************************/

  res.send(program);
});

module.exports = router;
