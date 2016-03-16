//删除当前菜单里的一项
function removeLi()
{
	var foodId = currentLi.attr("foodid");
	var myData="foodId=" + foodId;
	$.ajax({
        type : "post",
        url : "rmFromCart",
        dataType:"text",
        data: myData,
	    success : function(result) {
	       if(result == "0")
	       {
	    		currentLi.remove();
	    		//接着改变前面显示的图片上的数字
		    	   var objs = $(".wrapper[foodid='" + foodId + "']");
		    	   var obj,i;
		    	   for(i=0; i < objs.size(); i++)
		    	   {
		    		   obj = objs.get(i);
		    		   if($(obj).find("span").length > 0)
			    		{
			      			spanObj=$(obj).find("span").first();
			      			spanObj.remove();
			      		}
		    	   }
	       }
	       setTwoCost();
	    } ,
	     error:function(error){
	     	console.log(error+"selectDesk");
 		}
	});
}

//设置更新myOrderPage中的表头，总价和人均
function setTwoCost()
{
	$.ajax({
        type : "post",
        url : "getTwoCost",
        dataType:"json",
	    success : function(msg) {
	    	$("#totalCost").text(msg.totalCost);
		    $("#averageCost").text(msg.averageCost);
		    $("#myOrderPage div[data-role=header] .ui-title").text("桌号："+msg.deskId+"，人数："+msg.personNum);
	    } ,
	     error:function(error){
	     	console.log(error+"selectDesk");
 		}
	});
}

//myOrderPage中的增减数量
function bubbleCount2(obj,opt)
{
	var amountObj=$(obj).parent().find(".amount").first();
	var foodId = $(obj).parents("li").first().attr("foodid");
	var myData="foodId=" + foodId;
	if(opt == 1)
	{

    	$.ajax({
	        type : "post",
	        url : "addToCart",
	        dataType:"text",
	        data: myData,
		    success : function(result) {
	    	   amountObj.text(parseInt(amountObj.text())+1);

	    	   //接着改变前面显示的图片上的数字
	    	   var objs = $(".wrapper[foodid='" + foodId + "']");
	    	   var obj,i;
	    	   for(i=0; i < objs.size(); i++)
	    	   {
	    		   obj = objs.get(i);
	    		   if($(obj).find("span").length==0)
		    		{
		    			desObj=$(obj).find("div").first();
		    			desObj.append("<span class='ui-li-count ui-btn-up-c ui-btn-corner-all' style='color:yellow;background: red;'>"+amountObj.text()+"</span>");
		    		}
		      		else{
		      			spanObj=$(obj).find("span").first();
		      			spanObj.text(amountObj.text());
		      		}
	    	   }
	    	   //更新人均和总金额
		       setTwoCost();
		    } ,
		     error:function(error){
		     	console.log(error+"selectDesk");
	 		}
    	});
	}

	if(opt==-1)
	{
		if(amountObj.text() == 1)//若全部删完
		{
			currentLi=$(obj).parents("li").first();
   			$("#popLink").click();
   			return;
		}

    	$.ajax({
	        type : "post",
	        url : "orderItemCut",
	        dataType:"text",
	        data: myData,
		    success : function(result) {
		    	if(amountObj.text() > 1)
	    	    {
	   			 	amountObj.text(parseInt(amountObj.text())-1);
		   			  //接着改变前面显示的图片上的数字
		 	    	   var objs = $(".wrapper[foodid='" + foodId + "']");
		 	    	   var obj,i;
		 	    	   for(i=0; i < objs.size(); i++)
		 	    	   {
		 	    		   obj = objs.get(i);
		 	    		   if($(obj).find("span").length > 0)
		 		    		{
		 		      			spanObj=$(obj).find("span").first();
		 		      			spanObj.text(amountObj.text());
		 		      		}
		 	    	   }

	    	    }
	    	    setTwoCost();
		    } ,
		     error:function(error){
		     	console.log(error+"selectDesk");
	 		}
    	});
	}

}

//myOrderPage中选好了
function pickOk()
{
	if(!checkOrder2())
	{
		 return;
	}
	else
	{
		// 发送信息，下单和打印小票
		 $.ajax({
		        type : "post",
		        url : "InvoiceAndOrderDone",
		        dataType:"text",
			    success : function(result) {
			    	if(result== -1){
			    		location.href="SystemPrompt?type=-1";
			    	}
			    } ,
			     error:function(error){
			     	alert("error: InvoiceAndOrderDone");
		 		}
		});
	   $("#downLoadLink").click();
	}
}

