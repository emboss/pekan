dojo.provide("app.ui.TaskAvatar");

dojo.declare("app.ui.TaskAvatar", null, {

    constructor: function(manager){
		this.manager = manager;
		this.construct();
	},

	construct: function(){
        var a = dojo.create("div", {
            "class": "dojoDndAvatar",
            style: {
                position: "absolute",
                zIndex:   "1999",
                margin:   "0px",
                padding: "0px"
            }
        });
	    var source = this.manager.source;
        var node = source._normalizedCreator(source.getItem(this.manager.nodes[0].id).data, "avatar").node;
		node.id = "";
        node.style.margin = "0px";
        a.appendChild(node);
        this.node = a;
	},
	destroy: function(){
		dojo.destroy(this.node);
		this.node = false;
	},
	update: function(){
		dojo[(this.manager.canDropFlag ? "add" : "remove") + "Class"](this.node, "dojoDndAvatarCanDrop");
	}
});
