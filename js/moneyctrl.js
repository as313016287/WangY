$(function() {
	var all = 0;
	var n = 1;
	function listAjax(num) {
		$.ajax({
			url: "http://182.254.146.100:3000/api/getmoneyctrl",
			dataType: "json",
			data: {
				pageid: num
			},
			success: function(data) {
				var lisHtml = template("setLis", data);
				$("#prList>.prl-main").html(lisHtml);
				$("#sel>option")[n-1].selected = true;
			}
		})
	}
	(function(num) {
		$.ajax({
			url: "http://182.254.146.100:3000/api/getmoneyctrl",
			dataType: "json",
			data: {
				pageid: num
			},
			success: function(data) {
				var lisHtml = template("setLis", data);
				$("#prList>.prl-main").html(lisHtml);
				all = Math.ceil(data.totalCount / data.pagesize)
				for(var i = 1; i <= all; i++) {
					var bl = i + "/" + all;
					$("#sel").append("<option value = "+i+">" + bl + "</option>")
				}
				console.log( data )
			}
		})
	})(n);
	$("#sel").change(function() {
		n = $(this)[0].value;
		listAjax(n);
	});
	listAjax(n);
	$("#next").click(function() {

		if(n == all) {
			n = all;
		} else {
			n++;
			listAjax(n);
		}
	})
	$("#prev").click(function() {
		if(n == 1) {
			n = 1;
		} else {
			n--;
			listAjax(n);
		}
	});
	$(".fh").click(function(){
		window.history.back();
	})
})