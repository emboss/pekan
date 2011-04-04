dojo.provide("app.StoreUtil");

dojo.require("app.ui.Dialogs");

dojo.mixin(app.StoreUtil, {
    save: function(store, args) {
        var mixinArgs = this._augmentArgs(args);
        store.save(mixinArgs);
    },

    fetch: function(store, args) {
        var mixinArgs = this._augmentArgs(args);
        store.fetch(mixinArgs);
    },

    _augmentArgs: function(args) {
        app.ui.WaitingDialog.show();
        var mixinArgs = args || {};
        var oldOnComplete = mixinArgs.onComplete || function() {};
        dojo.mixin(mixinArgs, {
           onComplete: function(items) {
               app.ui.WaitingDialog.close();
               oldOnComplete(items);
           },
           onError: function(error) {
               app.ui.WaitingDialog.close();
               app.ui.ErrorDialog.show(error);
           }
        });
        return mixinArgs;
    }
});