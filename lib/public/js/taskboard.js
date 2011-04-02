dojo.require("app.ui.WaitingDialog");

dojo.ready(function() {
    app.ui.WaitingDialog.show();
    window.setTimeout(function() {
        dojo.ready(function() {
            dojo.require("app.TaskBoardController");
            dojo.ready(function() {
                new app.TaskBoardController().init();
                app.ui.WaitingDialog.close();
            });
        });
    }, 50);

});