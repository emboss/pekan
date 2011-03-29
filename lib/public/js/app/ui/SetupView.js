dojo.provide("app.ui.SetupView");

dojo.declare("app.ui.SetupView", null, {
   constructor: function(controller) {
        this.controller = controller;
    },

    init: function() {
        this._initEvents();
    },

    _initEvents: function() {
        dojo.connect(app.AppRegistry.createProjectNode,
                     "onclick",
                     this.controller,
                     this.controller.onCreateProject);
    }
});