/*******************************************************************************
* grabCompNames() displays the names of selected Folders in a Project
* in a new Window/Panel, allowing them to be copied and pasted to another
*	program
********************************************************************************/

{

	function grabCompNames(thisObj) {
		// Setup
		var selected = app.project.selection,
			compNames = [],
			namesList = '';

		// Add names of selected folders to compNames Array()
		for(var i = 0; i < selected.length; i++) {
			if(selected[i] instanceof FolderItem) {
				compNames.push(selected[i].name);
			}
		}

		// Adds names of selected items in compNames Array() to namesList String()
		var compsCount = 0;
		for(var i = 0; i < compNames.length; i++) {
			
			// This line splits the name of the current Comp at a '.' character
			// Allows descriptors to be placed at the beginning of Comp names
			// Comps can then be selected by descriptor and displayed to panel
			// Useful for grouping dropped shots by category for instance
			//currName = compNames[i].split('.')[1];
			
			currCName = compNames[i];
			namesList += (currName + '\n');
			compsCount += 1;
		}

		// Builds UI Panel and adds the list of names in an 'edittext' box
		function grabCompNames_buildUI(thisObj) {
			var compNamesPanel = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'Grab Comp Names', undefined, {resizeable:true});
			compNamesPanel.grp = compNamesPanel.add('edittext', undefined, 'names list', {multiline: true});
			compNamesPanel.grp.preferredSize = [500, 1000];
			compNamesPanel.grp.text = namesList + '\n' + 'Total no. of comps: ' + compsCount;

			// Allow automatic layout of Panel
			compNamesPanel.layout.layout(true);

			return compNamesPanel;
		}

		// If compNamesPalette is not currently visible, center the panel and show
		// it
		var compNamesPalette = grabCompNames_buildUI(thisObj);

		if (compNamesPalette != null && compNamesPalette instanceof Window){
			compNamesPalette.center();
			compNamesPalette.show();
		}
	}

	grabCompNames(this);
}
