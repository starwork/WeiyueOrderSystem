$(document).on("pageinit","#homePage",function(){
	//页面载入后自动显示“点我哦”
	$('#tipAnchor1').qtip({
		show:{
			event:'click',
		},
		hide:{
			event:'unfocus'
		},
		content: '点我哦',
		 position: {
			my: 'bottom left',  // Position my top left...
			at: 'top right', // at the bottom right of...
			target: $("#sayPoint1") // my target
		 },
	 });
	 $('#tipAnchor1').qtip('toggle', true);
	 
	//点击吉祥物，提示选择桌号
	 $('.mascot').click(function(){
		$('#tipAnchor1').qtip('option', 'content.text', '请先选择桌号，请按您实际坐的座位<br/><br/>选择桌号哦！');
	   $('#tipAnchor1').qtip('toggle', true);
   });
});

//初始化在主菜单中的tip锚点
$(document).on("pageinit","#dishPage",function(){
	  $('#tipAnchor2').qtip({
			show:{
				event:'click',
			},
			hide:{
				event:'unfocus'
			},
			content: '点我哦',//注意最初的text一定要有！，否则，之后替换text的操作会无效！
			 position: {
				my: 'bottom left',  
				at: 'top right', 
				target: $("#sayPoint2") 
			 },
	}); 
});	 

//初始化并打开在myOrderPage中的tip锚点
$(document).on('pageshow', '#myOrderPage', function () { 
	 $('#tipAnchor3').qtip({
			show:{
				event:'click',
			},
			hide:{
				event:'unfocus'
			},
			content: '点我哦',//注意最初的text一定要有！，否则，之后替换text的操作会无效！
			 position: {
				my: 'bottom left',  
				at: 'top right', 
				target: $("#sayPoint3") 
			 },
	});
	   
	 $.ajax({  
	        type : "post",  
	        url : "getRecommendDish", 
	        dataType:"json",  
		    success : function(msg) { 
		    	if(msg.foodName == "0")
		    		return;
		    	$('#tipAnchor3').qtip('option', 'content.text', '要不要试试这个特价菜？<br/><a href="#homePage" onclick="moveRecommend('+msg.foodId+')"><img src="images/' + msg.foodName + '.jpg"><a>');
		    	$('#tipAnchor3').qtip('toggle', true);
		    } , 
		     error:function(error){
		     	alert("error:getRecommendDish");
	 		} 
  	}); 
});

//将推荐菜移动到owl-recommend1的首位
function moveRecommend(foodId)
{
	var activeItem = $("#owl-recommend1 .item[foodid='"+foodId+"']").parents(".owl-item").first();
	if(!activeItem.hasClass("active"))
	{
		var index = jQuery.inArray(activeItem.get(0),$("#owl-recommend1").find(".owl-item"));
		var owl = $("#owl-recommend1").data('owlCarousel');
		owl.goTo(index);
	}
}












	