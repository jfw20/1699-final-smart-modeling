/*
 * Created by Jeffrey Willis
 * Visually focused Generalized Modeling framework for Smart Cities
 * Made for CS1699: Smart Cities
 * 4/19/2019
 */

var updaters = [];
var updaterCount = 0;
var setups = [];
var setupCount = 0;
var ranges = [];
var rangeCount = 0;
var currMaxRange = 0;
var stats = [];
var statCount = 0;
var startTime;
var elapsedTime = 0;

/*
 * Global class which executes lambda to create global variable
 */
function Global(op){
    op();
}

/*
 * Rule class used to standardize rules
 * @constructor
 * @param {function()} op - Lamba function which determines logic of rule.
 */
class Rule{
    constructor(op){
        this.op = op;
    }
    getResult(...args){
        return this.op(args);
    }
}

class Stat{
    constructor(name, val){
        this.name = name;
        this.val = val;
        stats[statCount++] = this;
    }
    getStat(){
        return [this.name, this.val()];
    }
}

/*
 * ColorRange class used to synchronize IDS and colors
 * - Takes in an html color, how many ids are required, and name of module it is used for
 */
class ColorRange{
    constructor(color, numIDS, mod){
        this.color = color;
        this.min = currMaxRange;
        this.mod = mod;
        this.max = currMaxRange + numIDS;
        currMaxRange += numIDS;
        ranges[rangeCount++] = this;
    }

    getColor(){
        return this.color;
    }

    inRange(i){
        let rv = false;
        if(i >= this.min && i < this.max){
            rv = true;
        }
        return rv;
    }

    getStartID(){
        return this.min;
    }

    getRange(){
        return "Range: " + this.min + "->" + (this.max-1);
    }

    getMod(){
        return this.mod;
    }
}

/*
 * Setup class used to setup a map based on module logic at beginning of execution
 * @constructor
 * @param {function()} op - Lamba expression used to setup map IDS appropriately.
 */
class Setup{
    constructor(op){
        this.op = op;
        setups[setupCount++] = this;
    }

    set(row, col){
        this.op(row, col);
    }
}

/*
 * Updater class used to repeatedly update custom variables
 * - Implements an update method that will be called every delta time
 * - Rule object should check for conditions in which update should run
 * - Update functions should only access variables that are known to exist
 */
class Updater{
    constructor(op){
        this.op = op;
        updaters[updaterCount++] = this;
    }

    update(row, col){
        this.op(row, col);
    }
}

generateBoard = () => {
    city = [[11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
            [11, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 11],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 11],
            [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]]
}

/*
 * Called if user provides a city, otherwise default hardcoded city is used
 */
setCity = (aCity) => {
    city = aCity;
}

setTime = () => {
    startTime = new Date();
}

/*
 * Called once after board is drawn to run any custom user setups
 */
setupBoard = () => {
    for(let row = 0; row < city.length; row++){
        for(let col = 0; col < city[row].length; col++){
            for(let i = 0; i < setups.length; i++){
                setups[i].set(row, col);
            }
        }
    }
}

updateInputs = () => {
    delta = document.getElementById("deltaT").value;
    timeStep = document.getElementById("stepT").value;
    let s = document.getElementById("vCellSize").value;
    if(s != cellSize){
        cellSize = s;
        updateSize();
    }
}

/*
 * Draw the current board to the screen
 */
