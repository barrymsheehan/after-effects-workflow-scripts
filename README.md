# After Effects Workflow Scripts

A variety of Adobe After Effects workflow scripts. The scripts are designed to
be used with keyboard shortcuts (examples of how to do this are found in the
*Adobe After Effects [ver] Win en_US Shortcuts.txt* file). Some of the scripts
are geared towards working with stock video, which involves working with many
near-identical Comps (Compositions) containing short, discrete video clips.

## Getting started

### Compatibility
All scripts have been tested in After Effects CC 2018 (Version 14). Most have
also been used in some earlier versions of After Effects CC. I think they should
all work in earlier versions of After Effects as well.

### Adding the scripts to After Effects

You can run a script in After Effects from any directory using the **File >
Scripts** menu in the After Effects UI. In order to use the scripts via keyboard
shortcut they should be placed in the *Scripts* folder. This also makes the
scripts more readily available through the **File > Scripts** menu. By default
this folder can be found here.:

```
* Windows: Program Files\Adobe\Adobe After Effects <version>\Support Files
* Mac OS: Applications/Adobe After Effects <version>
```

## Usage

### Format

Each script takes the form of a function followed by a call to that function.
This means that as soon as the script is selected either through the UI or by
keyboard shortcut the function is immediately invoked.

Around the call to the function within each script is an Undo Group. This allows
all actions of the script to be undone with a single *Ctrl + Z* or *Undo*
command. The function call and Undo Group look like this.:

```
app.beginUndoGroup('Encapsulate the function call to allow single Undo');
  myFunction();
app.endUndoGroup();
```

### global-comps Functions

These scripts loop through all Comps in a Project and change a specified
property of each Comp in a similar way.

#### globalCompPropertyFunction.jsx

This function serves as a template to perform the above action where
**PROPERTY** is the property of each Comp that you want to change and **VALUE**
is the value to which it should be changed.

```
function globalCompPropertyFunction() {
  for(var i = 1; i <= app.project.numItems; i++) {
    if(app.project.item(i) instanceof CompItem) {

      app.project.item(i).PROPERTY = VALUE;

    }
  }
}
```

One example of this template in use is the *globalCompFrameRate24.jsx* script.

#### globalCompFrameRate24.jsx

This function changes the *frameRate* property of every Comp in a Project to
*24*. This is useful if you've begun a project containing many Comps, but
they've all got the wrong frame rate for your output or they've got different
frame rates and need to be normalised.

```
function globalCompFramerate24() {
	for(var i = 1; i <= app.project.numItems; i++) {
		if(app.project.item(i) instanceof CompItem) {
			app.project.item(i).frameRate = 24;
		}
	}
}
```

Another useful property of a Comp that can be changed through this type of
script is the resolution factor or *resolutionFactor*. When working with 4K
footage in particular, it can be really useful to lower the resolution factor
of your Comps while previewing. This makes the process of scrubbing footage less
hardware-intensive and smoother.

#### globalResFactorQuarter.jsx

This function changes the resolution factor of all Comps to one quarter, but
any resolution can be selected.

```
function globalResFactorQuarter() {
  for(var i = 1; i <= app.project.numItems; i++) {
    if(app.project.item(i) instanceof CompItem) {
      app.project.item(i).resolutionFactor = [4, 4];
    }
  }
}
```

### layers Functions

These functions create a new Adjustment Layer and place it above the currently
selected Layer(s).

#### createNewAdjLayer.jsx

This script serves as a template for scripts that create new Adjustment Layers.

First, a new Layer is created in the current Comp.

```
var currentComp = app.project.activeItem,
selectedCompLayers = currentComp.selectedLayers,
newAdjLayer = currentComp.layers.addSolid([0, 0, 0], 'New Adjustment Layer', currentComp.width, currentComp.height, 1);
```

Next, the start time of the layer is set to *0* to ensure the layer begins at
the start of the timeline. On the next line the Layer is set to be an Adjustment
Layer. Finally an effect (**New Effect**) is added to the *Effects* property of
the Layer.

```
newAdjLayer.startTime = 0;
newAdjLayer.adjustmentLayer = true;
newAdjLayer.property('Effects').addProperty('NEW EFFECT');
```

Finally, the Layer is placed above the currently selected Layer(s) or, if no
Layers are selected, the top of the Layer stack.

```
if(selectedCompLayers.length > 0) {
  newAdjLayer.moveBefore(selectedCompLayers[selectedCompLayers.length - 1]);
}
```

Multiple Effects can be easily added to the new Adjustment Layer. This can be
seen in the *createBandingSolutionLayer.jsx* script. The script creates a new
Adjustment Layer with a number of Effects included to reduce banding in a piece
of footage.

#### createBandingSolutionLayer.jsx

```
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
```

### utilities Functions

These scripts perform general functions like displaying a list of the names of
all selected Comps.

#### grabCompNames.jsx

This function creates a new *UI Panel* containing an *edittext* object. The
Panel is then populated with the names of all selected Comps.

## A note on the Shortcuts file

Using the shortcuts file (*Adobe After Effects [ver] Win en_US Shortcuts.txt*)
requires that the scripts in your *Scripts* folder be placed in a certain order.
The shortcuts file accesses scripts in numerical order. First, find the part of
the scripts file that contains these entries.:

```
"ExecuteScriptMenuItem01" = "()"
"ExecuteScriptMenuItem02" = "()"
"ExecuteScriptMenuItem03" = "()"
...
```

These entries can be edited to include your keyboard shortcuts. I find it useful
to use modifier keys (*Ctrl*, *Alt*, *Shift*) along with the NumPad keys. This
keeps my shortcuts organised, and avoids overlapping with After Effects'
built-in keyboard shortcuts.

```
"ExecuteScriptMenuItem01" = "(Ctrl+Alt+Pad1)"
"ExecuteScriptMenuItem02" = "(Ctrl+Alt+Pad2)"
"ExecuteScriptMenuItem03" = "(Ctrl+Alt+Pad3)"
...
```

In my *Scripts* folder, I organise my scripts by numbering them. I number all
scripts to be used with keyboard shortcuts with three digits, beginning with
*001*. For example:

```
Scripts
|    001_globalResFactorHalf.jsx
|    002_globalResFactorQuarter.jsx
|    003_globalResFactorTenth.jsx
```

If the above examples are taken together, then *Ctrl + Alt + Numpad 1* would
execute the *001_globalResFactorHalf.jsx* script, *Ctrl + Alt + Numpad 2* would
execute the *002_globalResFactorQuarter.jsx* script and *Ctrl + Alt + Numpad 3*
would execute the *003_globalResFactorTenth.jsx* script.

## Contact

### Barry Sheehan

* Home page: [BarrySheehan.com](http://www.barrysheehan.com)
* Twitter: [@barrymsheehan](https://twitter.com/barrymsheehan)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.
