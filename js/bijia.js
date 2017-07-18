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
	}
	var prId = getUrlParam("prId");
	var catId = getUrlParam("catId");
	var prName = getUrlParam("prName");
	$("#prName>a").html(prName);
	$.ajax({
		url: "http://182.254.146.100:3000/api/getcategorybyid",
		dataType: "json",
		data: {
			categoryid: catId
		},
		success: function(data) {
			console.log(data)
			var catName = data.result[0].category;
			$("#catName>a").html(catName)
		}
	})

	function getData(id) {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getproduct",
			async: true,
			dataType: "json",
			data: {
				productid: id
			},
			success: function(data) {
				console.log(data);
				var productImg = data.result[0].productImg;
				$("#bjShop>.bjpic").append(productImg);
				var productName = data.result[0].productName;
				$("#bjShop>.bjtxt").append(productName);
				var bjShop = data.result[0].bjShop;
				$("#bjShop").append(bjShop);
			}
		});
	}
	function getPl(id) {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getproductcom",
			async: true,
			dataType: "json",
			data: {
				productid: id
			},
			success: function(data) {
				console.log(data);
				var plHtml = template("plHtml",data);
				$("#pl").append(plHtml);
			}
		});
	}
	getPl(prId)
	getData(prId)
})