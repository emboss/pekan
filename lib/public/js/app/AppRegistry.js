dojo.provide("app.AppRegistry");

dojo.ready(function() {
    dojo.mixin(app.AppRegistry, {
        containerNode: document.getElementById("container"),
        addItemNode: dojo.query("#add-task .add").shift(),

        columns:
        [
            {
                title: "BACKLOG",
                id: "backlog",
                dbTable: "BACKLOG",
                headerClass: "column-header",
                containerClass: "task-container"
            },
            {
                title: "IN PROGRESS",
                id: "in-progress",
                dbTable: "IN_PROGRESS",
                headerClass: "column-header",
                containerClass: "task-container"
            },
            {
                title: "DONE",
                id: "done",
                dbTable: "DONE",
                headerClass: "column-header",
                containerClass: "task-container"
            }
        ]
    });
});
