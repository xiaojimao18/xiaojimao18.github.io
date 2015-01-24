var host = "http://10.108.16.184:8080/hello";

$.ajax({
	type: "get",
	url: host,
	success: function(data) {
		//$("body").append(data);
	},
	error: function() {
		alert("Error Occurs.");
	}
});

$(".guide li a").on("click", function() {
	$(this).parent("li").toggleClass("active");
});