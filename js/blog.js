var blog = (function() {
	var host = "http://104.131.146.102:8080/",
		blog = {};

	blog.init = function() {
		blog.index();
		blog.getArticleList();
	}

	blog.bindEvent = function() {
		$(".guide .group-name").on("click", function() {
			$group = $(this).parent(".group");
			if ($group.hasClass("unfold")) {
				$group.removeClass("unfold");
				$group.find(".item-list").slideUp(200);
			} else {
				$group.addClass("unfold");
				$group.find(".item-list").slideDown(200);
			}
		});

		$(".guide .item a").on("click", function() {
			var dirName = encodeURIComponent($(this).parents(".group").attr("name"));
			var artName = encodeURIComponent($(this).attr("name"));
			$.ajax({
				url: host + "article?c=" + dirName + "&t=" + artName
			}).done(function(data) {
				$(".main").html(markdown.toHTML(decodeURIComponent(data)));
			}).fail(function() {
				$(".main").html("文章加载失败。");
			});
		});
	};

	blog.getArticleList = function() {
		var _this = this;

		$.ajax({
			url: host + "list"
		}).done(function(data) {
			if (document.documentElement.clientWidth > 760) {
				data.isWideStyle = true;
			} else {
				data.isWideStyle = false;
			}

			var tpl = document.getElementById("guide-tpl").innerHTML;
			var html = juicer(tpl, data);
			$(".guide").html(html);

			_this.bindEvent();
		}).fail(function() {
			$(".guide").text("目录加载失败");
		});
	};

	blog.index = function() {
		$.ajax({
			url: "/index.md"
		}).done(function(data) {
			$(".main").html(markdown.toHTML(data));
		}).fail(function() {
			$(".main").text("文章加载失败");
		});
	};

	return {
		init: blog.init
	};
})();

blog.init();