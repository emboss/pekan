dojo.provide("app.ui.TaskView");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("app.ui.TaskView", [dijit._Widget, dijit._Templated], {
    templateString: '<div class="task"><div class="title"><div class="text" dojoAttachPoint="titleNode">${task.title}</div><div class="tools"><span class="edit" dojoAttachEvent="onclick:onEdit">edit</span><span class="delete" dojoAttachEvent="onclick:onDelete">&nbsp;X</span></div></div><div class="description"><p dojoAttachPoint="descriptionNode">${task.description}</p></div></div>',

    task: null,

    constructor: function(controller, task) {
        this.controller = controller;
        this.task = task;
    },

    onEdit: function(event) {
        this.controller.onEditTask(this);
    },

    onDelete: function(event) {
        this.controller.onDeleteTask(this);
    },

    update: function() {
        this.titleNode.innerHTML = this.task.title;
        this.descriptionNode.innerHTML = this.task.description;
    },

    destroy: function() {
        this.inherited(arguments);
        dojo.destroy(this.domNode);
    }
});