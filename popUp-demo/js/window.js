define(['widget','jquery'],function(widget,$){
	function Window(){

		//弹窗默认设置
		this.cfg= {
			width: 500,
			height:300,
			//设置内容和回调的默认值
			content: '',
			title: '系统消息',
			//定制按钮文案
			textForAlertBtn: "确定",
			//确定按钮回调函数
			handlerForAlertBtn: null,
			//关闭按钮回调函数
			handlerForCloseBtn: null,
			//关闭按钮
			hasCloseBtn: false,
			//定制皮肤
			skinClassName: null,
			//遮罩层
			hasMask: true
		};
		this.handlers = {};
	};

	//自定义事件的本质是：“观察者模式”！！！
	Window.prototype= $.extend({},new widget.Widget(),{

	 	renderUI: function(){
	 		this.boundingBox = $('<div class="window_boundingBox">' +
	 								'<div class="window_header">' + CFG.title + '</div>' +
	 								'<div class="window_body">' + CFG.content + '</div>' +
	 								'<div class="window_footer"><input class="window_alertBtn" type="button" value="'+CFG.textForAlertBtn+'"></div>' +
	 							'</div>'
	 						);

	 		if (this.cfg.hasMask) {
	 			this._mask = $('<div class="window_mask"></div>');
	 			this._mask.appendTo("body");
	 		};

	 		if (this.hasCloseBtn) {
	 			this.boundingBox.append('<span class="window_closeBtn">X</span>');
	 		}
	 		this.boundingBox.appendTo(document.body);
	 	},

	 	bindUI: function(){
	 		var that = this;

	 		this.boundingBox.delegate('.window_alertBtn','click',function(){
	 			that.fire("alert");
	 			that.destroy();
	 		}).delegate('.window_closeBtn','click',function(){
	 			that.fire("close");
	 			that.destroy();
	 		});

	 		if (this.cfg.handlerForAlertBtn) {
	 			this.on("alert",handlerForAlertBtn);
	 		};

	 		if (this.cfg.handlerForCloseBtn) {
	 			this.on("close",handlerForCloseBtn);
	 		};
	 	},

	 	syncUI: function(){ 
	 		this.boundingBox.css({
	 			width: CFG.width + "px",
	 			height: CFG.height + "px",
	 			left: (CFG.x || (window.innerWidth - CFG.width)/2) + "px",
	 			top : (CFG.y || (window.innerHeight - CFG.height)/2 + "px")
	 		});

	 		if (this.cfg.skinClassName) {
	 			this.boundingBox.addClassName(this.cfg.skinClassName);
	 		};
	 	},

	 	destructor: function(){
	 		this._mask && this._mask.remove();
	 	},
	 	//alert弹窗方法
	 	alert: function(cfg){

	 		$.extend(this.cfg,cfg);
	 		this.render();
	 		return this;

	 		// var CFG = $.extend(this.cfg,cfg);
	 		// //遮罩层
	 		// mask = null;
	 		// that = this;
	 		// if (CFG.hasMask) {
	 		// 	mask = $('<div class="window_mask"></div>');
	 		// 	mask.appendTo('body');
	 		// };
	 		// //弹窗框
	 		// var boundingBox = $('<div class="window_boundingBox">' +
	 		// 						'<div class="window_header">' + CFG.title + '</div>' +
	 		// 						'<div class="window_body">' + CFG.content + '</div>' +
	 		// 						'<div class="window_footer"><input class="window_alertBtn" type="button" value="'+CFG.textForAlertBtn+'"></div>' +
	 		// 					'</div>'
	 		// 				);

	 		// boundingBox.appendTo('body');

	 		// //设置弹窗的样式
	 		// boundingBox.css({
	 		// 	width: CFG.width + "px",
	 		// 	height: CFG.height + "px",
	 		// 	left: (CFG.x || (window.innerWidth - CFG.width)/2) + "px",
	 		// 	top : (CFG.y || (window.innerHeight - CFG.height)/2 + "px")
	 		// });

	 		// //设置关闭按钮
	 		// if (CFG.hasCloseBtn) {
	 		// 	closeBtn = $('<span class="window_closeBtn">X</span>');
	 		// 	closeBtn.appendTo(boundingBox);
	 		// };

	 		// var alertBtn = boundingBox.find(".window_footer input");
	 		// alertBtn.click(function(){
	 		// 	// CFG.handlerForAlertBtn && CFG.handlerForAlertBtn();
	 		// 	boundingBox.remove();
	 		// 	mask && mask.remove();
	 		// 	that.fire("alert");
	 		// });

	 		// closeBtn.click(function(){
	 		// 		// CFG.handlerForCloseBtn && CFG.handlerForCloseBtn();								
	 		// 		boundingBox.remove();
	 		// 		mask && mask.remove();
	 		// 		that.fire("close");
	 		// });

	 		// if (CFG.handlerForAlertBtn) {
	 		// 	this.on("alert",CFG.handlerForAlertBtn);
	 		// };

	 		// if (CFG.handlerForCloseBtn) {
	 		// 	this.on("close",CFG.handlerForCloseBtn);
	 		// };

	 		// //定制皮肤
	 		// if(CFG.skinClassName){
	 		// 	boundingBox.addClassName(CFG.skinClassName);
	 		// }
	 	},
	 	confirm: function(){},
	 	prompt: function(){}
	 });

	 return {
	 	Window: Window
	};
})