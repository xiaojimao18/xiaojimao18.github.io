var host = "http://10.108.16.184:8080/hello";
var tempdata = {
	data: [
		{
			name: "机器学习",
			items:[{name:"社团发现"}, {name:"随机游走"}]
		},{
			name: "知识脉络图",
			items:[{name:"关键词提取"}]
		}
	]
};

$.ajax({
	type: "get",
	url: host,
	success: function(data) {
		//$("body").append(data);
		var tpl = document.getElementById("guide-tpl").innerHTML;
		var guide = $(".guide");
		var html = juicer(tpl, tempdata);
		guide.html(html);

		$(".guide .group-name").on("click", function() {
			$(this).parent(".group").toggleClass("unfold");
		});
	},
	error: function() {
		if (typeof window.console != undefined) {
			console.log("Error occurs.");
		}
	}
});