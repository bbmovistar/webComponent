//将之前的on和fire方法抽象出来，成为一个widget类，以后可以将该类扩展至其他组件中！
define(['jquery'],function($){

	function Widget(){
		this.boundingBox = null;//属性：最外层容器（将boundingBox由一个变量上升到widget的一个属性）
		// this.handlers = {};
	}
	
	Widget.prototype = {

		on: function(type,handler){				//事件类型和回调函数
	 		if (typeof this.handlers[type] == "undefined") {
	 			this.handlers[type] = [];
	 		};
	 		this.handlers[type].push(handler);
	 		return this; 						//通过return this实现连缀语法，即链式调用
	 	},

	 	fire: function(type,data){				//事件类型和回调函数需要传入的参数
	 		if (this.handlers[type] instanceof Array) {
	 			var handlers = this.handlers[type];
	 			for (var i = 0; i < handlers.length; i++) {
	 				handlers[i](data);
	 			};
	 		};
	 		return this;
	 	},

	 	render: function(container){ 	//方法：渲染组件
	 		this.renderUI();
	 		this.handlers = {};
	 		this.bindUI();
	 		this.syncUI();
	 		$(container || document.body).append(this.boundingBox);
	 	},

	 	destroy: function(){	  //方法：销毁组件
	 		this.destructor();
	 		this.boundingBox.off();
	 		this.boundingBox.remove();
	 	},

	 	//这里只定义各个接口的名称，具体接口的内容，在各个组件中实现
	 	renderUI: function(){ },//接口：添加dom节点
	 	bindUI: function(){ }, //接口：监听事件
	 	syncUI: function(){ }, //接口：初始化组件属性
	 	destructor: function(){}//接口：销毁前的处理函数
	 	
	}
	return {
		Widget: Widget
	}
})