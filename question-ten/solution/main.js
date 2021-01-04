// go left till you hit an asteriod...same for other main directions (right, up, down, diagonals...)
// store the asteriod in a variable
// for main directions they block => any asteriod in the direction will be removed from the big array map
// go other direction till you hit an asteriod
// store the asteriod in a variable too
// for other directions they block => 



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
