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

import http from './httpService';
import { apiUrlV1 } from './config.json';

const apiEndpoint = apiUrlV1 + '/programs';

function programUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPrograms() {
  return http.get(apiEndpoint);
}

export function getProgram(programId) {
  return http.get(programUrl(programId));
}

export function saveProgram(program) {
  if (program._id) {
    const body = { ...program };
    delete body._id;
    return http.put(programUrl(program._id), body);
  }

  return http.post(apiEndpoint, program);
}

export function deleteProgram(programId) {
  return http.delete(programUrl(programId));
}
