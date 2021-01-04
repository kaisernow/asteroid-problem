const log = (...value) => console.log(...value);

export const getMapWidth = map => map[0].length;

export const getEachPixelInMap = _map => _map.map(
    (eachPixelArr, i) => 
      eachPixelArr.map(
        (eachPixel, j) => ({ pixel: eachPixel, location: { x: j, y: i } })
      )
  ).flat()


export const getNextLeftLocation = location => ({ ...location, x: location.x - 1});

export const getNextRightLocation = location => ({ ...location, x: location.x + 1 });

export const getNextUpLocation = location => ({ ...location, y: location.y - 1 });

export const getNextDownLocation = location => ({ ...location, y: location.y + 1 });

export const getNextDiagonalUpLeft = location => ({
  ...location,
  x: location.x - 1,
  y: location.y - 1
});

export const getNextDiagonalUpRight = location => ({
    ...location,
  x: location.x + 1,
  y: location.y - 1
})

export const getNextDiagonalDownLeft = location => ({
  ...location,
  x: location.x - 1,
  y: location.y + 1
});

export const getNextDiagonalDownRight = location => ({
    ...location,
  x: location.x + 1,
  y: location.y + 1
});


export const composeNeighbourLocations = (location, width=0) => ([
  getNextLeftLocation(location),
  getNextRightLocation(location),
  getNextUpLocation(location),
  getNextDownLocation(location),
  getNextDiagonalUpLeft(location),
  getNextDiagonalUpRight(location),
  getNextDiagonalDownLeft(location),
  getNextDiagonalDownRight(location)
].filter( l => (l.x >= 0 && l.y >= 0 && l.x < width && l.y < width)
  ).flat());

export const getLocationsBasedOnYLevel = (yLevel, width=0, locations = []) => {
  if (width === 0){
    return locations
  }

  else if (locations.length === 0){
    return getLocationsBasedOnYLevel(yLevel,  width - 1, [{ x: 0, y: yLevel }]);
  } 

  return getLocationsBasedOnYLevel(yLevel,  width - 1, [...locations, { x: locations[locations.length - 1].x + 1, y: yLevel }]);
}

export const composeDiagonalLocations = (location, width=0) => ([
    getNextDiagonalUpLeft(location),
    getNextDiagonalUpRight(location),
    getNextDiagonalDownLeft(location),
    getNextDiagonalDownRight(location)
  ].filter( l => (l.x >= 0 && l.y >= 0 && l.x < width && l.y < width)
    ).flat());


export const getNextOtherLocations = (location, width) => {
  const up = location.y - 1;
  const down = location.y + 1;

  // generate all the possible locations in up and down
  return(
    [
      getLocationsBasedOnYLevel(up, width)
      .filter(
        l => Math.abs(l.x - location.x) > 1
      ).filter( 
          l => (l.x >= 0 && l.y >= 0 && l.x < width && l.y < width
          )
        )
        , 
      getLocationsBasedOnYLevel(down, width)
      .filter(l => Math.abs(l.x - location.x) > 1).filter( l => (l.x >= 0 && l.y >= 0 && l.x < width && l.y < width)
      )
    ].flat()
  )
} 

export const getCloseAsteriods = (pixelMap, width, _location) => {
  const filteredPixel = pixelMap.filter(({pixel, location: {x, y}}) => pixel !== '.' && _location.x === x && _location.y === y);

  log('Filtered asteriods', filteredPixel);

  // log(getCloseLocations(filteredPixel, width)[9]);
    return getCloseLocations(filteredPixel, width).map(pixel => {
      const closeAsteriods = [...pixel.nl].reduce((acc, {x,y}, i) => {
            const asteriod = filteredPixel.filter(({location}) => location.x === x && location.y === y)[0]
            if(asteriod){
              return [...acc, asteriod];
            }
            return acc;
      }, []);

      return ({
        ...pixel,
        closeAsteriods,
      })
    })
}

