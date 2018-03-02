/*******************************************************************************
* createBandingSolutionLayer() creates a new Adjustment Layer in current Comp
* The 'Gradient Ramp', '4-Color Gradient', and 'Noise' Effects are added to the
* Layer's 'Effects' property
* This new Layer is added to the selected Comp above the selected Layer(s)
*******************************************************************************/

{
	function createBandingSolutionLayer() {
		// Create new Solid 'newBandingSolutionLayer'
		var currentComp = app.project.activeItem,
		selectedCompLayers = currentComp.selectedLayers,
		newBandingSolutionLayer = currentComp.layers.addSolid([0, 0, 0], 'Banding Solution', currentComp.width, currentComp.height, 1);

		// Set newBandingSolutionLayer startTime, adjustmentLayer
		// Add Effects to 'Effects' property (with opinionated defaults):
		// - 'Gradient Ramp': Semi-transparent Gradient Ramp to reduce banding
		// - '4-Color Gradient': Semi-transparent 4-Color Gradient to reduce banding
		// - 'Noise': Noise to reduce banding
		// - 'Curves': Boost mids with Curves to reduce banding
		// - 'Brightness & Contrast': Adjust to improve image
		newBandingSolutionLayer.startTime = 0;
		newBandingSolutionLayer.adjustmentLayer = true;

		newBandingSolutionLayer.property('Effects').addProperty('Gradient Ramp')('Start of Ramp').setValue([currentComp.width / 2, currentComp.height / 2]);
		newBandingSolutionLayer.property('Effects').property('Gradient Ramp')('Ramp Shape').setValue(2);
		newBandingSolutionLayer.property('Effects').property('Gradient Ramp')('Ramp Scatter').setValue(50);
		newBandingSolutionLayer.property('Effects').property('Gradient Ramp')('Blend With Original').setValue(0.97);

		newBandingSolutionLayer.property('Effects').addProperty('4-Color Gradient')('Jitter').setValue(50);
		newBandingSolutionLayer.property('Effects').property('4-Color Gradient')('Opacity').setValue(3);
		newBandingSolutionLayer.property('Effects').property('4-Color Gradient')('Blending Mode').setValue(21);

		newBandingSolutionLayer.property('Effects').addProperty('Noise')('Amount of Noise').setValue(2);
		newBandingSolutionLayer.property('Effects').addProperty('Curves');
		newBandingSolutionLayer.property('Effects').addProperty('Brightness & Contrast');

		// Move newBandingSolutionLayer above currently selected Layer(s)
		// If no Layer is currently selected, newBandingSolutionLayer is placed
		// above top Layer
		if(selectedCompLayers.length > 0) {
			newBandingSolutionLayer.moveBefore(selectedCompLayers[selectedCompLayers.length - 1]);
		}
	}

	// Create undo group to allow undo all actions of function at once
	// Call createBandingSolutionLayer() function
	app.beginUndoGroup('Create and add Banding Solution Layer');
		createBandingSolutionLayer();
	app.endUndoGroup();
}
