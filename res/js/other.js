 //主菜单刚显示时发出一个resize()消息
$(document).on('pageshow', '#dishPage', function () {
	  $(window).resize();
	  setTimeout("$(window).resize();",250);
});


$(document).on('pageinit','[data-role=page]', function(){
    $('[data-position=fixed]').fixedtoolbar({ tapToggle:false});//使底部栏不会因为点击而被消隐
    $(".activity").parent().removeClass("ui-btn-up-d");//消去activity下的一条横线
});

//点菜单显示初始化
$(document).on('pagebeforeshow', '#myOrderPage', function () {
	$.ajax({
        type : "post",
        url : "getMyOrder",
        dataType:"json",
	    success : function(msg) {
	       $("#myOrder").html(msg.myOrderList);
	       $("#totalCost").text(msg.totalCost);
	       $("#averageCost").text(msg.averageCost);
	       $("#myOrderPage div[data-role=header] .ui-title").text("桌号："+msg.deskId+"，人数："+msg.personNum);
	    } ,
	     error:function(error){
	     	console.log(error+"selectDesk");
 		}
	});
});

//当进入praPayPage2时自动开始下载
$(document).on("pageinit","#prePayPage",function(){
	 location.href="download";
});


$(document).on("pageinit","#homePage",function(){
    //根据表头是否显示来决定滑动条和箭头的显示
    if($("#formHeader1").attr("style").indexOf("none") < 0)
    {
    	   $(".circle").hide();
		   $(".owl-numSlider").hide();
		   isSelect1=true;
		   isSelect2=true;
	       showArrows(1);
	       showArrows(2);
    }
});

//检测用户是否已点菜
function checkOrder()
{
	var result = false;
	$.ajax({
        type : "post",
        url : "checkOrder",
        async: false, //设为同步请求
        dataType:"text",
	    success : function(msg) {
	    	if(msg == "1")
	    	{
	    		location.href = "#myOrderPage";
	    		result = true;
	    	}
	    	else
    		{
	    		 $('.tipAnchor').qtip('option', 'content.text', "您还没有选菜！");
				 $('.tipAnchor').qtip('toggle', true);
				 $('#tipAnchor2').qtip('option', 'content.text', "您还没有选菜！");
				 $('#tipAnchor2').qtip('toggle', true);
	    		 result = false;
    		}
	    } ,
	     error:function(error){
	     	alert("error:checkOrder");
 		}
	});
	return result;
}

function checkOrder2()
{
	var result = false;
	$.ajax({
        type : "post",
        url : "checkOrder",
        async: false, //设为同步请求
        dataType:"text",
	    success : function(msg) {
	    	if(msg == "0")
    		{
	    		alert("你还没有选菜！");
	    		result = false;
    		}
	    	else
	    		result = true;
	    } ,
	     error:function(error){
	     	alert("error:checkOrder");
 		}
	});
	return result;
}

//点击重置时执行
function showNumSlider(obj){
	// 发送信息，删除该桌
	 $.ajax({
	        type : "post",
	        url : "Stand",
	        dataType:"text",
		    success : function(result) {
		    	if(result== -1){
		    		location.href="SystemPrompt?type=-1";
		    	}
		    } ,
		     error:function(error){
		     	alert("error: resetTableNo");
	 		}
	});

	$(obj).parent().hide();
	if($(obj).parents(".formHeader").first().attr("id")=="formHeader1")
	{
		$("#owl-numSlider1").show();
		isSelect1 = false;
		$("#circle1").show();
		$("#prevArrow1").hide();
    	$("#nextArrow1").hide();
	}
	else
	{
		$("#owl-numSlider2").show();
		isSelect2 = false;
		$("#circle2").show();
		$("#prevArrow2").hide();
    	$("#nextArrow2").hide();
	}
}

//人工支付
function humanPay()
{
	 //先检查是否已点菜
	 if(!checkOrder2())
		 return;
	 $.ajax({
	        type : "post",
	        url : "humanPay",
	        dataType:"text",
		    success : function() {
		    	alert("您的请求已发出，小二马上就来....");
		    } ,
		     error:function(error){
		     	alert("error:humanPay");
	 		}
   	});
}

//检查是否已付钱，避免重复支付
function prePay(msg)
{
	var result = false;
	//在后台检测是否已付费
	$.ajax({
        type : "post",
        url : "isFinished",
        async: false, //设为同步请求
        dataType:"text",
	    success : function(msg) {
	    	if(msg == "1")
    		{
	    		result = true;
    		}
	    	else
	    		result = false;
	    } ,
	     error:function(error){
	     	alert("error:checkOrder");
 		}
	});
	if(result == true)
	{
		alert("您已付款！");
		return;
	}

	if(msg == 'z')
	{
		location.href = "login";
	}
	else if(msg == 'r')
	{
		humanPay();
	}
}