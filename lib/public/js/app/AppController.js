dojo.provide("app.AppController");

dojo.require("app.TaskStore");
dojo.require("app.ui.TaskBoard");
dojo.require("app.ui.TaskView");
dojo.require("app.ui.TaskEditDialog");
dojo.require("app.AppRegistry");

dojo.declare("app.AppController", null, {

    taskEditDialog: null,

    constructor: function() {
       this.taskBoard = new app.ui.TaskBoard(this);
       this.store = new app.TaskStore({target: "/tasks/"});
       this.taskEditDialog = new app.ui.TaskEditDialog();
    },

    init: function() {
        this.taskBoard.init();
        var self = this;
        this.store.fetch(
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
        this.taskEditDialog.show({ title:"", description: ""},
                                 dojo.hitch(this, function(task)
        {
            task = this.store.newItem(task);
            this.store.save();
            this.taskBoard.addTask(task);
        }));
    },

    onEditTask: function(taskView) {
        this.taskEditDialog.show(taskView.task,
                                 dojo.hitch(this, function(task)
        {
            this.store.setValue(taskView.task, "title", task.title);
            this.store.setValue(taskView.task, "description", task.description);
            this.store.save();
            taskView.update();
        }));
    },

    onDeleteTask: function(taskView) {
        this.store.deleteItem(taskView.task);
        this.store.save();
        taskView.destroy();
    },

    onDropTask: function(taskView, column) {
        this.store.setValue(taskView.task, "column", column);
        this.store.save();
    },

    taskCreator: function(item) {
        var task = new app.ui.TaskView(this, item);
        return { node: task.domNode, data: item };
    }

});
