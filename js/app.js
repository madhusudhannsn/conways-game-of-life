var liveCellsMap = {};
var cellsToBeDead = [];
var cellsToBeAlive = [];
var totalCellsMap ={};
var reproductionCellsMap ={};
var recordedPattern = {};

var gridRows = 112;
var gridColumns = 112;

var table = document.getElementById('game-table');
var startGameButton = document.getElementById('startGameButton');
var pauseButton = document.getElementById('pauseButton');
var stepButton = document.getElementById('stepButton');
var resetButton = document.getElementById('resetButton');
var glidergunPattern = document.getElementById('glider');

var universePattern = document.getElementById('universe');

var rPentominoPattern = document.getElementById('rPentominoPattern');
var acornPattern = document.getElementById('acornPattern');
var beaconPattern = document.getElementById('beaconPattern');
var blinkedPattern = document.getElementById('blinkedPattern');
var pulsarPattern = document.getElementById('pulsarPattern');
var toadPattern = document.getElementById('toadPattern');
var spaceShipPattern = document.getElementById('spaceShipPattern');
var gliderPattern = document.getElementById('gliderPattern');
var dieHardPattern = document.getElementById('dieHardPattern');

var periodicStatus;

function preprocessor () {
		
	var tableBody = computeTableStructure(gridRows,gridColumns);
	setInnerHTML(table,tableBody);
	registerEvents();
	loadTableCells();
	//startGameButton
}

function registerEvents () {
	table.addEventListener('click',tableClick);
	startGameButton.addEventListener('click',execute);
	stepButton.addEventListener('click',nextStep);
	pauseButton.addEventListener('click',pauseGame);
	resetButton.addEventListener('click',resetGame);

	viewMyPatternButton.addEventListener('click',applyRecordedPattern);

	
	glidergunPattern.addEventListener('click',initiateGlider);
	dieHardPattern.addEventListener('click',initiateDieHardPattern);
	rPentominoPattern.addEventListener('click',initiateRPentominoPattern);
	acornPattern.addEventListener('click',initiateAcornPattern);	
	pulsarPattern.addEventListener('click',initiatePulsarPattern);	
	spaceShipPattern.addEventListener('click',initiateSpaceShipPattern);

	/*beaconPattern.addEventListener('click',initiateBeaconPattern);
	universePattern.addEventListener('click',initiateUniverse);
	blinkedPattern.addEventListener('click',initiateBlinkedPattern);
	toadPattern.addEventListener('click',initiateToadPattern);	
	gliderPattern.addEventListener('click',initiateGliderPattern);*/
}


function resetGame() {
	location.reload();
}


function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
    tableClick(event);
}

