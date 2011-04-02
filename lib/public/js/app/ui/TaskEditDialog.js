dojo.provide("app.ui.TaskEditDialog");

dojo.require("dijit.Dialog");
dojo.require("app.ui._TaskEditForm");

dojo.declare("app.ui.TaskEditDialog", null, {
    dialog: null,
    form: null,

    constructor: function() {
        this.dialog = new dijit.Dialog({title: "Edit your task"});
        dojo.connect(this.dialog, "onCancel", this, this.onDialogCancel);
    },

    show: function(data, onSubmit) {
        var d = this.dialog;
        this.form = new app.ui._TaskEditForm(data,
        function(data)
        {
            d.hide();
            this.form = null;
            onSubmit(data);
        },
        function() {
            d.hide();
            this.form = null;
        });
        d.setContent(this.form.domNode);
        d.show();
    },

    onDialogCancel: function() {
        if (this.form) {
            this.form.destroyWidget();
            this.form = null;
        }
    }
});