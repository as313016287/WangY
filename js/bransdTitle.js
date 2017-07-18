$(function(){
	$.ajax({
		type:"get",
		url:"http://182.254.146.100:3000/api/getbrandtitle",
		async:true,
		dataType: "json",
		success: function ( data ){
			console.log( data );
			var tHtml = template("tHtml",data);
			$("#title>.title-m").html(tHtml);
		}
	});
})
