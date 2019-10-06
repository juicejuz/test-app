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
const validateObjectId = require('../middleware/validateObjectId');

const { Compression, validate } = require('../models/compression');

router.get('/', async (req, res) => {
  const compressions = await Compression.find().sort('name');

  res.send(compressions);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const compression = await Compression.findById(req.params.id);

  if (!compression) return res.status(404).send('Compression does not exist');

  res.send(compression);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let compression = new Compression({
    block: req.body.block,
    location: req.body.location,
    submatrix: req.body.submatrix
  });
  compression = await compression.save();

  res.send(compression);
});

router.put('/:id', validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const conpressionFields = {};
  if (req.body.block) conpressionFields.block = req.body.block;
  if (req.body.location) conpressionFields.location = req.body.location;
  if (req.body.submatrix) conpressionFields.submatrix = req.body.submatrix;

  const compression = await Compression.findByIdAndUpdate(
    req.body.id,
    { compressionFields },
    { new: true }
  );

  if (!compression) return res.status(404).send('Compression does not exist');

  res.send(compression);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const compression = await Compression.findByIdAndRemove(req.params.id);

  if (!compression) return res.status(404).send('Compressino does not exists');

  res.send(compression);
});

module.exports = router;
