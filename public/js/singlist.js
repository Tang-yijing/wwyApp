window.onload = function () {
    // 获取歌单列表封面
    let id = location.search.slice(1, );
    let get_singlist = function () {
        $.get('/singlist/listDate', { _id: id }, function (data) {
            console.log(data);

            let str = '';

            str += `    <div class="content_white">
                               <!--左边歌曲图片-->
                            <div class="content_left">
                                 <img src="http://192.168.43.31:3111${data.img}" alt="pic"/>
                            </div>
                           <!--歌单名称-->
                           <div class="content_rigth">
                                 <p>${data.text}</p>
                                 <p>${data.autor}</p>
                                 <p>${data.labs}</p>                                   
                                 <p>${data.info}</p>                                  
                             </div>                               
                        </div>`

            $('#header_pic').html(str);
        })
    }
    get_singlist();


    // 获取所有歌曲
    let get_singlistAll = function () {
        $.get('/singlist/listAll', { _id: id, submitType: "findJoin", ref: JSON.stringify(["music", ""]) }, function (data) {
            let str = '';
            str += ` <ol>                          
                        <li>                                       
                            <a href="player.html"><p>${data.music[0].name}</p></a>                                                 
                            <a href="player.html">${data.music[0].singer}</a>  
                            <a href="player.html"><img src='http://192.168.43.31:3111/img/00000000000_03.png'><img></a>                      
                        </li>
                        <li> 
                            <a href="player.html"><p>${data.music[1].name}</p></a>                                                 
                            <a href="player.html">${data.music[1].singer}</a>  
                            <a href="player.html"><img src='http://192.168.43.31:3111/img/00000000000_03.png'><img></a>                      
                        </li>
                        <li> 
                            <a href="player.html"><p>${data.music[2].name}</p></a>                                                 
                            <a href="player.html">${data.music[2].singer}</a>  
                            <a href="player.html"><img src='http://192.168.43.31:3111/img/00000000000_03.png'><img></a>                      
                        </li>
                        <li> 
                            <a href="player.html"><p>${data.music[3].name}</p></a>                                                 
                            <a href="player.html">${data.music[3].singer}</a>  
                            <a href="player.html"><img src='http://192.168.43.31:3111/img/00000000000_03.png'><img></a>                      
                        </li>
                        <li> 
                            <a href="player.html"><p>${data.music[4].name}</p></a>                                                 
                            <a href="player.html">${data.music[4].singer}</a>  
                            <a href="player.html"><img src='http://192.168.43.31:3111/img/00000000000_03.png'><img></a>                      
                        </li>
                     </ol>`
            $('#centerDiv').html(str);

        })
    }

    get_singlistAll();

}