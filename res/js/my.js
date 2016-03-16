function docheck(obj) 
{
	 var parent=$(obj).parents("li").first();
	 var  myData;
	 if(parent.attr("data-icon")=="check")
	 {	
		  parent.attr("data-theme","c");
		  parent.removeClass("ui-li-has-arrow ui-btn-hover-e  ui-btn-up-e"); 
		  parent.attr("data-icon","false");//设置为不选
		  parent.children("div").first().children("span").first().remove();
		  myData="foodId="+$(obj).attr("id")+"&op=-1";	//"name=John&location=Boston" 		  
	 }
	 else
	 {
		  parent.attr("data-theme","e");
          parent.addClass("ui-li-has-arrow ui-btn-hover-e  ui-btn-up-e");
		  parent.attr("data-icon","check");
		  parent.children("div").first().append("<span class=\"ui-icon ui-icon-check ui-icon-shadow\"></span>");  
		  myData="foodId="+$(obj).attr("id")+"&op=1";
	  }
	 $.ajax( {  
	        type : "post",  
	        url : "/order/doStatistic", 
	        data: myData,
	        dataType:"text",  
	        success : function(msg) { 
	        	var jsonObj=eval(msg);
	        	//alert("json2 Success!: " + msg +" "+jsonObj.TotalC+" "+jsonObj.TotalCost);
	        	$("#statistic").children().first().children().first().text("我的菜单,  共："+jsonObj.TotalC+"种, ￥"+jsonObj.TotalCost);
	        	$("#statistic2").children().first().children().first().text("我的菜单,  共："+jsonObj.TotalC+"种, ￥"+jsonObj.TotalCost);
	            var cgId=jsonObj.cgId;
	            var count=jsonObj.count;
	            var spanObj=$("#"+cgId).children().first();
	        	if(count=="0")
	        	{
	        		spanObj.removeClass();
	        		spanObj.text("");//相当于去掉span标签的显示
	        	}
	        	else
	        	{
	        		spanObj.parents("li").first().addClass("ui-li-has-count");
	        		spanObj.addClass("ui-li-count ui-btn-up-c ui-btn-corner-all");
	        		spanObj.text(count);
	        	}
	        	
	        } , 
		     error:function(error){
		    	 alert("json fail 2"); 
		     	console.log(error+"doStatistic");
		 	} 		 
	    });    
}


function jump(count) {  
    window.setTimeout(function(){  
        count--;  
        if(count > 0) {  
            $('#num').text(count);  
            jump(count);  
        } else {  
           location.href="/order/seeCategory";  
        }  
    }, 1000);  
}  

function checkOrder(toPath) {  //检测是否有点菜
	 $.ajax( {  
	        type : "post",  
	        url : "/order/checkOrder", 
	        dataType:"text",  
	        success : function(msg) { 
	        	if(msg=="0")
	        	{
	        		$("#poplink").click();
	        	}
	        	else
	        	{
	        		location.href=toPath;  
	        	}
	        	
	        } , 
		     error:function(error){
		    	alert("ajax fail"); 
		     	console.log(error+"checkOrder");
		 	} 		 
	    });    
} 

$(document).on('pageinit', function () {
	//通过ajax检测session中是否存在订单号，如果没有弹出对话框，让其返回首页选桌号和人数，如果已经有订单号了，则什么也做顺利载入页面
	//用户选定桌号人数以后即产生一个订单号
	
});

