/*******************************************************************************
* globalCompFramerate24() sets the frameRate property of all Comps in a
* Project to 24
*******************************************************************************/

{
	function globalCompFramerate24() {
		for(var i = 1; i <= app.project.numItems; i++) {
			if(app.project.item(i) instanceof CompItem) {
				app.project.item(i).frameRate = 24;
			}
		}
	}
	
	// Create undo group to allow undo all actions of function at once
	// Call globalCompFrameRate24() function
	app.beginUndoGroup('Change FrameRate of all comps in project to 24');
		globalCompFramerate24();
	app.endUndoGroup();
}
