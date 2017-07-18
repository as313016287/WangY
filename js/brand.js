$(function() {
	function getUrlParam(key) {
		// 获取参数
		var url = window.location.search;
		// 正则筛选地址栏
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		// 匹配目标参数
		var result = url.substr(1).match(reg);
		//返回参数值
		return result ? decodeURIComponent(result[2]) : null;
	};
	var btId = getUrlParam("btId");
	var btName0 = getUrlParam("btName");
	var btName = btName0.substring(0, btName0.length - 4);
	$("#mdName>a").html(btName + "哪个牌子好");
	$("#model>.mt>h3").html(btName + "哪个牌子好");
	$("#model>.pt>h3").html(btName + "产品销量排行");
	$("#model>.lt>h3").html(btName + "最有用的用户评论");
	$.ajax({
		type: "get",
		url: "http://182.254.146.100:3000/api/getbrand",
		async: true,
		dataType: "json",
		data: {
			brandtitleid: btId
		},
		success: function(data) {
			console.log(data);
			var mHtml = template("mHtml", data);
			$("#model>.mm>ul").html(mHtml);
		}
	});

	function hd() {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getbrandproductlist",
			async: true,
			dataType: "json",
			data: {
				brandtitleid: btId,
				pagesize: 4
			},
			success: function(data) {
				console.log(data);
				if(data.result[0]) {
					var pmHtml = template("pmHtml", data);
					$("#model>.pm>ul").html(pmHtml);
				} else {
					btId = 0;
					hd();
				}
				$.ajax({
					type: "get",
					url: "http://182.254.146.100:3000/api/getproductcom",
					async: true,
					dataType: "json",
					data: {
						productid: data.result[0] ? data.result[0].productId : 0
					},
					success: function(data) {
						console.log(data);
						var lmHtml = template("lmHtml", data);
						$("#model>.lm>ul").html(lmHtml);
					}
				});
			}
		});
	}
	hd();
})