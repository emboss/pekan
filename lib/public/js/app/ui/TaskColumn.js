dojo.provide("app.ui.TaskColumn");

dojo.require("dojo.dnd.Source");

dojo.declare("app.ui.TaskColumn", null, {

   constructor: function(controller, columnNode, definition) {
       this.domNode = columnNode;
       this.definition = definition;
       var creator = dojo.hitch(controller, controller.taskCreator);
       this.source = new dojo.dnd.Source(this.domNode, { creator: creator });
   }

});