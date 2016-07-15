require.config({
	paths: {
		jquery: 'jquery-1.11.3'
	}
});

require(['jquery','window'],function($,w){
	$('#a').click(function(){
		new w.Window().alert(
		{
			title: '提示',
			width: 300,
			height: 150,
			y: 50,
			content: "Welcome!",
			textForAlertBtn: "哈哈",
			hasCloseBtn: true,
			// skinClassName: "window_skin_a",
			handlerForAlertBtn: function(){
				alert("you click the alert button");
			},
			handlerForCloseBtn: function(){
				alert("you click the close button");
			}
			
		})
	});

	$('#b').click(function(){
		new w.Window().confirm({

			title: '提示',
			width: 300,
			height: 150,
			y: 50,
			content: "您确定要删除这个文件吗？",
			textForConfirmBtn: "是",
			textForCancelBtn: "否",
			handlerForConfirmBtn: function(){
				alert("确定");
			},
			handlerForCancelBtn: function(){
				alert("取消");
			}

		}).on("confirm",function(){
			alert("confirm");
		}).on("cancel",function(){
			alert("cancel");
		})
	});

	$('#c').click(function(){
		new w.Window().prompt({
			title: '请输入您的名字',
			width: 300,
			height: 150,
			y: 50,
			content: "我们将会为您保密您输入的信息",
			textForPromptBtn: "输入",
			textForCancelBtn: "取消",
			defaultValueForPromptInput: "张三",
			handlerForPromptBtn: function(inputValue){
				alert("您输入的内容是：" + inputValue);
			},
			handlerForCancelBtn: function(){
				alert("取消");
			}
		})
	});

	$('#d').click(function(){
		new w.Window().common({
			width: 400,
			height: 300,
			y: 50,
			textForCommonBtn: "保存",
			textForCancelBtn: "取消",
			defaultValueForCommonInput: "12345678912",
			handlerForCommonBtn: function(inputValue){
				alert("您保存的手机号是：" + inputValue);
			},
			handlerForCancelBtn: function(){
				alert("取消");
			}
		})
	});
});