drawBoard = (...args) => {
    table = document.getElementById("visualizer");
    table.innerHTML = "";
    tbody = document.createElement("tbody");

    for(let row = 0; row < city.length; row++) {
        tr = document.createElement("tr");

        for(let col = 0; col < city[row].length; col++) {
            td = document.createElement("td");
            td.className = "vCell";
            td.id = "" + row + "," + col;
            // Set cell color
            td.appendChild(document.createTextNode(" "));
            setTDColor(td, col, row);
            setTDSize(td, cellSize);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

/*
 * Updates time
 */
updateTimer = () => {
    let seconds = elapsedTime;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    seconds = seconds % 60;

    let timer = document.getElementById("timer");

    timer.innerHTML = "Time Elapsed: " + "Day: " + formatTime(hours, minutes, seconds);

    elapsedTime += 1 * timeStep;
    Math.round(elapsedTime);
}

/*
 * Updates table of stats
 */
updateStats = () => {
    let s = document.getElementById("stats");
    s.innerHTML = "";

    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.appendChild(document.createTextNode("Carbon Neutral/Negative: "));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(" "));
    if(Math.floor(100*carbonFootprint)/100 <= 0){
        td.style.backgroundColor = "green";
    }else{
        td.style.backgroundColor = "red";
    }
    tr.appendChild(td);
    tbody.appendChild(tr);
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.appendChild(document.createTextNode("Carbon Footprint:"));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode("" + Math.floor(100*carbonFootprint)/100));
    tr.appendChild(td);
    tbody.appendChild(tr);

    // Add stats
    for(let i = 0; i < statCount; i++){
        let statRet = stats[i].getStat();
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(statRet[0]));
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createTextNode(statRet[1]));
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    s.appendChild(tbody);
}

/*
 * Main
 */
updateVisualization = () => {
    updateTimer();
    updateBoard();
    updateStats();
    setTimeout(updateVisualization, delta);
}

/*
 * Updates sizes of cells
 */
updateSize = () => {
    for(let row = 0; row < city.length; row++){
        for(let col = 0; col < city[row].length; col++){
            td = document.getElementById("" + row + "," + col);
            setTDSize(td, cellSize);
        }
    }
}

/*
 * Calls updaters against each cell
 */
updateBoard = () => {
    // Iterate through indexes by row and check conditions, if they need to be updated, update them
    //for(let i = 0; i < timeStep; i++){
        //stuff
        for(let row = 0; row < city.length; row++){
            for(let col = 0; col < city[row].length; col++){
                for(let i = 0; i < updaters.length; i++){
                    updaters[i].update(row, col);
                }
            }
        }
    //}
}

/*
 * Helper Methods
 */

setTDColor = (td, col, row) => {
    for(let i = 0; i < ranges.length; i++){
        if(typeof(city[row][col]) === "object" && city[row][col] !== null){
            cellID = city[row][col].getID();
        }else{
            cellID = city[row][col];
        }
        if(ranges[i].inRange(cellID)){
            td.style.backgroundColor = ranges[i].getColor();
            return;
        }
    }

    //cellID error values are black
    if(cellID = city[row][col] < 0){
        td.style.backgroundColor = "black";
    }else{
        //non-handled error values are white
        td.style.backgroundColor = "white";
    }
}

setColor = (row, col, color) => {
    td = document.getElementById("" + row + "," + col);
    td.style.backgroundColor = color;
}

setID = (row, col, id) => {
    city[row][col] = id;
}

setTDSize = (td, size) => {
    td.style.height = size + "px";
    td.style.width = size + "px";
}

alertRanges = () => {
    let output = "Ranges of Modules:\n";
    for(let i = 0; i < rangeCount; i++){
        output += ranges[i].getMod() + " " + ranges[i].getRange() + "\n";
    }
    window.alert(output);
}

loadModules = () => {
    let scr = document.getElementById("loadModules");
    if(window.File && window.FileReader && window.FileList && window.Blob){
        console.log("Great, let's do this");
        var reader = new FileReader();
    }else{
        console.log("This browser is not supported.");
    }
    //loop through files in modules
}

formatTime = (hours, minutes, seconds) => {
    let rv = "";

    let day = Math.floor(hours / 24);
    let TOD = "AM";

    if(hours % 24 >= 12) TOD = "PM";
    hours = hours % 12;
    rv += day + " ";

    if(hours < 10){
        rv += "0" + hours;
    }else{
        rv += hours;
    }

    rv += ":";

    if(minutes < 10){
        rv += "0" + minutes;
    }else{
        rv += minutes;
    }

    rv += ":";

    if(seconds < 10){
        rv += "0" + seconds;
    }else{
        rv += seconds;
    }

    rv += " " + TOD;

    return rv;
}