export const getNeighBourLocationsOfEachAsteriods = (pixelMap, width) => pixelMap.map(asteriod => ({
  ...asteriod, 
  nl: composeNeighbourLocations(asteriod.location, width) 
  })
)

export const getCloseLocations = (_map, width) => getNeighBourLocationsOfEachAsteriods(_map, width).map(ast => ({ ...ast, nl: [...ast.nl, ...getNextOtherLocations(ast.location, width)]}));

export const inBound = (location, width) => location.x >= 0 && location.y >= 0 && location.x < width && location.y < width;

export const mainDirections = ["left", "right", "up", "down"];

export const diagonalDirections = ["up-left", "up-right", "down-left", "down-right"];

export const getNextLocation = (direction, location) => {
    switch(direction){
        case "left": {
            return getNextLeftLocation(location);
        }
        case "right": {
            return getNextRightLocation(location)
        }
        case "up": {
            return getNextUpLocation(location)
        }
        case "down": {
            return getNextDownLocation(location)
        }
        case "up-left": {
            return getNextDiagonalUpLeft(location);
        }
        case "up-right": {
            return getNextDiagonalUpRight(location);
        }
        case "down-left": {
            return getNextDiagonalDownLeft(location);
        }
        case "down-right": {
            return getNextDiagonalDownRight(location);
        }
        default: 
            return getNextLeftLocation(location)
    }
}

export const goADirectionTillAsteriod = (mapPixelWithAst, locationOfCurrentAst, direction="left", width=0, counter=0, asteriod=[], steps=0) => {
    if (asteriod.length === 1 || counter === width){
        return { ast: asteriod, steps }
    }

    const nextDirection = getNextLocation(direction, locationOfCurrentAst);
    
    if (!inBound(nextDirection, width)){
        return goADirectionTillAsteriod(mapPixelWithAst, locationOfCurrentAst, direction, width, width, asteriod, steps)
    } 
    const _asteriod = mapPixelWithAst.filter(({ location: { x, y }}) => x === nextDirection.x && y === nextDirection.y)[0];
    // log('asteriod', _asteriod)
    if (_asteriod){
        return goADirectionTillAsteriod(mapPixelWithAst, nextDirection, direction, width, counter, [_asteriod], steps+1);
    } 
    return goADirectionTillAsteriod(mapPixelWithAst, nextDirection, direction, width, counter, asteriod, steps+1);
}

export const goADirectionTillAsteriodForOthers = (mapPixelWithAst, locationOfCurrentAst, direction="left", width=0, from, counter=0, asteriod=[], pattern={x:0,y:0}) => {
    if (asteriod.length === 1 || counter === width){
        return ({ _asteriod: asteriod, pattern});
    }

    const nextDirection = getNextLocation(direction, locationOfCurrentAst);
    
    if (!inBound(nextDirection, width)){
        return goADirectionTillAsteriodForOthers(mapPixelWithAst, locationOfCurrentAst, direction, width, from, width, asteriod, pattern)
    } 
    const _asteriod = mapPixelWithAst.filter(({ location: { x, y }}) => x === nextDirection.x && y === nextDirection.y)[0];
    if (_asteriod){
        const newPattern = { x: _asteriod.location.x - from.x, y: _asteriod.location.y - from.y };

        return goADirectionTillAsteriodForOthers(mapPixelWithAst, nextDirection, direction, width, from, counter, [_asteriod], newPattern);
    } 
    return goADirectionTillAsteriodForOthers(mapPixelWithAst, nextDirection, direction, width, from, counter, asteriod, pattern);
}