function drop(event) {
    event.preventDefault();
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


function nextStep() {
	init();
}


function pauseGame() {
	clearInterval(periodicStatus);
}

function initiateUniverse () {
	clearExistingPattern();
	applyPattern('02#08');
	applyPattern('03#06');
	applyPattern('03#08');
	applyPattern('03#09');
	applyPattern('04#06');
	applyPattern('04#08');
	applyPattern('05#06');
	applyPattern('06#04');
	applyPattern('07#02');
	applyPattern('07#04');
}


function initiateDieHardPattern() {
	clearExistingPattern();
	applyPattern('17#35');
	applyPattern('18#29');
	applyPattern('18#30');
	applyPattern('19#30');
	applyPattern('19#34');
	applyPattern('19#35');
	applyPattern('19#36');

}

function initiateRPentominoPattern() {
	clearExistingPattern();
	applyPattern('55#44');
	applyPattern('55#45');
	applyPattern('56#43');
	applyPattern('56#44');
	applyPattern('57#44');
}

function initiateAcornPattern() {
	clearExistingPattern();
	applyPattern('14#32');
	applyPattern('15#34');
	applyPattern('16#31');
	applyPattern('16#32');
	applyPattern('16#35');
	applyPattern('16#36');
	applyPattern('16#37');
}

function initiateBeaconPattern() {
	clearExistingPattern();
	applyPattern('32#40');
	applyPattern('32#41');
	applyPattern('33#40');
	applyPattern('33#41');
	applyPattern('34#42');
	applyPattern('34#43');
	applyPattern('35#42');
	applyPattern('35#43');
}

function initiateBlinkedPattern() {
	clearExistingPattern();
	applyPattern('09#29');
	applyPattern('10#29');
	applyPattern('11#29');
}

function initiatePulsarPattern() {
	clearExistingPattern();
	applyPattern('13#32');
	applyPattern('13#33');
	applyPattern('13#34');
	applyPattern('13#38');
	applyPattern('13#39');
	applyPattern('13#40');
	applyPattern('15#30');
	applyPattern('15#35');
	applyPattern('15#37');
	applyPattern('15#42');
	applyPattern('16#30');
	applyPattern('16#35');
	applyPattern('16#37');
	applyPattern('16#42');
	applyPattern('17#30');
	applyPattern('17#35');
	applyPattern('17#37');
	applyPattern('17#42');
	applyPattern('18#32');
	applyPattern('18#33');
	applyPattern('18#34');
	applyPattern('18#38');
	applyPattern('18#39');
	applyPattern('18#40');
	applyPattern('20#32');
	applyPattern('20#33');
	applyPattern('20#34');
	applyPattern('20#38');
	applyPattern('20#39');
	applyPattern('20#40');
	applyPattern('21#30');
	applyPattern('21#35');
	applyPattern('21#37');
	applyPattern('21#42');
	applyPattern('22#30');
	applyPattern('22#35');
	applyPattern('22#37');
	applyPattern('22#42');
	applyPattern('23#30');
	applyPattern('23#35');
	applyPattern('23#37');
	applyPattern('23#42');
	applyPattern('25#32');
	applyPattern('25#33');
	applyPattern('25#34');
	applyPattern('25#38');
	applyPattern('25#39');
	applyPattern('25#40');
}

function initiateToadPattern() {
	clearExistingPattern();
	applyPattern('29#33');
	applyPattern('29#34');
	applyPattern('29#35');
	applyPattern('30#32');
	applyPattern('30#33');
	applyPattern('30#34');
}

function initiateGliderPattern() {
	clearExistingPattern();
	applyPattern('22#33');
	applyPattern('22#35');
	applyPattern('23#34');
	applyPattern('23#35');
	applyPattern('24#34');
}

function initiateSpaceShipPattern() {
	clearExistingPattern();
	applyPattern('50#34');
	applyPattern('50#35');
	applyPattern('51#32');
	applyPattern('51#33');
	applyPattern('51#35');
	applyPattern('51#36');
	applyPattern('52#32');
	applyPattern('52#33');
	applyPattern('52#34');
	applyPattern('52#35');
	applyPattern('53#33');
	applyPattern('53#34');	
}

function initiateGlider () {
	clearExistingPattern();
	applyPattern('12#36');
	applyPattern('13#34');
	applyPattern('13#36');
	applyPattern('14#32');
	applyPattern('14#33');
	applyPattern('14#46');
	applyPattern('14#47');
	applyPattern('14#24');
	applyPattern('14#25');
	applyPattern('15#32');
	applyPattern('15#33');
	applyPattern('15#27');
	applyPattern('15#46');
	applyPattern('15#47');
	applyPattern('15#23');
	applyPattern('16#33');
	applyPattern('16#32');
	applyPattern('16#28');
	applyPattern('16#12');
	applyPattern('16#13');
	applyPattern('16#22');
	applyPattern('17#34');
	applyPattern('17#36');
	applyPattern('17#26');
	applyPattern('17#28');
	applyPattern('17#29');
	applyPattern('17#12');
	applyPattern('17#22');
	applyPattern('17#13');
	applyPattern('18#22');
	applyPattern('18#28');
	applyPattern('18#36');
	applyPattern('19#27');
	applyPattern('19#23');
	applyPattern('20#24');
	applyPattern('20#25');

}

function applyPattern (id) {
		var cell = totalCellsMap[id];
		cell.element.style.background = 'green';
		cell.status = 'live';
		liveCellsMap[id] = cell;
}


function applyRecordedPattern() {

	clearExistingPattern();

	for (var key in recordedPattern) {
		applyPattern(key);
	}
}

function tableClick (e) {
		var clickedElement = document.getElementById(e.srcElement.id);
		var cell = totalCellsMap[e.srcElement.id];
		cell.element.style.background = 'green';
		cell.status = 'live';
		liveCellsMap[e.srcElement.id] = cell;
}

function runPeriodically() {
	periodicStatus = setInterval(function(){init()},100);
}
function execute() {
	if (isEmpty(liveCellsMap)) 
		alert("Turn cells alive by clicking at them & Start the game !!");
	else {
		recordedPattern = {};
		recordedPattern = clone(liveCellsMap);
		viewMyPatternButton.disabled = false;
		runPeriodically();
	}		
}

function clone(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = obj[key];
        }
    }
    return temp;
}


	
function init () {
	processLiveCells();
	processForReproduction();
	cleanIntermediateProcesses();
}

function Cell (element,rowNo,colNo) {
	this.status = 'not born';
	this.element = element;
	this.rowNo = rowNo;
	this.colNo = colNo;
}

