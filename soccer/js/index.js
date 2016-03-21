window.onload = function(){
	/*iscroll*/
	var hHeight = $("header").height();
	var fHeight = $("footer").height();
	var nHeight = $("nav").height();
	$Height = $(window).height()-hHeight-fHeight-nHeight -20;
	$(".main").height($Height);
	var scroll = new iScroll("scroller1",{hScrollbar:false, vScrollbar:false});	
	var scroll2 = new iScroll("scroller2",{hScrollbar:false, vScrollbar:false});
	var scroll3 = new iScroll("scroller3",{hScrollbar:false, vScrollbar:false});
	/*下拉加载*/
	//var oWrap = document.getElementById("scroller");
	var oWrap = $("#scroller1");
	//var oLi = oWrap.getElementsByTagName("li");
	var oLi = $("#scroller1.checked li");

	console.log(oLi)
	var Num = 0;
	var $tab = 1;
	var dataLength = [0, 0, 0];
	var dataList = new Array();

	into($tab);
	
	$("#scroller"+$tab+" div").swipeUp(function(){
			Num += 8;
			into($tab);
	})
	
	function into($tab){
		/*判断是不是还有更多*/
		if((Num > dataLength[$tab - 1] - 1) && (Num>0) ){
			$(".no_more").css("display","block");
			scroll.refresh();
			scroll2.refresh();
			scroll3.refresh();
			return false;
 		}
 		/*判断是否需要ajax请求*/
 		if(dataLength[$tab - 1] < 1){
			$.ajax({
				url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
				data:{"category":$tab},
				async: false,
				success:function(data){
					var $data = JSON.parse(data);
					dataList[$tab - 1] = $data.data.tweetlist;
					dataLength[$tab - 1] =dataList[$tab - 1].length;
				}
			})
		}
		/*加载缓存数据*/
		loadData(dataList[$tab - 1], 8);
	}
	function loadData(list, step){
		var maxNum = Num + step;
		if(maxNum > dataLength[$tab - 1] ){
			maxNum = dataLength[$tab - 1];
		}
		for( var i = Num;i < maxNum; i++){	
		 	
		 	var oImg = $('<img src="http://101.200.173.217:8080/FootBall'+list[i].defaultFilePath+ list[i].defaultFileName +'"/>');							
		 	var container = $('<div></div>');
		 	var html = $('<div></div>');/*创建节点时过度*/
		 	var text = $('<p><a href="#">'+list[i].content+'</a></p>');
		 	container.append(oImg);
		 	container.append(text);
		 	html.append(container);
		 	
		 	oLi[getCpr()].innerHTML += html.html();
		 	
		 	oImg[0].onload = function(){
		 		scroll.refresh();
		 		scroll2.refresh();
		 		scroll3.refresh();
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

	/*tab点击切换*/
	$("nav a").on("tap",function(){
  		$tab = $(this).index() + 1;
  		changeData($tab);
  		mySwiper.slideTo($(this).index(), 500, false);	
  		scroll.refresh();
		scroll2.refresh();
		scroll3.refresh();	
	 });

	/*swiper切换*/
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal',
	    //loop: true,
	    onSlideChangeStart: function(swiper){
	  		if(swiper.swipeDirection == "next"){
    			$tab = $tab > 2 ? 1 : ($tab + 1);
	  		}else{
    			$tab = $tab < 1 ? 3 : ($tab - 1);
	  		}
	  		changeData();
	  		scroll.refresh();
		 	scroll2.refresh();
		 	scroll3.refresh();
    	}
		
  }),
  changeData = function(){  	
  		$("nav a").eq($tab - 1).addClass("active").siblings().removeClass("active");
		oLi = $("#scroller"+$tab+" li");
		//$("#scroller1.ul:nth-child("+$tab +") li");
		console.log()
  		Num = 0;
		into($tab);
		scroll.refresh();
		scroll.refresh();
		scroll2.refresh();
		scroll3.refresh();
  }        
}
