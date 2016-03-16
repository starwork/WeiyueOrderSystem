$(document).ready(function() {
    initCarousel();//对首页的两个旋转木马初始化
    setMask();//设置选桌界面是否显示
    
    $(".markSlider button").click(
    		function () { 
    			silderClick( this );
    		}
	);
    
	$("#startButton").click( 
		function () { 
			selectDeskAndPerson();
		}
	);
    
	$("#owl-recommend .item").click( 
		function () { 
			addToCart( this );
		}
	);
	
	$("#owl-demo .item .addDish").click( 
		function () { 
			addToCart( $(this).parents(".item") );
		}
	);
	
});



function silderClick( obj )
{
	//点击数字使滑动条滑动的代码
	var owlObj = $(obj).parents(".markSlider").first();
	var owl = owlObj.data('owlCarousel');
	var clickIdx = parseInt( $(obj).text() );
	owl.goTo( clickIdx - 1 );
}

function selectDeskAndPerson()
{	
	var deskId = $("#deskSlider").nextAll(".focusCircle").text();
	var personNum = $("#personSlider").nextAll(".focusCircle").text();
	//console.log( "桌号：" + deskId + " 人数：" + personNum );
	
	var myData = "deskId=" + deskId + "&personNum=" + personNum;
	$.ajax({  
        type : "post",  
        url : "selectDeskAndPerson", 
        dataType:"text",  
        data: myData,
	    success : function(msg1) 
	    { 
	    	if( msg1 == "alreadySentOrder")
	    	{
	    		alert( "你已下单，请先去支付。");
	    		location.href = "/prePay" ; 
	    		return;
	    	}
	    	if(msg1 == "0")
			{
				alert( "该桌已被选，请选择其他桌！");
				return false;
			}
	    	if(msg1 == "-1")
			{
	    		alert( "没有这一桌，请重新选择！");
				return false;
			}
	    	//console.log( "选桌成功！" );
	    	$(".mask").hide(); 
			$(".popWindow").hide(); 
	    } , 
	    error:function(error)
	    {
	     	console.log(error+"selectDesk");
 		}
	});	
}

function setMask()
{
	$.ajax({  
        type : "post",  
        url : "isSelectDesk", 
        dataType:"text",  
	    success : function(msg) 
	    { 
	    	if( msg == "alreadySentOrder")
	    	{
	    		alert( "你已下单，请先去支付。");
	    		location.href = "/prePay" ; 
	    		return;
	    	}
	    	if( msg == "false" )
	    	{
	    		$(".mask").show(); 
				$(".popWindow").show(); 
	    	}
	    	if (msg == "true")
	    	{
	    		
	    	}
	    } , 
	    error:function(error)
	    {
	     	console.log(error+"isSelectDesk");
 		}
	});	
}

function initCarousel()
{
  $("#owl-demo").owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
	  navigation:false,
	  afterInit : function(elem){
		  var that = this;
		  that.owlControls.prependTo($("#pointNavHolder"));
    }
  });

  $("#owl-recommend").owlCarousel({
	  	items : 2,
		itemsDesktop:[600,2],
	    itemsMobile:[130,1],
	    pagination:false,
	    addClassActive:true,
	    afterMove:function(){
			showArrows();
	   	},
  });

  var owl = $("#deskSlider");
  owl.owlCarousel({     
      itemsCustom : [
        [0, 3],
        [1600, 3]
      ],
      pagination:false,
	  addClassActive:true,
	  afterMove:function(){
		  updateFocus(0);
      },
  }); 
  owl.data('owlCarousel').goTo(1);
  
  owl = $("#personSlider");
  owl.owlCarousel({     
      itemsCustom : [
        [0, 3],
        [1600, 3]
      ],
      pagination:false,
	  addClassActive:true,
	  afterMove:function(){
		  updateFocus(1);
      },
  });
  owl.data('owlCarousel').goTo(1);
}

//显示和隐藏箭头
function showArrows()
{
	if($("#owl-recommend .owl-item").first().attr("class").indexOf("active") < 0)
	{
		$("#leftArrowHolder").show();
	}
	else{
		$("#leftArrowHolder").hide();
	}
	if( $("#owl-recommend .owl-item").last().attr("class").indexOf("active") < 0)
	{
		$("#rightArrowHolder").show();
	}
	else{
		$("#rightArrowHolder").hide();
	}
}

function updateFocus( flag ){
   var focusNum = $( $(".focusCircle")[flag] );
   if( flag == 0)
	 focusNum.text($($("#deskSlider .active")[1]).text());
   else if( flag == 1)
	 focusNum.text($($("#personSlider .active")[1]).text());
}