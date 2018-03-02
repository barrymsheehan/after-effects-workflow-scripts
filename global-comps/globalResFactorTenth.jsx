/*******************************************************************************
* globalResFactorTenth() sets the resolutionFactor property of all Comps in a
* Project to 10, 10 (1:10 Resolution)
*******************************************************************************/

{
	function globalResFactorTenth() {
		for(var i = 1; i <= app.project.numItems; i++) {
			if(app.project.item(i) instanceof CompItem) {
				app.project.item(i).resolutionFactor = [10, 10];
			}
		}
	}
	
	// Create undo group to allow undo all actions of function at once
	// Call globalResFactorTenth() function
	app.beginUndoGroup('Change resolution of all comps in project to one tenth');
		globalResFactorTenth();
	app.endUndoGroup();
}
