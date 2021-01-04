import {
    _int,
    divideByThree,
    roundDown,
    subtractByTwo,
    computeInputs,
    computeInputsTwo,
} from './../solution';

import {
    inputWithMixedStrings,
    inputWithMixedStringsTwo,
    inputWithValidInputs
} from './mocks'

import solutionOne from './../solution/part-one';

beforeEach(() => {
    jest.spyOn(console, 'log');
});

afterEach(() => {
    console.log.mockRestore();
});

// testing integer conversion
test('_int is a function', () => {
    expect(typeof _int).toEqual('function');
});

test('int conversion returns a number', () => {
    expect(typeof _int('  3')).toEqual('number');
    expect(_int('  3  ')).toEqual(3)
});

// testing division by 3
test('divideByThree is a function', () => {
    expect(typeof divideByThree).toEqual('function');
});

test('divideByThree returns divided value', () => {
    expect(divideByThree(9)).toEqual(3);
});


// roundDown
test('roundDown is a function', () => {
    expect(typeof roundDown).toEqual('function');
});

test('roundDown returns a rounded figure', () => {
    expect(roundDown(3.66)).toEqual(3);
    expect(roundDown(3.9)).toEqual(3);
    expect(roundDown(3.45)).toEqual(3);
    expect(roundDown(3.2)).toEqual(3);
});

// subtract by two
test('subtractByTwo is a function', () => {
    expect(typeof subtractByTwo).toEqual('function');
});

test('subtractByTwo returns the correct value', () => {
    expect(subtractByTwo(4)).toEqual(2);
    expect(subtractByTwo(1997)).toEqual(1995);
    expect(subtractByTwo(320023.232)).toEqual(320021.232);
});


//compute inputs
test('computeInputs is a function', () => {
    expect(typeof computeInputs).toEqual('function');
});

test('computeInputs returns correct value', () => {
    expect(computeInputs(9)).toEqual(1);
    expect(computeInputs(27)).toEqual(7);
    expect(computeInputs(14)).toEqual(2);
});

//compute inputs
test('computeInputsTwo is a function', () => {
    expect(typeof computeInputsTwo).toEqual('function');
});

test('computeInputsTwo returns correct value', () => {
    expect(computeInputsTwo(9)).toEqual(1);
    expect(computeInputsTwo(14)).toEqual(2);
    expect(computeInputsTwo(1969)).toEqual(966);
    expect(computeInputsTwo(100756)).toEqual(50346);
});


//solution
test('solution one is a function', () => {
    expect(typeof solutionOne).toEqual('function');
});

test('functionalities of solution one', () => {
    expect(solutionOne(inputWithMixedStrings)).toEqual('Mass cannot be a string or negative');
    expect(solutionOne(inputWithMixedStringsTwo)).toEqual('Mass cannot be a string or negative');
    expect(solutionOne(inputWithValidInputs)).toEqual(3.333333333333333e+23)
});


