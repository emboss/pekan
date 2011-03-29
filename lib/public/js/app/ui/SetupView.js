dojo.provide("app.ui.SetupView");

dojo.require("app.AppRegistry");

dojo.declare("app.ui.SetupView", null, {
   constructor: function(controller) {
        this.controller = controller;
    },

    init: function() {
        this._initEvents();
    },

    _initEvents: function() {
        dojo.connect(app.AppRegistry.Setup.createProjectNode,
                     "onclick",
                     this,
                     this.onCreateProject);
    },

    addProject: function(project) {
        /*TODO: object representation to also store id */
        var element = document.createElement("li");
        element.appendChild(document.createTextNode(project.name));
        app.AppRegistry.Setup.projectsNode.appendChild(element);
    },

    onCreateProject: function() {
        var textInput = app.AppRegistry.Setup.projectInputNode;
        this.controller.onCreateProject({
            name: textInput.value
        });
        textInput.value = null;
    }
});