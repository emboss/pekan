dojo.provide("app.ui.TaskEditDialog");

dojo.require("dijit.Dialog");
dojo.require("app.ui._TaskEditForm");

dojo.declare("app.ui.TaskEditDialog", null, {
    dialog: null,

    constructor: function() {
        this.dialog = new dijit.Dialog();
    },

    show: function(task, title, onSubmit) {
        var d = this.dialog;
        d.title = title;
        var form = new app.ui._TaskEditForm(task,
        function(task)
        {
            d.hide();
            onSubmit(task);
        },
        function() {
            d.hide();
        });
        d.setContent(form.domNode);
        d.show();
    }
});