/*******************************************************************************
* globalResFactorQuarter() sets the resolutionFactor property of all Comps in a
* Project to 4, 4 (1:4 Resolution)
*******************************************************************************/

{
	function globalResFactorQuarter() {
		for(var i = 1; i <= app.project.numItems; i++) {
			if(app.project.item(i) instanceof CompItem) {
				app.project.item(i).resolutionFactor = [4, 4];
			}
		}
	}
	
	// Create undo group to allow undo all actions of function at once
	// Call globalResFactorQuarter() function
	app.beginUndoGroup('Change resolution of all comps in project to quarter');
		globalResFactorQuarter();
	app.endUndoGroup();
}
