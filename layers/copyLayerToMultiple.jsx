/*******************************************************************************
* copyLayerToMultiple() copies a selected Layer or Layer(s) into every CompItem
*	in a Project
*
* ********** CURRENTLY UNSTABLE. ATTEMPTING DO 'UNDO' (CTRL+Z) THE ACTION OF THE
* ********** SCRIPT RESULTS IN ERROR OR CRASH IN AFTER EFFECTS.
* ********** SAVE PROJECT BEFORE USE.
*******************************************************************************/

{

	function copyLayerToMultiple() {
		var files = app.project.items,
			masterComp = app.project.activeItem,
			masterLayers = app.project.activeItem.selectedLayers;

		// Loop through each item in project
		// if item is instanceof CompItem
		// Deselect all layers in Comp, ensuring masterLayer(s) is placed above top
		// Layer in the current Comp
		// Copy selected Layer to CompItem
		var i = 1;
		while(i < app.project.items.length) {
			var currentComp = files[i];

			if(currentComp instanceof CompItem && currentComp != masterComp) {
				var currentLayers = currentComp.selectedLayers,
					n = currentLayers.length;

				while(n--)currentLayers[n].selected = false;

				masterLayers[0].copyToComp(currentComp);
			}
			i++;
		}
	}

	// Create undo group to allow undo all actions of function at once
	// Call copyLayerToMultiple() function
	app.beginUndoGroup('Copy selected layer to all CompItems in project');
		copyLayerToMultiple();
	app.endUndoGroup();

}
