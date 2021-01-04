import input from './input';

import { isValidInputs, computeInputsTwo } from './';

function solution(_inputArr = input.split('\n')){
    // Validation
    try {
        let inputArr = typeof _inputArr === 'object'? _inputArr: _inputArr.split('\n');
        if (isValidInputs(inputArr)){
            const total = inputArr.reduce((total, currentInput) => total += computeInputsTwo(currentInput),0);
            console.log('Part two: ', total);
            return total;
        } else {
            return `Mass cannot be a string or negative`;
        }
    } catch(e){
        console.log('error', e);
        return 'An error occured in the input';
    }
}


export default solution;