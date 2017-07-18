$(function() {
	var f = 0;

	function headAjax() {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getcategorytitle",
			dataType: "json",
			success: function(data) {
				console.log(data);
				var headHtml = template("head", data);
				$(".brief-in").html(headHtml)
				for(var i = 0; i < 8; i++) {
					liAjax(i);
				}
				$(".br-t" + i)
			}
		});
	}
	headAjax();

	function liAjax(i) {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getcategory",
			async: true,
			dataType: "json",
			data: {
				titleid: i
			},
			success: function(data) {
				console.log(data);
				var liHtml = template("lis", data);
				$(".br-m" + i + ">ul").html(liHtml);
				var s = 1;
				$(".br-t" + i).click(function() {
					$(".br-t" + i +"> h3 > i").css({"transform":"translateY(-50%) rotateZ("+(s * 360)+"deg)"});
					for(var j = 0; j < $(".br-m" + i).siblings().length; j++) {
						if ($($(".br-m" + i).siblings()[j]).hasClass("br-m")){
							$($(".br-m" + i).siblings()[j]).css("display","none");
						};
					}
					s++;
					$(".br-t" + i).next().toggle(200);
				})
			}
		});
	}

})