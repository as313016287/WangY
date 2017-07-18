$(function(){
	function menuAjax (){
		$.ajax({
			type:"get",
			url:"http://182.254.146.100:3000/api/getindexmenu",
			dataType: "json",
			success: function ( data ){
				var innerMenu = template( "tpMenu", data );
				$("#menu .row").html( innerMenu );
				$("#menu .col-xs-3:nth-of-type(8)>a ").click(function (){
					$("#menu .col-xs-3:nth-last-of-type(-n+4)").toggle(200);
				})
			}
		});
	}
	menuAjax();
	var str = "有3人评论";
	var plNum = str.replace(/[^0-9]/ig,""); 
	function pdAjax (){
		$.ajax({
			type:"get",
			url:"http://182.254.146.100:3000/api/getmoneyctrl",
			dataType: "json",
			success: function ( data ){
				console.log( data )
				var innerPd = template( "tpProduct", data );
				$(".product-main").html(innerPd);
			}
		});
	}
	pdAjax();
})