const goADirectionTillBlockeds = (mapPixelWithAst, locationOfCurrentAst, direction="left", width=0, counter=0, blockeds=[]) => {
    if (counter === width){
        return blockeds;
    }

    const nextDirection = getNextLocation(direction, locationOfCurrentAst);

    if (!inBound(nextDirection, width)){
        return goADirectionTillBlockeds(mapPixelWithAst, locationOfCurrentAst, direction, width, width, blockeds)
    } 
    const _asteriod = mapPixelWithAst.filter(({ location: { x, y }}) => x === nextDirection.x && y === nextDirection.y)[0];

    if (_asteriod){
        // log('blockeds', _asteriod)
        return goADirectionTillBlockeds(mapPixelWithAst, nextDirection, direction, width, counter, [...blockeds, _asteriod]);
    } 
    return goADirectionTillBlockeds(mapPixelWithAst, nextDirection, direction, width, counter, blockeds);
}

export const getNextPatternLocation = (location, pattern) => {
    return { x: location.x + pattern.x, y: location.y + pattern.y };
}

export const getAllBlockedsBasedOnPattern = (mapPixelWithAst, locationOfCurrentAst, pattern={x:0,y:0}, width=0, counter=0, blockeds=[]) => {
    if (counter === width){
        return blockeds;
    }

    const nextDirection = getNextPatternLocation(locationOfCurrentAst, pattern);

    if (!inBound(nextDirection, width)){
        return getAllBlockedsBasedOnPattern(mapPixelWithAst, locationOfCurrentAst, pattern, width, width, blockeds)
    } 

    const _asteriod = mapPixelWithAst.filter(({ location: { x, y }}) => x === nextDirection.x && y === nextDirection.y)[0];

    if (_asteriod) {
        return getAllBlockedsBasedOnPattern(mapPixelWithAst, nextDirection, pattern, width, counter, [...blockeds, _asteriod]);
    }

    return getAllBlockedsBasedOnPattern(mapPixelWithAst, nextDirection, pattern, width, counter, blockeds);


}

export const determineIfUpOrDown = (from, to) => from.y <= to.y? "down": "up";

    // For mainDirections
    // go till you see an asteriod
    // record all blockeds

    // for diagonal directions
    // go till you see an asteriod
    // record all blockeds
    // if it took more than a step
    // find an asteriod up or down from the initial diagonal spot
    // record the pattern it took to get there
    // use that pattern to get blockeds

    // for other directions
    // if it doesn't exist in that neighbour spot, go up or down till you get an asteriod.
    // then get the pattern for that asteriod
    // then find all blockers based on that pattern

    // the asteriods it can see is the total asteriods in the map - the blocked

export const getPattern = (from, to) => ({
    x: to.x - from.x,
    y: to.y - from.y
})

