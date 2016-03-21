window.onload = function(){
	/*iscroll*/
	var hHeight = $("header").height();
	var fHeight = $("footer").height();
	var nHeight = $("nav").height();
	$Height = $(window).height()-hHeight-fHeight-nHeight -20;
	$(".main").height($Height);
	var scroll = new iScroll("scroller",{hScrollbar:false, vScrollbar:false});	
	/*下拉加载*/
	//var oWrap = document.getElementById("scroller");
	var oWrap = $("#scroller");
	//var oLi = oWrap.getElementsByTagName("li");
	var oLi = $("#scroller .checked li");
	var Num = 0;
	var $tab = 1;
	var dataLength = [0, 0, 0];
	var dataList = new Array();
	into($tab);
	
	$("#scroller div").swipeUp(function(){
			Num += 8;
			into($tab);
	})
	
	function into(idx){
		/*判断是不是还有更多*/
		if((Num > dataLength[idx - 1] - 1) && (Num>0) ){
			$(".no_more").css("display","block");
			return false;
 		}
 		/*判断是否需要ajax请求*/
 		if(dataLength[idx - 1] < 1){
			$.ajax({
				url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
				data:{"category":$tab},
				async: false,
				success:function(data){
					var $data = JSON.parse(data);
					dataList[idx - 1] = $data.data.tweetlist;
					dataLength[idx - 1] =dataList[idx - 1].length;
				}
			})
		}
		/*加载缓存数据*/
		loadData(dataList[idx - 1], 8);
	}
	function loadData(list, step){
		var maxNum = Num + step;
		if(maxNum > dataLength[$tab - 1] ){
			maxNum = dataLength[$tab - 1];
		}
		for( var i = Num;i < maxNum; i++){	
		 //console.log(Num);
		 	var oImg = $('<img src="http://101.200.173.217:8080/FootBall'+list[i].defaultFilePath+ list[i].defaultFileName +'"/>');							
		 	var container = $('<div></div>');
		 	var html = $('<div></div>');/*创建节点时过度*/
		 	var text = $('<p><a href="#">'+list[i].content+'</a></p>');
		 	container.append(oImg);
		 	container.append(text);
		 	html.append(container);
		 	
		 	//console.log(getCpr())
		 	oLi[getCpr()].innerHTML += html.html();
		 	oImg[0].onload = function(){
		 		scroll.refresh();
		 	}	
		}
	}
	function getCpr(){
		var index = 0;
		var iH = oLi[index].offsetHeight;
		for(var i = 1;i < oLi.length;i++ ){
			if(oLi[i].offsetHeight < iH){
				index = i;
				iH = oLi[i].offsetHeight;
			}
			
		}
		return index;
	}


	$("nav a").on("tap",function(){
	  	if($(this).hasClass("active")){
	  		return false;
	  	}else{
	  		$(this).addClass("active").siblings().removeClass("active");
	  		$("#scroller ul").eq($(this).index()).addClass("checked").siblings().removeClass("checked");
	  		if($("#scroller ul").hasClass('checked')){/*找到.checked*/
	  			oLi = $("#scroller .checked li");/*找到.checked下的li*/
	  			$tab = $(this).index()+1;
	  			Num = 0;
	  			into($tab);
	  		}
	  		
	  	};
		
	 });
}
