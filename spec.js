// Mocha Specification Cases

const assert =    require('assert');
const fetchJson = require('./browser-fetch-json.js');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Module browser-fetch-json', () => {

   it('loads as an object', () => {
      const actual =   typeof fetchJson;
      const expected = 'object';
      assert.equal(actual, expected);
      });

   it('has functions for get(), post(), put(), patch(), and delete()', () => {
      const actual =   {
         get:    typeof fetchJson.get,
         post:   typeof fetchJson.post,
         put:    typeof fetchJson.put,
         patch:  typeof fetchJson.patch,
         delete: typeof fetchJson.delete
         };
      const expected = {
         get:    'function',
         post:   'function',
         put:    'function',
         patch:  'function',
         delete: 'function'
         };
      assert.deepEqual(actual, expected);
      });

   });