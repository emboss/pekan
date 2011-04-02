dojo.provide("app.TaskBoardController");

dojo.require("app.TaskStore");
dojo.require("app.ProjectStore");
dojo.require("app.ui.TaskBoard");
dojo.require("app.ui.TaskView");
dojo.require("app.ui.TaskEditDialog");
dojo.require("app.AppRegistry");

dojo.declare("app.TaskBoardController", null, {
    constructor: function() {
       this.taskBoard = new app.ui.TaskBoard(this);
       this.taskStore = new app.TaskStore({ target: app.AppRegistry.taskUrl});
       this.projectStore = new app.ProjectStore({ target: app.AppRegistry.projectUrl});
       this.taskEditDialog = new app.ui.TaskEditDialog();
    },

    init: function() {
        this.taskBoard.init();
        var self = this;
        this.taskStore.fetch(
        {
            onComplete: dojo.hitch(self, self._initTasks)
        });
    },

    _initTasks: function(items) {
        dojo.forEach(items, dojo.hitch(this, function(task) {
            this.taskBoard.insertTask(task);
        }));
    },

    onAddItem: function() {
        this.taskEditDialog.show({ description: "" },
                                 dojo.hitch(this, function(data)
        {
            var task = {
                description: data.description,
                projectId: data.item.id,
                column: this.taskBoard.columns[0].definition.dbTable,
                archived: false
            };

            task = this.taskStore.newItem(task);
            this.taskStore.save({
                onComplete: dojo.hitch(this, function() {
                    this.taskBoard.addTask(task);
                })
            });
        }));
    },

    onEditTask: function(taskView) {
        this.projectStore.fetch({
            query: taskView.task.projectId,
            onComplete: dojo.hitch(this, function(items) {
                this.taskEditDialog.show({
                    item: items[0],
                    description: taskView.task.description
                },
                dojo.hitch(this, function(data) {
                    this.taskStore.setValue(taskView.task, "description", data.description);
                    this.taskStore.setValue(taskView.task, "projectId", data.item.id);
                    this.taskStore.save({
                        onComplete: function() {
                            taskView.update();
                        }
                    });
                }))
            })
        });
    },

    onDeleteTask: function(taskView) {
        this.taskStore.deleteItem(taskView.task);
        this.taskStore.save();
        taskView.destroy();
    },

    onDropTask: function(taskView, column) {
        this.taskStore.setValue(taskView.task, "column", column);
        this.taskStore.save();
    },

    onArchiveTasks: function() {

    },

    onAdministration: function() {

    },

    taskCreator: function(item) {
        var task = new app.ui.TaskView(this, item);
        return { node: task.domNode, data: item };
    }

});

