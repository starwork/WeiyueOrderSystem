$(function($) {
	$( "td img" ).click(
		function()
		{
			$("#mainContent tr").removeClass( "trFocus" );
			$(this).parents("tr").addClass( "trFocus" );
			$(this).attr( "src", "icon/heart-active.png" );
			$(this).prevAll( "img" ).attr(  "src", "icon/heart-active.png" );
			$(this).nextAll( "img" ).attr(  "src", "icon/heart-white.png" );
		}
	);

	$(".popQuery th:nth-child(1)").click(//点击是
		function()
		{
			$(this).css( "background", "white" );
			$(this).css( "color", "#D31C64" );
			$(".popQuery .middleLine").hide();
			$(this).find( "div:nth-child(1)" ).show();
			setTimeout( 
				"$('.mask').hide();$('.popQuery').hide();",
				500
			);
		}
	);

	$(".popQuery th:nth-child(2)").click(//点击否
		function()
		{
			$(this).css( "background", "white" );
			$(this).css( "color", "#D31C64" );
			$(".popQuery .middleLine").hide();
			$(this).find( "div:nth-child(1)" ).show();
			setTimeout( 
				"location.href='/'",
				500
			);
		}
	);
	
	$(".navBar span").click(//点击发表评价
		function()
		{
			var trArray = $("#mainContent tr");
			var i = 0;
			var myData = "jsonString=[";
			for( i=1; i < trArray.length; i++ )
			{
				var dishId = $(trArray[i]).attr("foodid");
				var score = $(trArray[i]).find("img[src~='icon/heart-active.png']").length;
				myData += "{dishId:" + dishId + ",score:" + score + "},";
			}
			myData += "]";
			//console.log( myData );
			$.ajax({  
		        type : "post",  
		        url : "doEvaluate", 
		        dataType:"text",  
		        data: myData,
			    success : function() 
			    {
			    	location.href="/";
			    } , 
			    error:function(error)
			    {
			     	console.log(error+"doEvaluate");
		 		} 
			});			
		}
	);
	
	$(".promotion img:nth-child(1)").click(
		function()
		{
			$(".mask").show();
			$(".popWeixin").show();
		}
	);
		
	$(".popWeixin div").click(
		function()
		{
			$(".mask").hide();
			$(".popWeixin").hide();
		}
	);
});