dojo.provide("app.ui.TaskView");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("app.ui.TaskView", [dijit._Widget, dijit._Templated], {

    attributeMap:  {
            title: { node: "titleNode", type: "innerHTML" },
            description: { node: "descriptionNode", type: "innerHTML" }
    },

    constructor: function(controller, task) {
        this.controller = controller;
        this.task = task;
    },

    templateString: dojo.cache("app.ui", "templates/TaskView.html"),

    postCreate: function() {
        this.attr("title", this.task.title);
        this.attr("description", this.task.description);
        dojo.connect(this.editNode, "onclick", this, this.onEdit);
        dojo.connect(this.deleteNode, "onclick", this, this.onDelete);
    },

    onEdit: function(event) {
        this.controller.onEditTask(this);
    },

    onDelete: function(event) {
        this.controller.onDeleteTask(this);
    },

    update: function() {
        this.attr("title", this.task.title);
        this.attr("description", this.task.description);
    },

    destroy: function() {
        this.inherited(arguments);
        dojo.destroy(this.domNode);
    }
});