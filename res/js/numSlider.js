$(document).on('pageinit','#homePage', function(){
	//初始化数字滑动条
	initNumSlider();

    //点击数字
	$(".owl-numSlider .realItem").click(function(){
 		    clickNum(this);
 	});

	//选择桌号人数
	$(".circle").click(function(){
		selectNum(this);
	});
});

function clickNum(obj)
{
	var owlObj=$(obj).parents(".owl-numSlider").first();
	var owl = owlObj.data('owlCarousel');
	var index = parseInt($(obj).text())+6;
	var activeItems=owlObj.find(".active");
	owl.goTo(index-Math.floor(activeItems.size()/2));
}

function selectNum(obj)
{
	var msg=$(obj).text();
	if($(obj).parent().find(".owl-numSlider").first().attr("id")=="owl-numSlider1"){
		var myData = "deskId="+msg;
    	$.ajax({
	        type : "post",
	        url : "selectDesk",
	        dataType:"text",
	        data: myData,
		    success : function(msg1) {
		    	if(msg1 == "0")
				{
					$('.tipAnchor').qtip('option', 'content.text', "该桌已被选，请选择其他桌！");
					$('.tipAnchor').qtip('toggle', true);
					return false;
				}
		    	if(msg1 == "-1")
				{
		    		$('.tipAnchor').qtip('option', 'content.text', "没有这一桌，请重新选择！");
					$('.tipAnchor').qtip('toggle', true);
					return false;
				}

			   $("#circle1").hide();
			   $("#owl-numSlider1").hide();
			   isSelect1=true;
			   $("#formHeader1 font").text("   桌号："+msg+"  ");
			   $("#formHeader1").show();
		       showArrows(1);
		    } ,
		     error:function(error){
		     	console.log(error+"selectDesk");
	 		}
		});


		// 选好桌了发送到后台面板
		var myData = "tableNo=" +$(obj).text();
		 $.ajax({
		        type : "post",
		        url : "Sit",
		        dataType:"text",
		        data: myData,
			    success : function(result) {
			    	if(result== -1){
			    		location.href="SystemPrompt?type=-1";
			    	}
			    } ,
			     error:function(error){
			     	alert("error: resetTableNo");
		 		}
		});

	}
	else{
		var myData="personNum="+msg;
    	$.ajax({
	        type : "post",
	        url : "selectPerson",
	        dataType:"text",
	        data: myData,
		    success : function() {
		       isSelect2=true;
		       $("#circle2").hide();
		       $("#owl-numSlider2").hide();
		 	   $("#formHeader2 font").text("   人数："+msg+"  ");
		 	   $("#formHeader2").show();
			   showArrows(2);
		    } ,
		     error:function(error){
		     	console.log(error+"selectDesk");
	 		}
		});
	}
}

function initNumSlider()
{
	$(".owl-numSlider").owlCarousel({
	   	items : 15,
	   	itemsDesktop : [1000,9],
	   	itemsDesktopSmall : [900,9],
	   	itemsTablet: [300,3],
	   	itemsMobile : [300,7],
	    addClassActive:true,
	   	pagination:false,
		afterMove:function(){
	   		midIndex = this.owl.currentItem+Math.floor(this.owl.visibleItems.length/2);
	   		owl = $(this.owl.baseElement).data('owlCarousel');
	   		if(midIndex<7)
	   		{
	   			owl.goTo(7-Math.floor(this.owl.visibleItems.length/2));
	   			midIndex=7;
	   		}
	   		if(midIndex>21)
	   		{
	   			owl.goTo(21-Math.floor(this.owl.visibleItems.length/2));
	   			midIndex=21;
	   		}
	   		if($(this.owl.baseElement).attr("id")=="owl-numSlider1")
				$("#circle1").text($($(this.owl.baseElement).find(".item").get(midIndex)).text());
			if($(this.owl.baseElement).attr("id")=="owl-numSlider2")
				$("#circle2").text($($(this.owl.baseElement).find(".item").get(midIndex)).text());

	   	},
	   	afterUpdate:function(){
	   		index=parseInt($(this.owl.baseElement).parent().find(".circle").text())+6;
	   		owl = $(this.owl.baseElement).data('owlCarousel');
	   		owl.goTo(index-Math.floor(this.owl.visibleItems.length/2));
	   	},

   	});

	//初始化完成后，将1转到中间为被选中的那个
    halfLength=Math.floor($("#owl-numSlider1 .active").length/2);
    $("#owl-numSlider1").data('owlCarousel').jumpTo(7-halfLength);
    $("#owl-numSlider2").data('owlCarousel').jumpTo(7-halfLength);
}



