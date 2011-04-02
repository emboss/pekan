dojo.provide("app.ui._TaskEditForm");

dojo.require("dijit.dijit");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.ComboBox");
dojo.require("app.AppRegistry");
dojo.require("app.ProjectStore");

dojo.declare("app.ui._TaskEditForm", [ dijit._Widget, dijit._Templated ], {

    attributeMap: {
        description: { node: "descriptionNode", type: "innerHTML" }
    },

    constructor: function(data, submitCallback, cancelCallback) {
        this.submitCallback = submitCallback;
        this.cancelCallback = cancelCallback;
        this._description = data.description;
        this.store = new app.ProjectStore({ target: app.AppRegistry.projectUrl });
        this.projectsCombo = new dijit.form.ComboBox({
            id: "projectsContainer",
            name: "projects",
            store: this.store,
            value: "loading...",
            searchAttr: "name"
        }, null);

        if (data.item) {
            this.projectsCombo.set('item', data.item);
        }
        else {
            this.store.fetch({
                query: "first",
                onComplete: dojo.hitch(this, function(items) {
                    this.projectsCombo.set('item', items[0]);
                })
            });
        }
    },

    templateString: dojo.cache("app.ui", "templates/_TaskEditForm.html"),

    postCreate: function() {
        this.projectsContainer.appendChild(this.projectsCombo.domNode);
        this.attr("description", this._description);
    },

    onCancel: function() {
        this.destroyWidget();
        this.cancelCallback();
    },

    onSubmit: function() {
        var item = this.projectsCombo.get('item');
        var description = this.descriptionNode.value;

        this.destroyWidget();
        this.submitCallback({
            item: item,
            description: description
        });
    },

    destroyWidget: function() {
        var widgetId = dojo.attr(this.domNode, "widgetId");
        var widget = dijit.byId(widgetId);
        if (widget)
            widget.destroy(true);
        this.projectsCombo.destroy(true);
    }

});