$(function(){
	$(".fh>a").click(function() {
		window.history.back();
	});
	$.ajax({
		type:"get",
		url:"http://182.254.146.100:3000/api/getcoupon",
		async:true,
		dataType: "json",
		success: function ( data ){
			console.log( data );
			var quanHtml = template("quanHtml",data);
			$("#quan>ul").html(quanHtml);
		}
	});
})
