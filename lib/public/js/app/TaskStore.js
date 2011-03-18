dojo.provide("app.TaskStore");

dojo.require("dojox.data.JsonRestStore");

dojo.declare("app.TaskStore", [ dojox.data.JsonRestStore ], {

});

/**
 * Task: { title, description, column }
 */
