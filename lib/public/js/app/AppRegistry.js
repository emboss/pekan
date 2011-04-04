dojo.provide("app.AppRegistry");
dojo.provide("app.AppRegistry.TaskBoard");
dojo.provide("app.AppRegistry.Setup");

dojo.ready(function() {
    dojo.mixin(app.AppRegistry, {
        taskUrl: "/tasks/",
        projectUrl: "/projects/",
        counterUrl: "/counters/",

        dialogClass: "pekan dijitDialog",

        dialogSubmitNode: ".pekan.dijitDialog .button-panel .submit",
        dialogCancelNode: ".pekan.dijitDialog .button-panel .cancel",
        dialogContentNode: ".pekan.dijitDialog .dijitDialogPaneContent span"
    });

    dojo.mixin(app.AppRegistry.TaskBoard, {
        containerNode: "#container",
        addItemNode: "#add-task span",
        archiveItemNode: "#archive-task span",
        adminItemNode: "#admin span",

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

    dojo.mixin(app.AppRegistry.Setup, {
        projectsNode: "#projects",
        projectInputNode: "#project",
        createProjectNode: "#create"
    });
});