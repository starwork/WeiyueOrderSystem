 (function ($){
     //初始化wookmark
	 $('#tiles').imagesLoaded(function() {
        // Prepare layout options.
         var options = {       
          autoResize: true, // This will auto-update the layout when the browser window is resized.
          container: $('#tiles'), // Optional, used for some extra CSS styling
          offset: 2, // Optional, the distance between grid items
          outerOffset: 2, // Optional the distance from grid to parent
		  itemWidth: 150, // Optional min width of a grid item
		  flexibleWidth: 170 // Optional, the maximum width of a grid item
		  //将itemWidth和flexibleWidth设为一致  ，就可以消除动画产生的不贴合现象
        };
        var handler = $('#tiles li');
        handler.wookmark(options);
     });
  })(jQuery);
 
 $(function(){
	 setTimeout( '$(window).resize()', 500 ); 
	 $( "#tiles li" ).click(
		 function(){
			 location.href = "/dish?cgId=" + $(this).attr("cgId");
			 //console.log( "/dish?cgId=" + $(this).attr("cgId") );
		 }
	 );
 });
 
 
 