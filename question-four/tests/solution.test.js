
import { checksForDouble, checksIfNotIncremental, checksIfNumberMapContainsDouble, createConsecutiveNumberMap } from './../solution';

beforeEach(() => {
  jest.spyOn(console, 'log');
});

afterEach(() => {
  console.log.mockRestore();
});

// testing ChecksForDouble
test('checksForDouble is a function', () => {
  expect(typeof checksForDouble).toEqual('function');
});

test('checksForDouble returns a false if no double', () => {
  expect(checksForDouble(32903923)).toEqual(false);
  expect(checksForDouble(232342)).toEqual(false);
  expect(checksForDouble(20104)).toEqual(false);
});

test('checksForDouble returns a true if there are doubles', () => {
  expect(checksForDouble(4349999)).toEqual(true);
  expect(checksForDouble(4344923)).toEqual(true);
  expect(checksForDouble(3233400)).toEqual(true);
});

// testing checksIfIncremental
test('checkIfNotIncremental is a function', () => {
  expect(typeof checksIfNotIncremental).toEqual('function');
});

test('checkIfNotIncremental returns true for numbers that are not incremental', () => {
  expect(checksIfNotIncremental(443392)).toEqual(true);
  expect(checksIfNotIncremental(554391)).toEqual(true);
  expect(checksIfNotIncremental(434902)).toEqual(true);
  expect(checksIfNotIncremental(322134)).toEqual(true);
  expect(checksIfNotIncremental(32230221)).toEqual(true);
});


test('checkIfNotIncremental returns false for numbers that are incremental', () => {
  expect(checksIfNotIncremental(12345)).toEqual(false);
  expect(checksIfNotIncremental(23789)).toEqual(false);
  expect(checksIfNotIncremental(2389)).toEqual(false);
  expect(checksIfNotIncremental(12568)).toEqual(false);
  expect(checksIfNotIncremental(4689)).toEqual(false);
});


// testing createConsecutiveNumberMap
test('createConsecutiveNumberMap is a function', () => {
  expect(typeof createConsecutiveNumberMap).toEqual('function');
});

test('createConsecutiveNumberMap returns object for consecutive repeated numbers', () => {
  expect(createConsecutiveNumberMap(443392)).toEqual([{'4': 2}, {'3': 2}]);
  expect(createConsecutiveNumberMap(554391)).toEqual([{'5': 2}]);
  expect(createConsecutiveNumberMap(434902)).toEqual([]);
  expect(createConsecutiveNumberMap(322213443223)).toEqual([{'2': 3}, {'4': 2}, {'2': 2}]);
});

// testing checkIfNumberContainsDouble
test('checksIfNumberMapContainsDouble is a function', () => {
  expect(typeof checksIfNumberMapContainsDouble).toEqual('function');
});

test('checkIfNumberContainsDouble returns object for consecutive repeated numbers', () => {
  expect(checksIfNumberMapContainsDouble(createConsecutiveNumberMap(443392))).toEqual(true);
  expect(checksIfNumberMapContainsDouble(createConsecutiveNumberMap(554391))).toEqual(true);
  expect(checksIfNumberMapContainsDouble(createConsecutiveNumberMap(434902))).toEqual(false);
  expect(checksIfNumberMapContainsDouble(createConsecutiveNumberMap(32221343222223))).toEqual(false);
});



