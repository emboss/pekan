dojo.provide("app.SetupController");

dojo.require("app.ui.SetupView");

dojo.declare("app.SetupController", null, {
     constructor: function() {
       this.view = new app.ui.SetupView(this);
       this.store = new app.ProjectStore({ target: app.AppRegistry.projectUrl});
    },

    init: function() {
        this.view.init();
    },

    onCreateProject: function() {

    }
});