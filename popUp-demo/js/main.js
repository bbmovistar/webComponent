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
});