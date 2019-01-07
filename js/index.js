/**
 * Created by Nemoo on 2019/1/4.
 */
window.addEventListener('DOMContentLoaded',function (event) {

    //获取头部DOM对象
    var headerLiNodes = document.querySelectorAll('.navList li');
    var arrow = document.querySelector('.arrow');
    var headerDownNodes = document.querySelectorAll('.down');
    var musicIconNode=document.querySelector('.music-icon');
    var musicNode=document.querySelector('.music');
    //获取内容区DOM对象
    var contentUlNode = document.querySelector('.content-main');
    var content = document.querySelector('.content');
    //获取右部小圆点DOM对象
    var olLiNodes = document.querySelectorAll('.rightFlags li');
    //获取第一屏DOM对象
    var bannerLiNodes = document.querySelectorAll('.banner li');
    var bannerBarLiNodes = document.querySelectorAll('.bannerBar li');
    //获取home的DOM对象
    var homeNode = document.querySelector('.home');
    //获取第二屏DOM对象
    var planeNodes = document.querySelectorAll('.course img');
    //获取第三屏DOM对象
    var photoLiNodes=document.querySelectorAll('.works-photo li');
    var maskNodes=document.querySelectorAll('.works-photo .mask');
    var maskIconNodes=document.querySelectorAll('.mask-icon');
    //获取第五屏DOM对象
    var teamUlNode=document.querySelector('.team-photo');
    var teamLiNodes=document.querySelectorAll('.team-photo li');
    var myCanvas=null;
    var createTimer=null;
    var paintingTimer=null;
    //变量定义区
    var nowIndex = 0;
    var wheelTimer = 0;
    var arrowHalfWidth = arrow.offsetWidth / 2;
    //初始化显示
    arrow.style.left = headerLiNodes[0].getBoundingClientRect().left + headerLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
    headerDownNodes[0].style.width = '100%';
    //导航区点击效果
    headerHandle();
    function headerHandle() {
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index = i;
            headerLiNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }

    //页面移动效果
    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width = '';
            olLiNodes[j].className = '';
        }
        headerDownNodes[nowIndex].style.width = '100%';
        olLiNodes[nowIndex].className = 'active';
        arrow.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
        contentUlNode.style.top = -nowIndex * content.offsetHeight + 'px';
    };



    //内容区绑定滚轮事件
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll', wheel);
    //滚轮功能函数
    function wheel(event) {
        var flag = '';
        event = event || window.event;
        //函数反抖  防止函数被多次调用执行，此功能在函数被多次调用的情况下，只执行最后一次调用
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function () {
            if (event.wheelDelta) {
                //IE chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            }
            switch (flag) {
                case 'up':
                    if (nowIndex > 0) {
                        nowIndex--;
                        move(nowIndex);
                    }
                    break;
                case 'down':
                    if (nowIndex < 4) {
                        nowIndex++;
                        move(nowIndex);
                    }
                    break;
            }
        }, 200);
        //禁止浏览器默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

    //浏览器窗口大小调整事件
    window.onresize = function () {
        arrow.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
        contentUlNode.style.top = -nowIndex * content.offsetHeight + 'px';
    }

    //第一屏动画
    firstViewHandle();
    function firstViewHandle() {

        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        var timer = 0;

        for (var i = 0; i < bannerBarLiNodes.length; i++) {
            bannerBarLiNodes[i].index = i;
            bannerBarLiNodes[i].onclick = function () {
                //判断两次点击的间隔时间
                var nowTime = Date.now();
                if (nowTime - lastTime < 2000) return;
                lastTime = nowTime;
                //同步nowIndex
                nowIndex = this.index;
                if (nowIndex === lastIndex) return;

                if (nowIndex > lastIndex) {
                    //点击的是右边的小圆点
                    bannerLiNodes[nowIndex].className = 'common-title right-show';
                    bannerLiNodes[lastIndex].className = 'common-title left-hide';

                } else if (nowIndex < lastIndex) {
                    //点击的是左边的小圆点
                    bannerLiNodes[nowIndex].className = 'common-title left-show';
                    bannerLiNodes[lastIndex].className = 'common-title right-hide';
                }

                //清除上一次点击的小圆点的效果
                bannerBarLiNodes[lastIndex].className = '';
                //点击谁谁变成白色
                this.className = 'active';

                //每一次点击后将本次下标同步至lastIndex,以便于下次点击时保持同步
                lastIndex = nowIndex;
            };
        }
        homeNode.onmouseenter = function () {
            clearInterval(timer);
        }
        homeNode.onmouseleave = autoPlay;

        //自动轮播
        autoPlay();
        function autoPlay() {
            timer = setInterval(function () {
                nowIndex++;
                //为了保证在自动轮播时用户不可以点击切换，因此同步时间为当前时间
                //使得用户点击时不满足2s的条件从而不能点击
                lastTime=Date.now();
                if (nowIndex >= 4) {
                    nowIndex = 0;
                }
                bannerLiNodes[nowIndex].className = 'common-title right-show';
                bannerLiNodes[lastIndex].className = 'common-title left-hide';
                //清除上一次小圆点的效果
                bannerBarLiNodes[lastIndex].className = '';
                bannerBarLiNodes[nowIndex].className = 'active';

                //每一次将下标同步至lastIndex,以便于下次保持同步
                lastIndex = nowIndex;
            }, 2500);
        }

    }

    //第五屏动画
    fifthViewHandle();
    function fifthViewHandle() {
        var width=teamLiNodes[0].offsetWidth;
        var height=teamLiNodes[0].offsetHeight;

        for (var i = 0; i < teamLiNodes.length; i++) {
            teamLiNodes[i].index=i;
            teamLiNodes[i].onmouseenter=function () {
                //实现鼠标移入li时，当前li变亮，其余li改变透明度
                for (var j = 0; j < teamLiNodes.length; j++) {
                    teamLiNodes[j].style.opacity='0.5';
                }
                this.style.opacity='1';
                //创建canvas
                //判断当前是否有canvas存在，若有，则不必重新创建
                if(!myCanvas){
                    myCanvas=document.createElement('canvas');
                    myCanvas.width=width;
                    myCanvas.height=height;
                    myCanvas.className='myCanvas';
                    bubble(myCanvas);
                    teamUlNode.appendChild(myCanvas);
                }
                myCanvas.style.left=this.index*width+'px';

            };
            teamUlNode.onmouseleave=function () {
                //实现鼠标移出li时，所有li恢复透明度为1
                for (var j = 0; j < teamLiNodes.length; j++) {
                    teamLiNodes[j].style.opacity='1';
                }
                //删除画布，并且初始化画布
                myCanvas.remove();
                myCanvas=null;
                //关闭定时器
                clearInterval(createTimer);
                clearInterval(paintingTimer);
            };
        }

        //封装气泡曲线运动函数
        function bubble(canvas) {
            if (myCanvas.getContext){
                //创建画笔
                var painting=myCanvas.getContext('2d');
                //获取画布的尺寸
                var canvasWidth=myCanvas.width;
                var canvasHeight=myCanvas.height;

                //随机生成多个气泡，存储在数组中
                var bubbleArr=[];
                createTimer=setInterval(function () {
                    //生成随机的颜色
                    var r=Math.round(Math.random()*255);
                    var g=Math.round(Math.random()*255);
                    var b=Math.round(Math.random()*255);
                    //生成随机的半径
                    var c_r=Math.round(Math.random()*8+2);
                    //生成随机的起始位置
                    var x=Math.round(Math.random()*canvasWidth);
                    var y=canvasHeight+c_r;
                    //生成一个随机的系数，用于扩大气泡的运动轨迹
                    var scale=Math.round(Math.random()*20+30);
                    //将生成的圆的各项参数存放在数组中
                    bubbleArr.push({
                        r:r,
                        g:g,
                        b:g,
                        c_r:c_r,
                        x:x,
                        y:y,
                        deg:0,
                        scale:scale
                    });
                },40);
                //画圆
                paintingTimer=setInterval(function () {
                    //清除画布
                    painting.clearRect(0,0,canvasWidth,canvasHeight);

                    for (var i = 0; i < bubbleArr.length; i++) {
                        var item=bubbleArr[i];
                        //角度自增
                        item.deg+=6;
                        var rad=item.deg*Math.PI/180;
                        //计算气泡的位置
                        var y=Math.round(item.y-rad*item.scale);
                        var x=Math.round(item.x+Math.sin(rad)*item.scale);
                        //当气泡移动出画布外，则清除该气泡，并跳出本次循环，不再执行下方的代码
                        if(y<=0){
                            bubbleArr.splice(i,1);
                            continue;
                        }
                        //画出圆的形状并填充颜色
                        painting.fillStyle='rgb('+ item.r +','+ item.g+','+ item.b+')';
                        painting.beginPath();
                        painting.arc(x,y,item.c_r,0,2*Math.PI,true);
                        painting.fill();
                    }
                },1000/60);
            };
        }
    }

    //音量部分的功能
    musicIconNode.onclick=function () {
        if(musicNode.paused){
            //暂停状态  点击后播放 背景图片更改
            musicNode.play();
            musicIconNode.style.backgroundImage='url("./img/musicon.gif")';
        }else {
            //播放状态  点击后暂停
            musicNode.pause();
            musicIconNode.style.backgroundImage='url("./img/musicoff.gif")';
        }

    };

    //右侧小圆点点击效果--即侧边导航
    rightHandle();
    function rightHandle() {
        for (var i = 0; i < olLiNodes.length; i++) {
            olLiNodes[i].index = i;
            olLiNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }

});
