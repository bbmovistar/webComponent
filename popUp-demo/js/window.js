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
	 								'<div class="window_header">' + this.cfg.title + '</div>' +
	 								'<div class="window_body">' + this.cfg.content + '</div>' +
	 								'<div class="window_footer"><input class="window_alertBtn" type="button" value="'+this.cfg.textForAlertBtn+'"></div>' +
	 							'</div>'
	 						);

	 		if (this.cfg.hasCloseBtn) {
	 			this.boundingBox.append('<span class="window_closeBtn">X</span>');
	 		}

	 		if (this.cfg.hasMask) {
	 			this._mask = $('<div class="window_mask"></div>');
	 			this._mask.appendTo("body");
	 		};

	 		this.boundingBox.appendTo(document.body);

	 	},

	 	bindUI: function(){

	 		var that = this;

	 		this.boundingBox.delegate('.window_alertBtn','click',function(){ //这里是匿名函数，如果不将this赋值给that
	 			that.fire("alert");											 //执行匿名函数中的代码将会报错，this会指向浏览器window对象
	 			that.destroy();
	 		}).delegate('.window_closeBtn','click',function(){
	 			that.fire("close");
	 			that.destroy();
	 		});

	 		if (this.cfg.handlerForAlertBtn) {
	 			this.on("alert",this.cfg.handlerForAlertBtn);
	 		};

	 		if (this.cfg.handlerForCloseBtn) {
	 			this.on("close",this.cfg.handlerForCloseBtn);
	 		};

	 	},

	 	syncUI: function(){ 

	 		this.boundingBox.css({
	 			width: this.cfg.width + "px",
	 			height: this.cfg.height + "px",
	 			left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px",
	 			top : (this.cfg.y || (window.innerHeight - this.cfg.height)/2 + "px")
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

	 	},

	 	//confirm弹窗方法
	 	confirm: function(){},

	 	//prompt弹窗方法
	 	prompt: function(){}
	 });

	 return {
	 	Window: Window
	};
})