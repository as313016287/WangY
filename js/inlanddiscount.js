$(function() {
	$(".fh>a").click(function(){
		window.history.back();
	})
	var i,
		s = 0,
		max = 8,
		wHeight = $(window).height();
	$.ajax({
		type: "get",
		url: "http://182.254.146.100:3000/api/getinlanddiscount",
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data);
			var prHtml = template("prListHtml", data);
			$("#prList>ul").html(prHtml);
			var length = data.result.length;
			for(i = 0; i < max; i++) {
				$("#prList>ul>li")[i].style.display = "block";
				s++;
			}
			window.onscroll = function() {
				var sHeight = $("#head").height() + $("#prList").height();
				var dTop = $(document).scrollTop();
//				console.log(dTop + "-----" + sHeight + "-----" + wHeight)
				if( dTop + wHeight > sHeight) {
					max += 4;
					if ( max > length ){
						max = length;
					}
					for(i = s; i < max; i++) {
						$("#prList>ul>li")[i].style.display = "block";
						s++;
					}
					
				}
				
			}
		}
	});

})