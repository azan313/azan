import test from 'node:test';
import assert from 'node:assert/strict';
import { toMinor,summarize } from '../src/services/accounting.js';
test('currency parsing uses exact minor units',()=>{assert.equal(toMinor('12.35'),1235);assert.equal(toMinor('0.10'),10);assert.equal(toMinor('25'),2500);});
test('reject invalid and nonpositive amounts',()=>{for(const value of ['-1','0','1.234','1e3','', 'Infinity']) assert.throws(()=>toMinor(value));});
test('operating difference includes all recorded expenses',()=>{assert.deepEqual(summarize({trips:[{amount:1010},{amount:2020}],expenses:[{amount:1030}]}),{revenue:3030,expenses:1030,margin:2000});assert.deepEqual(summarize({trips:[],expenses:[]}),{revenue:0,expenses:0,margin:0});});
