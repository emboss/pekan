dojo.provide("app.AppRegistry");

dojo.ready(function() {
    dojo.mixin(app.AppRegistry, {
        containerNode: document.getElementById("container"),
        addItemNode: dojo.query("#add-task span").shift(),
        archiveItemNode: dojo.query("#archive-task span").shift(),
        admininstrationNode: dojo.query("#admin span").shift(),

        createProjectNode: dojo.query("#create").shift(),

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
        ],

        taskUrl: "/tasks/",
        projectUrl: "/projects/",
        counterUrl: "counters"
    });
});