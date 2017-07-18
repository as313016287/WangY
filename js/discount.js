$(function(){
	function getUrlParam(key) {
		// 获取参数
		var url = window.location.search;
		// 正则筛选地址栏
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		// 匹配目标参数
		var result = url.substr(1).match(reg);
		//返回参数值
		return result ? decodeURIComponent(result[2]) : null;
	}
	var prId = getUrlParam("prId");
	$.ajax({
		type:"get",
		url:"http://182.254.146.100:3000/api/getdiscountproduct",
		async:true,
		dataType: "json",
		data: {
			productid: prId
		},
		success: function ( data ){
			console.log( data );
			var spHtml = template( "spHtml", data );
			$("#prMain").html(spHtml);
			var plHtml = data.result[0].productComment;
			$("#pl").html(plHtml)
		}
	});
	$(".fh").click(function(){
		window.history.back();
	})
})