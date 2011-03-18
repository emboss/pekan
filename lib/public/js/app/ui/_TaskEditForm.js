dojo.provide("app.ui._TaskEditForm");

dojo.require("dijit.dijit");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("app.ui._TaskEditForm", [ dijit._Widget, dijit._Templated ], {
    templateString: '<div class="edit-task-container"><div class="title-row"><label for="title">Title:</label><input type="text" dojoAttachPoint="titleNode" value="${title}"/></div><div class="description-row"><label for="description">Description:</label><textarea dojoAttachPoint="descriptionNode" name="description" rows="5">${description}</textarea></div><div class="button-row"><button dojoAttachEvent="onclick:onSubmit">OK</button><button dojoAttachEvent="onclick:onCancel">Cancel</button></div></div>',

    description: null,

    submitCallback: null,
    cancelCallback: null,

    constructor: function(task, submitCallback, cancelCallback) {
        this.submitCallback = submitCallback;
        this.cancelCallback = cancelCallback;
        this.title = task.title;
        this.description = task.description;
    },

    postMixInProperties: function() {
    },

    onCancel: function() {
        this.destroyWidget(this.domNode);
        this.cancelCallback();
    },

    onSubmit: function() {
        var title = this.titleNode.value;
        var description = this.descriptionNode.value;
        this.destroyWidget(this.domNode);
        this.submitCallback({
            title: title,
            description: description
        });
    },

    destroyWidget: function(widgetNode) {
        var widgetId = dojo.attr(widgetNode, 'widgetId');
        var widget = dijit.byId(widgetId);
        if (widget)
            widget.destroy(true);
    }

});