/*******************************************************************************
* globalCompPropertyFunction() loops through all of the Comps in a Project and
*	affects a specified property of each Comp in the same way
*******************************************************************************/

{
	function globalCompPropertyFunction() {
		for(var i = 1; i <= app.project.numItems; i++) {
			if(app.project.item(i) instanceof CompItem) {

				app.project.item(i).PROPERTY = VALUE;

			}
		}
	}
	
	// Create undo group to allow undo all actions of function at once
	// Call globalCompPropertyFunction() function
	app.beginUndoGroup('Change FrameRate of all comps in project to 24');
		globalCompPropertyFunction();
	app.endUndoGroup();
}
