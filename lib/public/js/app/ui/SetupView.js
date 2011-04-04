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
        dojo.connect(dojo.query(app.AppRegistry.Setup.createProjectNode).shift(),
                     "onclick",
                     this,
                     this.onCreateProject);
    },

    addProject: function(project) {
        /*TODO: object representation to also store id */
        var element = document.createElement("li");
        element.appendChild(document.createTextNode(project.name));
        dojo.query(app.AppRegistry.Setup.projectsNode)
            .shift()
            .appendChild(element);
    },

    onCreateProject: function() {
        var textInput = dojo.query(app.AppRegistry.Setup.projectInputNode).shift();
        this.controller.onCreateProject({
            name: textInput.value
        });
        textInput.value = null;
    }
});