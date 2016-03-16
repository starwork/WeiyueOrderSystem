$(document).on("pageinit","#homePage",function(){
	//初始化推荐菜品栏
	initRecommend();
	
	//点击菜品图片，数量增加
	$(".wrapper").click(function(){
		addToCart(this);
	}); 
	  
	//点击箭头时左右滑动	 
	$(".jcarousel-control").click(function(){
		clickArrow(this);
	});
	
	//在重新登入网址时，初始化菜品的数量
	initAmount();
});

function initRecommend()
{
	
	var recommendObj=$(".owl-recommend");
	$(recommendObj[0]).parents("li").first().removeClass("ui-li-static ui-btn-up-d").addClass("ui-li-has-count ui-li");//使得图片占的空间更大，并且使得汽包计数能够正常显示
	$(recommendObj[1]).parents("li").first().removeClass("ui-li-static ui-btn-up-d").addClass("ui-li-has-count ui-li");
	
    //初始化图片轮播
    $(".owl-recommend").owlCarousel({
	    items : 4,
	    itemsMobile:[130,1],
	    pagination:false,
	    addClassActive:true,
	    afterMove:function(){
	   		if(($(this.owl.baseElement).attr("id") == "owl-recommend1") && isSelect1 == true)
				showArrows(1);
	   		else if(($(this.owl.baseElement).attr("id") == "owl-recommend2") && isSelect2 == true)
	   			showArrows(2);
	   	},
    });
}


function addToCart(obj)
{
	if((!isSelect1)||(!isSelect2))
  	{	
  		     $('.tipAnchor').qtip('option', 'content.text', "请先选择桌号和人数！");
			 $('.tipAnchor').qtip('toggle', true);
			 $('#tipAnchor2').qtip('option', 'content.text', "请先选择桌号和人数！");
			 $('#tipAnchor2').qtip('toggle', true);

  	} 
  	else
	{
  		var myData="foodId=" + $(obj).attr("foodid");
    	$.ajax({  
	        type : "post",  
	        url : "addToCart", 
	        dataType:"text",  
	        data: myData,
		    success : function(result) { 
		       if(result == "-1")
		       {
		    	     $('.tipAnchor').qtip('option', 'content.text', "该菜品已售完！");
					 $('.tipAnchor').qtip('toggle', true);
					 $('#tipAnchor2').qtip('option', 'content.text', "该菜品已售完！");
					 $('#tipAnchor2').qtip('toggle', true);
		       }
		       if(result == "0")//数据库操作成功则改变气泡中的数字
		       {
		     		if($(obj).find("span").length==0)
		    		{
		    			desObj=$(obj).find("div").first();
		    			desObj.append("<span class='ui-li-count ui-btn-up-c ui-btn-corner-all' style='color:yellow;background: red;'>1</span>");
		    		}
		      		else{
		      			spanObj=$(obj).find("span").first();
		      			spanObj.text(parseInt(spanObj.text())+1);
		      		}	
		       }
		    } , 
		     error:function(error){
		     	console.log(error+"selectDesk");
	 		} 		 
		}); 
    	 	
	}
}

function clickArrow(obj)
{
	if($(obj).attr("id") == "prevArrow1")
		$("#owl-recommend1").trigger('owl.prev');
	if($(obj).attr("id") == "nextArrow1")
		$("#owl-recommend1").trigger('owl.next');
	if($(obj).attr("id") == "prevArrow2")
		$("#owl-recommend2").trigger('owl.prev');
	if($(obj).attr("id") == "nextArrow2")
		$("#owl-recommend2").trigger('owl.next');
}

//用于显示图片上的箭头
function showArrows(recommendNo)
{
	if(recommendNo == 1)
	{
		var recommendNum = $("#owl-recommend1 .owl-item").length;
		if($("#owl-recommend1 .owl-item").first().attr("class").indexOf("active") < 0)
		{
			$("#prevArrow1").show();
		}
		else{$("#prevArrow1").hide();}
		if($($("#owl-recommend1 .owl-item").get(recommendNum - 1)).attr("class").indexOf("active") < 0)
		{
			$("#nextArrow1").show();
		}
		else{$("#nextArrow1").hide();}
	}
	else
	{
		var recommendNum = $("#owl-recommend2 .owl-item").length;
		if($("#owl-recommend2 .owl-item").first().attr("class").indexOf("active") < 0)
		{
			$("#prevArrow2").show();
		}
		else{$("#prevArrow2").hide();}
		if($($("#owl-recommend2 .owl-item").get(recommendNum - 1)).attr("class").indexOf("active") < 0)
		{
			$("#nextArrow2").show();
		}
		else{$("#nextArrow2").hide();}
	}
}


//若已点过，初始化图片上的数量
function initAmount()
{
	$.ajax({  
        type : "post",  
        url : "initAmount", 
        dataType:"json",  
	    success : function(msg) { 
	    	var i,j;
	    	for(i = 0;i<msg.length; i++)
    		{
	    		var wrapperObjs = $(".wrapper[foodid="+msg[i].foodId+"]");
	    		for(j = 0;j < wrapperObjs.size();j++)
    			{
	    			$(wrapperObjs[j]).find("div").first().append(
		    				"<span class='ui-li-count ui-btn-up-c ui-btn-corner-all' style='color:yellow;background: red;'>"
		    				+msg[i].amount+"</span>");
    			}
    		}
	    } , 
	     error:function(error){
	     	console.log(error+"initAmount");
 		} 		 
	}); 
}