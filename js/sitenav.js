$(function (){
	$(".fh>a").click(function() {
		window.history.back();
	});
	$.ajax({
		type:"get",
		url:"http://182.254.146.100:3000/api/getsitenav",
		async:true,
		dataType: "json",
		success: function ( data ){
			console.log( data );
			var nlHtml = template("nlHtml",data);
			$("#navList").html(nlHtml);
		}
	});
})
