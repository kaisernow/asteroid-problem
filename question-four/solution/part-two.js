import { start, end } from './input';
import { checksForDouble, checksIfNotIncremental, createConsecutiveNumberMap, checksIfNumberMapContainsDouble } from './';

function solution(){
    let validEntries = [];

    for(let i = start; i <= end; i++){
        if (checksForDouble(i) && !checksIfNotIncremental(i) && checksIfNumberMapContainsDouble(createConsecutiveNumberMap(i))){
            validEntries.push(i);
        }
    }
    
    console.log(validEntries.length);
    return validEntries.length;
}

export default solution;


