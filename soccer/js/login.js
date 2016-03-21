$("#btn").on("tap",function(e){
	e.preventDefault();
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
	if(true){
		$.ajax({
		url:"http://localhost:8080/Proxy/FootBall/user/json/login.do",
		data:{"loginname":uid,"password":pwd},
		//dataType:"json",
		success:function(d){
			window.location.href = "index_1.html";
			}
		});
	}
	
})