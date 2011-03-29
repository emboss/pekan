dojo.provide("app.SetupController");

dojo.require("app.AppRegistry");
dojo.require("app.ui.SetupView");
dojo.require("app.ProjectStore");

dojo.declare("app.SetupController", null, {
    constructor: function() {
       this.view = new app.ui.SetupView(this);
       this.store = new app.ProjectStore({ target: app.AppRegistry.projectUrl });
    },

    init: function() {
        this.view.init();
    },

    onCreateProject: function(project) {
        project = this.store.newItem(project);
        this.store.save();
        this.view.addProject(project);
    }
});