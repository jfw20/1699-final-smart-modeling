var city;
var rules = [];
var updaters = [];
var ruleCount = 0;
var updaterCount = 0;

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
 * - Implements a single update method that will be called every delta time
 */
function Updater(op){
    this.update = () => {
        op();
    }
    updaters[updaterCount++] = this;
}

generateBoard = () => {
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
 * Draw the current board to the screen
 */
drawBoard = (...args) => {
    table = document.getElementById("visualizer");
    tbody = document.createElement("tbody");

    for(let i = 0; i < city.length; i++) {
        tr = document.createElement("tr");

        for(let k = 0; k < city[i].length; k++) {
            td = document.createElement("td");
            td.className = "vCell";
            // Set cell color
            td.appendChild(document.createTextNode(" "));
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

updateBoard = (...args) => {
    // Iterate through indexes by row and 
}