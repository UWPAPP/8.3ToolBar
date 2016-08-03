// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();



    //定义一个NameSpace
	WinJS.Namespace.define("Sample", {
	    commandList: null,
	    outputCommand: WinJS.UI.eventHandler(function (ev) {
	        var status = document.querySelector(".status");
	        var command = ev.currentTarget;
	        if (command.winControl) {
	            var label = command.winControl.label || command.winControl.icon || "button";
	            var section = command.winControl.section || "";
	            var priority = command.winControl.priority;
	            var msg = section + " command " + label + " with priority " + priority + " was pressed";
	            status.innerHTML = msg;
	        }
	    })
	});

    //注意点：这个需要写下面，否则找不到Sample
	var dataArray = [
        new WinJS.UI.Command(null, { id: 'cmdEdit', label: 'edit', section: 'primary', type: 'button', icon: 'edit', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdDelete', label: 'delete', section: 'primary', type: 'button', icon: 'delete', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdFavorite', label: 'favorite', section: 'primary', type: 'toggle', icon: 'favorite', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdOpenWith', label: 'open with', section: 'primary', type: 'button', icon: 'openfile', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdDownload', label: 'download', section: 'primary', type: 'button', icon: 'download', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdPin', label: 'pin', section: 'primary', type: 'button', icon: 'pin', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdZoom', label: 'zoom', section: 'primary', type: 'button', icon: 'zoomin', onclick: Sample.outputCommand }),
        new WinJS.UI.Command(null, { id: 'cmdFullscreen', label: 'full screen', section: 'primary', type: 'button', icon: 'fullscreen', onclick: Sample.outputCommand })
	];

	Sample.commandList = new WinJS.Binding.List(dataArray);

})();
