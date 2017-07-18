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
	var cpId = getUrlParam("cpId");
	var cpName = getUrlParam("cpName");
	var s = 0,
		length = 0,
		top = 0
	dbh = 0;

	$("#head>.h-title").html(cpName + "优惠券");
	$("#prName>a").html(cpName + "优惠券");
	$(".fh>a").click(function() {
		window.history.back();
	});
	$.ajax({
		type: "get",
		url: "http://182.254.146.100:3000/api/getcouponproduct",
		async: true,
		data: {
			couponid: cpId
		},
		dataType: "json",
		success: function(data) {
			console.log(data);
			length = data.result.length;
			var prQuanHtml = template("prQuanHtml", data);
			$("#prQuan>ul").html(prQuanHtml);
			dbh = $(document.body).height();
			for(var i = 0; i < length; i++) {
				$("#prQuan>ul>.cpShow" + i).click(function() {
					s = $(this).val();
					top = $(window).scrollTop();
					$("#lay").css("display", "block");
					$("#lay").animate({
						"opacity": 1
					}, 200);
					$("#lay").find("img")[0].src = $(this).find("img")[0].src;

				})
			}

		}
	});
	$("#lay").click(function() {
//		stopPropagation();
		$("#lay").css({
			"display": "none",
			"opacity": 0
		});
	});
	$("#lay>.lay-in>.next").click(function(e) {
		s++;
		stopPropagation(e);
		if(s > length - 1) {
			top = dbh - $(window).height();
			s = length - 1;
			$("#lay").find("img")[0].src = $("#prQuan>ul>.cpShow" + s).find("img")[0].src;
		} else {
			top += $("#prQuan>ul>.cpShow" + (s - 1)).height();
			$(window).scrollTop(top);
			$("#lay").find("img")[0].src = $("#prQuan>ul>.cpShow" + s).find("img")[0].src;
		}
	});

	function stopPropagation(e) {
		var e = window.event || e;
		if(document.all) { //只有ie识别
			e.cancelBubble = true;
		} else {
			e.stopPropagation();
		}
	}
	$("#lay>.lay-in>.prev").click(function(e) {
		if(s < 0) {

		} else {

		}
		s--;
		stopPropagation(e);
		if(s < 0) {
			s = 0;
			top = $("#head").height() + $(">tip").outerHeight(true);
			$("#lay").find("img")[0].src = $("#prQuan>ul>.cpShow" + s).find("img")[0].src;
		} else {
			top -= $("#prQuan>ul>.cpShow" + (s + 1)).height();
			$(window).scrollTop(top);
			$("#lay").find("img")[0].src = $("#prQuan>ul>.cpShow" + s).find("img")[0].src;
		}
	});
})