define(['widget','jquery'],function(widget,$){

	function Window(){

		//弹窗默认设置
		this.cfg= {
			width: 500,
			height:300,
			//设置内容和回调的默认值
			content: '',
			title: '系统消息',
			//定制alert弹窗按钮文案
			textForAlertBtn: "确定",

			//定制confirm弹窗按钮文案
			textForConfirmBtn: "确定",
			textForCancelBtn: "取消",

			//确定alert按钮回调函数
			handlerForAlertBtn: null,
			//关闭按钮回调函数
			handlerForCloseBtn: null,

			//confirm按钮回调函数
			handlerForConfirmBtn: null,
			handlerForCancelBtn: null,

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

	 		var footerContent = "";

	 		switch(this.cfg.winType){
	 			case "alert" :
	 				footerContent = '<input class=window_alertBtn type="button" value="' +this.cfg.textForAlertBtn+ '">';
	 				break;

	 			case "confirm":
	 				footerContent = '<input type="button" class="window_confirmBtn" value="' +this.cfg.textForConfirmBtn +'"><input type="button" class="window_cancelBtn" value="'+this.cfg.textForCancelBtn +'">';
	 				break;
	 		}

	 		this.boundingBox = $('<div class="window_boundingBox">' +
	 								'<div class="window_header">' + this.cfg.title + '</div>' +
	 								'<div class="window_body">' + this.cfg.content + '</div>' +
	 								'<div class="window_footer">' + footerContent +
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
	 		}).delegate('.window_confirmBtn','click',function(){
	 			that.fire("confirm");
	 			that.destroy();
	 		}).delegate('.window_cancelBtn','click',function(){
	 			that.fire("cancel");
	 			that.destroy();
	 		});

	 		if (this.cfg.handlerForAlertBtn) {
	 			this.on("alert",this.cfg.handlerForAlertBtn);
	 		};

	 		if (this.cfg.handlerForCloseBtn) {
	 			this.on("close",this.cfg.handlerForCloseBtn);
	 		};

	 		if (this.cfg.handlerForConfirmBtn) {
	 			this.on('confirm',this.cfg.handlerForConfirmBtn);
	 		};

	 		if (this.cfg.handlerForCancelBtn) {
	 			this.on('cancel',this.cfg.handlerForCancelBtn);
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

	 		$.extend(this.cfg,cfg,{winType: "alert"});
	 		this.render();
	 		return this;

	 	},

	 	//confirm弹窗方法
	 	confirm: function(cfg){

	 		$.extend(this.cfg,cfg,{winType: "confirm"});
	 		this.render();
	 		return this;

	 	},

	 	//prompt弹窗方法
	 	prompt: function(){}
	 });

	 return {
	 	Window: Window
	};
})