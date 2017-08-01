$(function() {
	$(".fh>a").click(function() {
		window.history.back();
	});
	var wHeight = $(window).height();

	FastClick.attach(document.body);

	$.ajax({
		type: "get",
		url: "http://182.254.146.100:3000/api/getbaicaijiatitle",
		async: true,
		dataType: "json",
		success: function(data) {
			var nHtml = template("navHtml", data);
			$("#nav>.nt-l>ul").html(nHtml)
			var pUl = $(".nt-l>ul");
			var pLis = pUl.find("li");
			var pLiWidth = 0,
				id;
			pLis.each(function(index, value) {
				pLiWidth += $(value).innerWidth();
			})
			pUl.width(pLiWidth);
			var myScroll = new IScroll('.nt-l', {
				/*设置水平滑动，不允许垂直滑动*/
				scrollX: true,
				scrollY: false
			});
			$(".nt-l>ul>li")[0].className = "active";
			for(var i = 0; i < $(".nt-l>ul>li").length; i++) {
				$(".nt-l>ul>li")[i].onclick = function() {
					for(var j = 0; j < $(".nt-l>ul>li").length; j++) {
						$(".nt-l>ul>li")[j].className = "";
					}
					this.className = "active";
					id = this.value;
					listAjax(id);
				}
			}
		}
	});

	function listAjax(id) {
		$.ajax({
			type: "get",
			url: "http://182.254.146.100:3000/api/getbaicaijiaproduct",
			async: true,
			data: {
				titleid: id
			},
			success: function(data) {
				console.log(data);
				var listHtml = template("list", data);
				$("#prList>ul").html(listHtml);
				var length = data.result.length;
				var i,
					s = 0,
					max = 8;
				for(var j = 0; j < length; j++) {
					$("#prList>ul>li")[j].style.display = "none";
				}
				for(i = 0; i < max; i++) {
					$("#prList>ul>li")[i].style.display = "block";
					s++;
				}
				window.onscroll = function() {
					var sHeight = $("#head").height() + $("#prList").height();
					var dTop = $(document).scrollTop();
					//				console.log(dTop + "-----" + sHeight + "-----" + wHeight)
					if(dTop + wHeight > sHeight) {
						max += 4;
						if(max > length) {
							max = length;
							i = 0;
							s = 0;
						}
						for(i = s; i < max; i++) {
							$("#prList>ul>li")[i].style.display = "block";
							s++;
						}
					}
				}
			}
		});
	}
	listAjax(0);
	var f = 0;
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

})