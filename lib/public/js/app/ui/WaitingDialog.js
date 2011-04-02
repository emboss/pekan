dojo.provide("app.ui.WaitingDialog");

dojo.require("dijit.Dialog");

dojo.ready(function() {

    var waiter = new dijit.Dialog({
        title: "Please wait...",
        content: "<div style='text-align: center'><img src='/img/loader.gif' alt=''/></div>"
    });

    dojo.mixin(app.ui.WaitingDialog, {
        show: function() {
            waiter.closeButtonNode.style.visibility = "hidden";
            waiter.show();
        },

        close: function() {
            waiter.hide();
        }
    });
});