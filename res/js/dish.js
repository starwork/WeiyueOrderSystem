$(window).resize(function(){
	   var liWidth = 160 + 12;/*12为margin和边框宽度*/
	   var liCount = $("#mainContent li").size();
	   var bodyWidth = $(document.body).width();
	   if( bodyWidth > liWidth * liCount )
	   {
		   $("#mainContent li").width( 160 );
		   var widthTmp = liCount * liWidth;
		   if( $("#mainContent").width() != widthTmp && widthTmp != 0 )
				$("#mainContent").width( widthTmp );
	   }
	   else if( bodyWidth < liWidth * 2 )/*至少显示两列*/
	   {
			$("#mainContent li").width( ( bodyWidth-12*2 )/2 );
			$("#mainContent").width( bodyWidth );
	   }
	   else
	   {
		   $("#mainContent li").width( 160 );
		   var count = parseInt( bodyWidth / liWidth );
		   var widthTmp = count * liWidth;
		   if( $("#mainContent").width() != widthTmp && widthTmp != 0 )
				$("#mainContent").width( widthTmp );
	   }
});

$(function($) {
	$(window).resize();		 
	$("#mainContent li").click( 
		function () { 
			addToCart( this );
		}
	);
});