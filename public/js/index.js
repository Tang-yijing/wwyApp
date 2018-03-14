// ------------------------------- 轮 播 ---------------------------------------
window.onload = function(){
   
    let index = 0;
    let intervalId;
    let leftTimeId;
    let rightTimeId;
    let circleTimeId;
    let ary = [
        "http://192.168.43.31:3111/img/img1.jpg",
        "http://192.168.43.31:3111/img/img2.jpg",
        "http://192.168.43.31:3111/img/img3.jpg",
        "http://192.168.43.31:3111/img/img4.jpg"
    ];


   
  
    let startAnimate = function() {
        intervalId = setInterval(function() {
            moveImage(1);
        }, 5000);
    }
    $(".left").click(function(){
        clearInterval(intervalId);
        clearTimeout(leftTimeId);
        leftTimeId = setTimeout(function(){
            moveImage(1);
            startAnimate();
        },500)
        
        
    });
    $(".right").click(function(){
        clearInterval(intervalId);
        clearTimeout(rightTimeId);
        rightTimeId = setTimeout(function(){
            moveImage(-1);
            startAnimate();
        },500)
        
        
    });
    $(".circle li").click(function(){
        let nextIndex = $(this).attr("data-index");
        nextIndex--;
        if(nextIndex < 0){
            nextIndex = ary.length;
        }
        index = nextIndex;
        clearInterval(intervalId);
        clearTimeout(circleTimeId);
        circleTimeId = setTimeout(function(){
            moveImage(1);
            startAnimate();
        },500)

    });
    let moveImage = function(direct = 1) {
         
        $("div.img-div img").each(function(){
            $(this).stop(true);
            if($(this).position().left == 0){
               $(this).animate({
                   left:-375 * direct
               },500);

            }else{
                if(direct > 0){
                    index++;
                    if(index >= ary.length ){
                       index = 0;
                    }
                }else{
                    index--;
                    if(index < 0){
                        index = ary.length - 1;
                    }
                }

                
                $(this).css("left",375 * direct);
                $(this).attr("src",ary[index]);
                $(this).animate({
                    left:0
                },500,function(){
                    $(".circle li").css("color","");
                    $(".circle li").eq(index).css("color","red");
                });
            }
        });
    }
    startAnimate();
    
}



// 推荐歌单

let get_hit = function () {
    $.get('/hitDate',{page:1,rows:6}, function (data) {
        console.log(data)
        let str = '';
        for (let i of data) {
            console.log(i.img)
            str += `    <li> 
                            <a href="singlist.html?${i._id}" class="pic_sing">
                                <img src="http://192.168.43.31:3111${i.img}" alt="pic"/>
                            </a>                    
                             <a href="singlist.html?${i._id}" class="pic_text">${i.text}</a>                          
                        </li>`
        }
        $('.singDivs').html(str);
    })
}
get_hit();
