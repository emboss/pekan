dojo.provide("app.AppRegistry");
dojo.provide("app.AppRegistry.TaskBoard");
dojo.provide("app.AppRegistry.Setup");

dojo.ready(function() {
    dojo.mixin(app.AppRegistry, {
        taskUrl: "/tasks/",
        projectUrl: "/projects/",
        counterUrl: "/counters/"
    });

    dojo.mixin(app.AppRegistry.TaskBoard, {
        containerNode: document.getElementById("container"),
        addItemNode: dojo.query("#add-task span").shift(),
        archiveItemNode: dojo.query("#archive-task span").shift(),
        administrationNode: dojo.query("#admin span").shift(),

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
        projectsNode: document.getElementById("projects"),
        projectInputNode: document.getElementById("project"),
        createProjectNode: document.getElementById("create")
    });
});