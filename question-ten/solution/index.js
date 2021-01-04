const { getInput } = require('./input');
import { computeMap } from './helpers';

const theMap = getInput('sampleInputTwo');

console.clear();
const log = (...value) => console.log(...value);


// log(getCloseAsteriods(getEachPixelInMap(theMap), getMapWidth(theMap), {x:1, y:0}));
computeMap(theMap);


// pseudocode
// Get the close guys
// For the main guys 
    // if there is no main guy
        // find the main guy by going in that specific direction
            // then other main guys behind the main guy are cancelled
// For side guys
// if there is no side guy
    // find the side guy by going upwards or downwards depending on the orientation
        // then record the steps it took you to get to the side guy
            // then other side guys that follow that trend of steps are cancelled

// the guys that are left are the asteriod it can see


