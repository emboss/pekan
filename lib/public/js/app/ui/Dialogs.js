dojo.provide("app.ui.Dialogs");
dojo.provide("app.ui.WaitingDialog");
dojo.provide("app.ui.ErrorDialog");
dojo.provide("app.ui.ConfirmationDialog");

dojo.require("dijit.Dialog");
dojo.require("app.AppRegistry");

dojo.ready(function() {

    var waiter = new dijit.Dialog({
        title: "Please wait...",
        content: "<div style='text-align: center'><img src='/img/loader.gif' alt=''/></div>"
    });

    dojo.mixin(app.ui.WaitingDialog, {
        visible: false,

        show: function() {
            if (this.visible)
                return;
            waiter.domNode.className = app.AppRegistry.dialogClass;
            waiter.closeButtonNode.style.visibility = "hidden";
            waiter.show();
            this.visible = true;
        },

        close: function() {
            if (!this.visible)
                return;
            waiter.hide();
            this.visible = false;
        }
    });

    var errorDialog = new dijit.Dialog({
        title: "An error occurred.",
        content: dojo.cache("app.ui", "templates/ErrorDialog.html")
    });

    dojo.mixin(app.ui.ErrorDialog, {
        visible: false,

        show: function(error) {
            if (this.visible) {
                //TODO add to existing errors
                errorDialog.hide();
            }
            errorDialog.domNode.className = app.AppRegistry.dialogClass;
            errorDialog.closeButtonNode.style.visibility = "hidden";
            var contentNode = dojo.query(app.AppRegistry.dialogContentNode);
            contentNode.innerHtml = error.toString();
            var okButton = dojo.query(app.AppRegistry.dialogSubmitNode).shift();
            this.handle = dojo.connect(okButton, "onclick", this, this._onSubmit);
            errorDialog.show();
            this.visible = true;
        },

        _onSubmit: function() {
            dojo.disconnect(this.handle);
            errorDialog.hide();
        }
    });

    var confirmationDialog = new dijit.Dialog({
        title: "Please confirm...",
        content: dojo.cache("app.ui", "templates/ConfirmationDialog.html")
    });

    dojo.mixin(app.ui.ConfirmationDialog, {
        oldHandles: [],
        visible: false,

        show: function(content, onSubmit, onCancel) {
            if (this.visible) {
                confirmationDialog.hide();
            }
            dojo.forEach(this.oldHandles, dojo.disconnect);
            this.oldHandles = [];
            confirmationDialog.domNode.className = app.AppRegistry.dialogClass;
            confirmationDialog.closeButtonNode.style.visibility = "hidden";
            this.submitCb = onSubmit;
            this.cancelCb = onCancel;
            console.log(dojo.query(app.AppRegistry.dialogContentNode).shift());
            dojo.query(app.AppRegistry.dialogContentNode).shift().innerHTML = content;
            var okButton = dojo.query(app.AppRegistry.dialogSubmitNode).shift();
            var cancelButton = dojo.query(app.AppRegistry.dialogCancelNode).shift();
            this.oldHandles.push(dojo.connect(okButton, "onclick", this, this._onSubmit));
            this.oldHandles.push(dojo.connect(cancelButton, "onclick", this, this._onCancel));
            this.oldHandles.push(dojo.connect(confirmationDialog, "onCancel", this, this._onCancel));
            confirmationDialog.show();
            this.visible = true;
        },

        _onSubmit: function() {
            confirmationDialog.hide();
            this.visible = false;
            this.submitCb();
        },

        _onCancel: function() {
            confirmationDialog.hide();
            this.visible = false;
            this.cancelCb();
        }
    });
});