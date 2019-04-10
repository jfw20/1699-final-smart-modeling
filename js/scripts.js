/*
 * Created by Jeffrey Willis
 * Visually focused Generalized Modeling framework for Smart Cities
 * Made for CS1699: Smart Cities
 * 4/19/2019
 */

/*
 * Global class which executes lambda to create global variable
 */
function Global(op){
    op();
}

/*
 * Rule class used to standardize rules
 * - Additional rules are created by passing in a lamda function to a new rule object
 * - Lamda functions should evaluate conditions via an input board (2D int array) and pos [x, y], and return result
 * - Lambda function return result should fit format
 *      [<bool Condition: True/False>,
 *       <int Direction: -1:no movement 0:down 1:left 2:up 3:right>,
 *       <int Value: new value at new position (-1 for no change)>]
 */
function Rule(op){
    this.getResult = (x, y) => {
        op(x, y);
    }
    rules[ruleCount++] = this;
}

/*
 * Updater class used to repeatedly update custom variables
 * - Implements an update method that will be called every delta time
 * - Update functions should only access variables that are known to exist
 */
function Updater(op){
    this.update = () => {
        op();
    }
    updaters[updaterCount++] = this;
}

generateBoard = () => {
    console.log(carbonFootPrint);
    city = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}

/*
 * Called if user provides a city, otherwise default hardcoded city is used
 */
setCity = (aCity) => {
    city = aCity;
}

setTDColor = (td, col, row) => {
    td.style.backgroundColor = "yellow";
    return td;
}

setTDSize = (td, size) => {
    td.style.height = size + "px";
    td.style.width = size + "px";
    return td;
}

/*
 * Draw the current board to the screen
 */
drawBoard = (...args) => {
    console.log(city.length);
    console.log(inputCellSize);
    table = document.getElementById("visualizer");
    tbody = document.createElement("tbody");

    for(let row = 0; row < city.length; row++) {
        tr = document.createElement("tr");

        for(let col = 0; col < city[row].length; col++) {
            td = document.createElement("td");
            td.className = "vCell";
            // Set cell color
            td.appendChild(document.createTextNode(" "));
            td = setTDColor(td, col, row);
            td = setTDSize(td, inputCellSize);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

/*
 * Create objects so we can track their updates
 */
identifyObjects = () => {

}

updateBoard = () => {
    // Iterate through indexes by row and check conditions, if they need to be updated, update them
    console.log(city.length);
    console.log(inputCellSize);
}