export const computeMap = _map => {
    const mapPixelWithAst = getEachPixelInMap(_map).filter(p => p.pixel !== '.');
    const width = getMapWidth(_map);

    const newMap = mapPixelWithAst.map((asteriod, i) => {
        const neighbors = [];
        let blockeds = [];
        let total;

            // main
            mainDirections.forEach(direction => { 
                let {ast, steps} = goADirectionTillAsteriod(mapPixelWithAst, asteriod.location, direction, width);

                ast = ast[0];
                // log('main direction', ast,'steps', steps);
                if (ast){
                    // const blocks =  getAllBlockedsBasedOnPattern(mapPixelWithAst, ast.location, getPattern(asteriod.location, ast.location), width);
                    const blocks = goADirectionTillBlockeds(mapPixelWithAst, ast.location, direction, width);
                    neighbors.push(ast);
                    if (blocks.length > 0){
                        log(); log();
                        log('blocks ', blocks)
                        blockeds = [...blockeds, ...blocks]
                    }
                }
                log();
                log();
                log();
                
            });

            // diagonal
            diagonalDirections.forEach(direction => {
                let {ast, steps} = goADirectionTillAsteriod(mapPixelWithAst, asteriod.location, direction, width);

                ast = ast[0];
                // log('diagonal direction', ast,'steps', steps);
                if (ast){
                    log();log();
                    const blocks = goADirectionTillBlockeds(mapPixelWithAst, ast.location, direction, width);

                    neighbors.push(ast);
                    if (blocks.length > 0){
                        blockeds = [...blockeds, ...blocks];
                    }
                }

                log();
                log();

                if (steps > 1 || (!ast && steps === 1)) {
                    const orientation = determineIfUpOrDown(asteriod.location, getNextLocation(direction, asteriod.location));

                    const { _asteriod, pattern } = goADirectionTillAsteriodForOthers(mapPixelWithAst, getNextLocation(direction, asteriod.location), orientation, width, asteriod.location);

                    // log('non immediate diagonals', _asteriod, 'pattern', pattern);
                    if (_asteriod[0]){
                        neighbors.push({ ..._asteriod[0], pattern });
                    }
                }
                log();
                log();
                log();
                // if steps is > 1 analyze for the other location of this diagonal direction
            });

            // other directions
            // log('getting other locations ', getNextOtherLocations(asteriod.location, width));

            getNextOtherLocations(asteriod.location, width).forEach(l => {
                const orientation = determineIfUpOrDown(asteriod.location, l);

                // check if astMap already has this location and store
                const theAst = mapPixelWithAst.filter(ast => ast.location.x === l.x && ast.location.y === l.y)[0];

                if (theAst){
                    neighbors.push(theAst);
                } else {
                    let { _asteriod, pattern } = goADirectionTillAsteriodForOthers(mapPixelWithAst, l, orientation, width, asteriod.location);

                    log();
                    // log('asteriod from other: ', l, "is", _asteriod, 'orientation', orientation)
    
                    _asteriod = _asteriod[0];
                    // remove if neighbor already has it
                    
                    if (_asteriod) {
                        if (!neighbors.some(value => value.location.x === _asteriod.location.x && value.location.y === _asteriod.location.y)){
                            neighbors.push({ ..._asteriod, pattern })
                        }
                    }
                }
              

                

            });

            // for all neighbours that have patterns getAllBlockedsBasedOnPattern
            neighbors.forEach(neighbor => {
                if (neighbor.pattern){
                    const blocks = getAllBlockedsBasedOnPattern(mapPixelWithAst, neighbor.location, neighbor.pattern, width);

                    if (blocks.length > 0){
                        blockeds = [...blockeds, ...blocks];
                    }
                }
            });

            // minus one because the current asteriod is removed by default
            total = mapPixelWithAst.length - blockeds.length - 1;

            // log("Neighbours", neighbors); log();log();
            // log('blocked ', blockeds);
            // log('Total to see is ', total)

            return { ...asteriod, neighbors, blockeds, total }
        
    });

    log('new map', newMap);

    log();log();log();

    newMap.sort((a, b) => a.total - b.total);
    const answerLocation = `${newMap[newMap.length - 1].location.x},${newMap[newMap.length - 1].location.y}`;
    log('answer', answerLocation, '\n\n', 'How many?', newMap[newMap.length - 1].total);
    return answerLocation;
}




