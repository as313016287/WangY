$(function() {
	$(".fh>a").click(function() {
		window.history.back();
	});
	var f = 0,
		s = 0,
		k = 0,
		flag1 = 0,
		flag2 = 0;
	$(".nt-s>div").click(function() {
		if(f === 0) {
			$(this).removeClass();
			$(this).addClass("glyphicon glyphicon-remove");
			f = 1;
			$("#nav").animate({
				"height": "94px"
			}, 300);
		} else {
			$(this).removeClass();
			$(this).addClass("glyphicon glyphicon-search");
			$("#nav").animate({
				"height": "39px"
			}, 300);
			f = 0;
		}
	});

	function getSel1() {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getgsshop",
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data);
				var sel1Html = template("sel1Html", data);
				$("#sel>ul").html(sel1Html);
				$("#nav .nav1 a").html(data.result[s].shopName + "<i class='glyphicon glyphicon-triangle-bottom'></i>");
				for(var i = 0; i < data.result.length; i++) {
					$("#sel>ul>.sel" + i).click(function() {
						s = $(this)[0].value;
						$("#nav .nav1 a").html(data.result[s].shopName + "<i class='glyphicon glyphicon-triangle-bottom'></i>");
						$("#sel").css("display", "none");
						flag1 = 0;
						flag2 = 0;
						getPr(s,k);
					})
				}
				$("#sel>ul>.sel" + s).addClass("on");
			}
		});
	}
	getSel1();

	function getSel2() {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getgsshoparea",
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data);
				var sel2Html = template("sel2Html", data);
				$("#sel>ul").html(sel2Html);
				$("#nav .nav2 a").html(data.result[k].areaName.substr(0, 2) + "<i class='glyphicon glyphicon-triangle-bottom'></i>");
				
				for(var i = 0; i < data.result.length; i++) {
					$("#sel>ul>.sel" + i).click(function() {
						k = $(this)[0].value;
						flag1 = 0;
						flag2 = 0;
						$("#nav .nav2 a").html(data.result[k].areaName.substr(0, 2) + "<i class='glyphicon glyphicon-triangle-bottom'></i>");
						$("#sel").css("display", "none");
						getPr(s,k);
					})
				}
				$("#sel>ul>.sel" + k).addClass("on");
			}
		});
	}
	getSel2();
	$("#nav .nav1 a").click(function() {
		if((flag1 === 0 && flag2 === 0) || (flag1 === 0 && flag2 === 1)) {
			$("#sel>ul").html("");
			getSel1();
			$("#sel").css("display", "block");
			flag1 = 1;
			flag2 = 0;
		} else {
			$("#sel").css("display", "none");
			flag1 = 0;
		}
	});
	$("#nav .nav2 a").click(function() {
		if((flag1 === 0 && flag2 === 0) || (flag1 === 1 && flag2 === 0)) {
			$("#sel>ul").html("");
			getSel2();
			$("#sel").css("display", "block");
			flag2 = 1;
			flag1 = 0;
		} else {
			$("#sel").css("display", "none");
			flag2 = 0;
		}
	});

	function getPr( shopId, areaId ) {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getgsproduct",
			async: true,
			data: {
				shopid: shopId,
				areaid: areaId
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				var listHtml = template("listHtml", data);
				$("#prList>ul").html(listHtml);
			}
		});
	}
	getPr(0,0);
})