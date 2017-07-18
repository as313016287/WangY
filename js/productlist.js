$(function() {
	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	var id = getQueryString("id");
	$.ajax({
		url: "http://182.254.146.100:3000/api/getcategorybyid",
		dataType: "json",
		data: {
			categoryid: id
		},
		success: function(data) {
			console.log(data)
			var catName = data.result[0].category;
			$("#catName>a").html(catName)
		}
	})
	var all = 0;

	function listAjax(id, num) {
		//		$("#sel").html("");
		$.ajax({
			url: "http://182.254.146.100:3000/api/getproductlist",
			dataType: "json",
			data: {
				categoryid: id,
				pageid: num
			},
			success: function(data) {
				var lisHtml = template("setLis", data);
				$("#prList>.prl-main").html(lisHtml);
				all = Math.ceil(data.totalCount / data.pagesize)
				$("#sel>option")[n - 1].selected = true;
			}
		})
	}
	var n = 1;
	(function(id, num) {
		$.ajax({
			url: "http://182.254.146.100:3000/api/getproductlist",
			dataType: "json",
			data: {
				categoryid: id,
				pageid: num
			},
			success: function(data) {
				var lisHtml = template("setLis", data);
				$("#prList>.prl-main").html(lisHtml);
				all = Math.ceil(data.totalCount / data.pagesize)
				for(var i = 1; i <= all; i++) {
					var bl = i + "/" + all;
					$("#sel").append("<option value = " + i + ">" + bl + "</option>")
				}
				console.log(data)
			}
		})
	})(id, n);
	$("#sel").change(function() {
		n = $(this)[0].value;
		listAjax(id, n);
	});
	$("#next").click(function() {
		if(n == all) {
			n = all;
		} else {
			n++;
			listAjax(id, n);
		}
	})
	$("#prev").click(function() {
		if(n == 1) {
			n = 1;
		} else {
			n--;
			listAjax(id, n);
		}
	})
	var titleid = getQueryString("titlename");
	var titlename = "";
	if(titleid == 0) {
		titlename = "大家电";
	} else if(titleid == 1) {
		titlename = "手机数码";
	} else if(titleid == 2) {
		titlename = "电脑办公";
	} else if(titleid == 3) {
		titlename = "生活家电";
	} else if(titleid == 4) {
		titlename = "厨卫家电";
	} else if(titleid == 5) {
		titlename = "个人护理";
	} else if(titleid == 6) {
		titlename = "健康电器";
	} else if(titleid == 7) {
		titlename = "正品鞋";
	}
	$("#titleName>a").html(titlename);
})