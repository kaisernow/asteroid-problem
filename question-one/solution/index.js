import solutionOne from './part-one';
import solutionTwo from './part-two';

const _int = input => parseInt(input, 10);
const isNumberAfterParse = input => typeof _int(input) === 'number';
const isPositive = input => input >= 0;
const isValidInputs = inputArr => inputArr.every(input => isNumberAfterParse(input) && isPositive(input));
const divideByThree = input => input/3;
const roundDown = input => Math.floor(input);
const subtractByTwo = input => input - 2;

const computeInputs = input => subtractByTwo(roundDown(divideByThree(_int(input))));

function computeInputsTwo (input, total = 0){
    let currentInput = computeInputs(input);
    if (currentInput <= 0){
        return total;
    }
    let _total = total === 0? currentInput: total + currentInput;
    return computeInputsTwo(currentInput, _total);
}

solutionOne();
solutionTwo();

export {
    _int,
    divideByThree,
    roundDown,
    subtractByTwo,
    computeInputs,
    computeInputsTwo,
    isValidInputs
};
