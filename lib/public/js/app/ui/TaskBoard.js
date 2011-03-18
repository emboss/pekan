dojo.provide("app.ui.TaskBoard");

dojo.require("app.AppRegistry");
dojo.require("app.ui.TaskColumn");
dojo.require("app.ui.TaskAvatar");

dojo.declare("app.ui.TaskBoard", null, {
    controller: null,
    columns: new Array(),
    columnMap: {},

    constructor: function(controller) {
        this.controller = controller;
    },

    init: function() {
        this._setupBoard();
        this._initDnd();
        this._initEvents();
    },

    addTask: function(task) {
        task.column = this.columns[0].definition.dbTable;
        this.columns[0].source.insertNodes(false, [ task ]);
    },

    insertTask: function(task) {
        var column;
        if (task.column)
            column = this.columnMap[task.column];
        else
            column = this.columns[0];
        column.source.insertNodes(false, [ task ]);
    },

    _setupBoard: function() {
        this._createColumns(app.AppRegistry.columns);
    },

    _createColumns: function(columns) {
        dojo.forEach(columns, dojo.hitch(this, function(column) {
            var columnNode = dojo.create("div", { id: column.id });
            var title = dojo.create("div", { "class": column.headerClass });
            var tasks = dojo.create("div", { "class": column.containerClass});
            title.appendChild(document.createTextNode(column.title));
            columnNode.appendChild(title);
            columnNode.appendChild(tasks);
            var taskColumn = new app.ui.TaskColumn(this.controller, tasks, column);
            this.columns.push(taskColumn);
            this.columnMap[column.dbTable] = taskColumn;
            app.AppRegistry.containerNode.appendChild(columnNode);
        }));
    },

    _initDnd: function() {
        var dndManager = dojo.dnd.manager();
        dndManager.makeAvatar = function()
        {
            return new app.ui.TaskAvatar(dndManager);
        };
    },

    _initEvents: function() {
        dojo.connect(app.AppRegistry.addItemNode,
                     "onclick",
                     this.controller,
                     this.controller.onAddItem);

        dojo.forEach(this.columns, dojo.hitch(this, function(col) {
            dojo.connect(col.source, "onDropExternal", this, function(source, nodes, copy) {
                this._onDropTask(col.definition.dbTable, source, nodes, copy);
            });
        }));
    },

    _onDropTask: function(column, source, nodes) {
        dojo.forEach(nodes, dojo.hitch(this, function(node) {
            var taskView = dijit.byId(node.getAttribute("id"));
            this.controller.onDropTask(taskView, column);
        }));
    }
});
