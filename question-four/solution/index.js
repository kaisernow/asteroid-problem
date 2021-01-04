import solutionOne from './part-one';
import solutionTwo from './part-two';

const _int = input => parseInt(input, 10);
const checksForDouble = number => number.toString().split('')
                                    .some((num, i, numArr) => i !== numArr.length - 1? _int(numArr[i + 1]) === _int(num) : false);

const incremental = (num, i, numArr) => i !== numArr.length - 1? !(_int(numArr[i + 1]) >= _int(num)) : false;

const checksIfNotIncremental = number => number.toString().split('').some((num, i, numArr) => incremental(num, i, numArr) );   

const getNumberMap = number => {
    let numberMap = {};

    number.toString().split('').forEach((num, i, numArr) => {
        if (numArr[i+1] === num && !numberMap[num]){
            numberMap[num] = 2;
        } else if (numArr[i+1] === num && numberMap[num]) {
            numberMap[num]++;
        }
    });
    return numberMap;
} 

const createConsecutiveNumberMap = number => {
    const numArrMap = [];
    let currentNumber;
    let count = 0;
    number.toString().split('').forEach((num, i, numArr) => {
      if (!currentNumber){
        currentNumber = num;
        count = 1;
      } else if (num === currentNumber){
        count += 1;
      } else if (num !== currentNumber) {
        count = 1;
        currentNumber = num;
      } 
  
      if (numArr[i+1] !== num && count > 1){
        numArrMap.push({ [currentNumber]: count });
      }
    });
    return numArrMap;
}
  
const isDouble = number => number === 2;
const checksIfNumberMapContainsDouble = numberMapArr => numberMapArr.some(numMap => isDouble(numMap[Object.keys(numMap)[0]]));

solutionOne();
solutionTwo();

export {
    checksForDouble,
    checksIfNotIncremental,
    getNumberMap,
    checksIfNumberMapContainsDouble,
    createConsecutiveNumberMap
}



