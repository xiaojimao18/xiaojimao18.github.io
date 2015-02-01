var host = "http://10.108.16.184:8080/";

$.ajax({
	type: "get",
	url: host + "list",
	success: function(data) {
		if (document.documentElement.clientWidth > 760) {
			data.isWideStyle = true;
		} else {
			data.isWideStyle = false;
		}

		var tpl = document.getElementById("guide-tpl").innerHTML;
		var guide = $(".guide");
		var html = juicer(tpl, data);
		guide.html(html);

		$(".guide .group-name").on("click", function() {
			$(this).parent(".group").toggleClass("unfold");
		});

		$(".guide .item a").on("click", function() {
			var c = encodeURIComponent($(this).parents(".group").attr("name"));
			var t = encodeURIComponent($(this).attr("name"));
			$.ajax({
				type: "get",
				url: host + "article?c=" + c + "&t=" + t,
				success: function(data) {
					$(".main").html(markdown.toHTML(decodeURIComponent(data)));
				},
				error: function() {
					$(".main").html("文章加载失败。");
				}
			});
		});
	},
	error: function() {
		if (typeof window.console != undefined) {
			console.log("Error occurs.");
		}
		$(".guide").text("目录加载失败");
	}
});


$.ajax({
	type: "get",
	url: "/index.md",
	success: function(data) {
		$(".main").html(markdown.toHTML(data));
	},
	error: function() {
		if (typeof window.console != undefined) {
			console.log("Error occurs.");
		}
		$(".main").text("文章加载失败");
	}
});
