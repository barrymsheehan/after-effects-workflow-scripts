/*******************************************************************************
* createNewAdjLayer() creates a new Adjustment Layer in current Comp
* An Effect or Effects are added to the Layer's 'Effects' property
* This new Layer is added to the selected Comp above the selected Layer(s)
*******************************************************************************/

{
	function createNewAdjLayer() {
		// Create new Solid 'newAdjLayer'
		var currentComp = app.project.activeItem,
		selectedCompLayers = currentComp.selectedLayers,
		newAdjLayer = currentComp.layers.addSolid([0, 0, 0], 'New Adjustment Layer', currentComp.width, currentComp.height, 1);

		// Set newAdjLayer startTime, adjustmentLayer
		// Add an Effect to 'Effects' property
		newAdjLayer.startTime = 0;
		newAdjLayer.adjustmentLayer = true;
		newAdjLayer.property('Effects').addProperty('NEW EFFECT');

		// Move newAdjLayer above currently selected Layer(s)
		// If no Layer is currently selected, newAdjLayer is placed above top
		// Layer
		if(selectedCompLayers.length > 0) {
			newAdjLayer.moveBefore(selectedCompLayers[selectedCompLayers.length - 1]);
		}
	}

	// Create undo group to allow undo all actions of function at once
	// Call createNewAdjLayer() function
	app.beginUndoGroup('Create and add Reduce Noise Layer');
		createNewAdjLayer();
	app.endUndoGroup();
}