export const getAllImmediateNeighborsAndBlockers = _map => {
    // filter out the . pixels , you'll be left with the asteriods
    const mapPixelWithAst = getEachPixelInMap(_map).filter(p => p.pixel !== '.');
    // get the width of the map
    const width = getMapWidth(_map);

    // get all immediate neighbors
    const newMap = mapPixelWithAst.map((asteriod, i) => {
        const neighbors = [];
        let blocked = [];
        let others = [];
        let theOthers = [];

        // For mainDirections
        // go till you see an asteriod
        // record all blockeds

        // for diagonal directions
        // go till you see an asteriod
        // record all blockeds
        // if it took more than a step
        // find an asteriod up or down from the initial diagonal spot
        // record the pattern it took to get there
        // use that pattern to get blockeds

        // for other directions
        // if it doesn't exist in that neighbour spot, go up or down till you get an asteriod.
        // then get the pattern for that asteriod
        // then find all blockers based on that pattern

        // the asteriods it can see is the total asteriods in the map - the blocked



        mainDirections.forEach(direction => {
            // get all asteriods in the immediate area of the current asteriod main directions
            let {ast, steps} = goADirectionTillAsteriod(mapPixelWithAst, asteriod.location, direction, width);

            ast = ast[0];
            if( asteriod.location.x === 3 && asteriod.location.y === 4)
            log('asteriod from go to ', ast, 'direction', direction, 'steps', steps)

            if (steps > 1){
                if( asteriod.location.x === 5 && asteriod.location.y === 8 )
                log('compose diagonal location', composeDiagonalLocations(asteriod.location, width))
                composeDiagonalLocations(asteriod.location, width).forEach(l => {
                    const dir = determineIfUpOrDown(asteriod.location, l);
                    const { _asteriod, pattern }=goADirectionTillAsteriodForOthers(mapPixelWithAst, l, dir, width, asteriod.location);
                    if (_asteriod){
                        neighbors.push({..._asteriod[0], pattern}); 
                    }
                    if( asteriod.location.x === 3 && asteriod.location.y === 4)
                    log('neighbours for current asteriod', _asteriod, 'steps', steps);

                });
            }
          

            // now kepp tab of the asteriods these ones block
            const blocks =  goADirectionTillBlockeds(mapPixelWithAst, asteriod.location, direction, getMapWidth(_map), ast);
            if (ast){
                neighbors.push(ast);
                blocked = [...blocked, ...blocks]
            }
        });

        // getNextOtherLocations()
        // log('other locations ', others);
       
        let otherLocations = getNextOtherLocations(asteriod.location, width);

        if( asteriod.location.x === 3 && asteriod.location.y === 4){
            log('other locations', otherLocations, 'asteriod.location', asteriod.location, 'mapPixel', mapPixelWithAst);
        }

        if( asteriod.location.x === 3 && asteriod.location.y === 4) {
            otherLocations = otherLocations.map(l => {
                let theMap = mapPixelWithAst.find(p => parseInt(l.x,10) === parseInt(p.location.x, 10) && parseInt(l.y, 10) === parseInt(p.location.y, 10));

                if (!theMap){
                    const direction = determineIfUpOrDown(asteriod.location, l);

                    const { _asteriod, pattern } = goADirectionTillAsteriodForOthers(mapPixelWithAst, l, direction, width, asteriod.location);

                    if (_asteriod ){
                        theMap = { ..._asteriod[0], pattern };
                        // log('From', asteriod, 'to this asteriod', _asteriod, 'pattern', pattern);
                    }
                }

                return theMap
            });
        }
      

        if( asteriod.location.x === 3 && asteriod.location.y === 4){
            log('other locations', otherLocations);
        }

        // others = [...others, ...mapPixelWithAst.filter(p => {
        //     const otherLocation = otherLocations.filter(l => {
        //         let value = l.x === p.location.x && l.y === p.location.y;
        //             // determine if up or down
        //             if (!value){
        //                 const direction = determineIfUpOrDown(p.location, l);

        //                 const { _asteriod, pattern } = goADirectionTillAsteriodForOthers(mapPixelWithAst, l, direction, width, asteriod.location);

        //                 if (_asteriod ){
        //                     theOthers.push({_asteriod, pattern })
        //                     // log('From', asteriod, 'to this asteriod', _asteriod, 'pattern', pattern);
        //                 }
        //                 // go that direction till outOfBound or you hit an asteriod 
        //                     // return (asteriod or empty Array) and pattern
        //                 // Use pattern to find other blocked asteriods of that location

        //             }

        //             // go that location 
        //         return value;
        //     });
            
            
        //     return otherLocation.length >= 1
        // })]
        // if there is an asteriod in those other locations calculate blocked by using the same pattern
        // Otherwise, go the orientation and find an asteriod, store the pattern it took you to get to the asteriod
        // and use it to find other asteriods

        return { ...asteriod, neighbors, blocked, others, theOthers };
    });

    log('newMap', newMap[8].neighbors);

}