function computeTableStructure (rows,cols)
{
	var innerTableData='';
	for(var i=0;i<rows;i++)
	{
		var row = "<tr>";
		for(var j=0;j<cols;j++)
		{
			row+='<td id=\"';
			var id = computeId(i,j);
			row+=id;
			row+='\" ondragstart=\"dragStart(event)\" draggable=\"true\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\"> </td>';
		}
		row+='</tr>';
		innerTableData+=row;
	}
	return innerTableData;
}

function setInnerHTML (element,htmlbody)
{
	element.innerHTML = htmlbody;
}
function computeId (i,j) {
			var id= '';
			if (i < 10)
				id+= '0' + i;
			else
				id+= i;			
			id+='#';
			if (j < 10)
				id+= '0' + j;
			else
				id+= j;
	return id;
}
function loadTableCells() {
	var table = document.getElementById('game-table');
	for(var i=0;i<gridRows;i++)
	{
		for(var j=0;j<gridColumns;j++)
		{
			var id = computeId(i,j);
			var cell = new Cell(table.rows[i].cells[j],i,j);
			totalCellsMap[id] = cell;
		}
	}
}

function processLiveCells() {
	for(var key in liveCellsMap) {
		if(liveCellsMap.hasOwnProperty(key)) {
			var cell = liveCellsMap[key];
			var counter = checkLifeForEachCell(cell,'live');
			var status = checkRulesForLiveCell(cell.status,counter);
			if(status == 'dead')
			cellsToBeDead.push(key);
			updateColor(status,cell);
		}
	}
}

function processForReproduction() {
	for(var key in reproductionCellsMap) {
		if(reproductionCellsMap.hasOwnProperty(key)) {
			var cell = reproductionCellsMap[key];
			var counter = checkLifeForEachCell(cell,'reproduction');
			var status = checkRulesForNewCell(counter);
			if(status == 'live')
			cellsToBeAlive.push(key);
			updateColor(status,cell);
		}
	}
}


//Need to check why object is not incremented
function checkLifeForEachCell (cell,process) {
	var counter = 0;
	var rowNo = cell.rowNo;
	var colNo = cell.colNo;
	counter += checkForNeighbourLife(rowNo-1,colNo-1,process);
	counter += checkForNeighbourLife(rowNo,colNo-1,process);
	counter += checkForNeighbourLife(rowNo+1,colNo-1,process);
	counter += checkForNeighbourLife(rowNo-1,colNo,process);
	counter += checkForNeighbourLife(rowNo+1,colNo,process);
	counter += checkForNeighbourLife(rowNo-1,colNo+1,process);
	counter += checkForNeighbourLife(rowNo,colNo+1,process);
	counter += checkForNeighbourLife(rowNo+1,colNo+1,process);
	return counter;
}

function checkForNeighbourLife(rowNo,colNo,process) {
	var counter = 0;
	if(rowNo != -1 && colNo != -1 && rowNo != gridRows && colNo != gridColumns ) {
		var id = computeId(rowNo,colNo);
		var cell = totalCellsMap[id];
		counter = checkLife(cell.status);
		if(counter == 0 && process == 'live') {
			reproductionCellsMap[id] = cell;
		}
	}
	return counter;	
} 

function checkLife(status) {
	var counter = 0 ;
	if(status == 'live') {
		counter++; 
	}
	
	return counter;
}

function checkRulesForLiveCell(status,counter) {
	
	if (counter == 2 || counter == 3) {
		return 'live';
	}	
	else {
		if(status == 'live') {
			return 'dead';
		}	
		else {
			return 'not born';
		}
	}	
	
}

function checkRulesForNewCell(counter) {
	
	if (counter == 3) 
		return 'live';	
	
}

function updateColor (status,cell) {
	if(status == 'live')
		cell.element.style.background = 'green';
	else if(status == 'dead')
		cell.element.style.background = 'yellow';
	else
		cell.element.style.background = 'white';	
}
//TODO Need to check for garbage collection
function cleanIntermediateProcesses() {
	reproductionCellsMap = {};
	for(i=0;i<cellsToBeDead.length;i++) {
		var cellKey = cellsToBeDead[i];
		totalCellsMap[cellKey].status = 'dead';
		delete liveCellsMap[cellKey];
	}
	for(i=0;i<cellsToBeAlive.length;i++) {
			var cellKey = cellsToBeAlive[i];
			totalCellsMap[cellKey].status = 'live';
		 liveCellsMap[cellsToBeAlive[i]] = totalCellsMap[cellKey];
	}
	cellsToBeDead = [];
	cellsToBeAlive = [];
}

function clearExistingPattern() {
	pauseGame();	

	cleanIntermediateProcesses();

	var liveCellsMap = {};
	var cellsToBeDead = [];
	var cellsToBeAlive = [];
	var totalCellsMap ={};
	var reproductionCellsMap ={};
	var recordedPattern = {};

	var table = document.getElementById('game-table');
	table.innerHTML = '';	

	preprocessor();
}