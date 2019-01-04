/**
 * Created by Nemoo on 2019/1/4.
 */
window.onload=function (event) {
    //获取头部DOM对象
    var headerLiNodes=document.querySelectorAll('.navList li');
    var arrow=document.querySelector('.arrow');
    var headerDownNodes=document.querySelectorAll('.down');
    //获取内容区DOM对象
    var contentUlNode=document.querySelector('.content-main');
    var content=document.querySelector('.content');
    //获取右部小圆点DOM对象
    var olLiNodes=document.querySelectorAll('.rightFlags li');
    var nowIndex=0;
    //初始化显示
    arrow.style.left=headerLiNodes[0].getBoundingClientRect().left+headerLiNodes[0].offsetWidth/2-arrow.offsetWidth/2+'px';
    headerDownNodes[0].style.width='100%';
    //导航区点击效果
    headerHandle();
    function headerHandle() {
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index=i;
            headerLiNodes[i].onclick=function () {
                nowIndex=this.index;
                move(nowIndex);
            }
        }
    }
    //页面移动效果
    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='';
            olLiNodes[j].className='';
        }
        headerDownNodes[nowIndex].style.width='100%';
        olLiNodes[nowIndex].className='active';
        arrow.style.left=headerLiNodes[nowIndex].getBoundingClientRect().left+headerLiNodes[nowIndex].offsetWidth/2-arrow.offsetWidth/2+'px';
        contentUlNode.style.top=-nowIndex*content.offsetHeight+'px';
    };
    //右侧小圆点点击效果
    rightHandle();
    function rightHandle() {
           for (var i = 0; i < olLiNodes.length; i++) {
               olLiNodes[i].index=i;
               olLiNodes[i].onclick = function () {
                   nowIndex=this.index;
                   move(nowIndex);
               }
           }
       }


    //内容区绑定滚轮事件
    document.onmousewheel=wheel;
    document.addEventListener('DOMMouseScroll',wheel);

    //滚轮功能函数
    function wheel(event) {
        var flag='';
        event=event||window.event;
        if(event.wheelDelta){
            //IE chrome
            if(event.wheelDelta>0){
                flag='up';
            }else {
                flag='down';
            }
        } else if(event.detail){
            //firefox
            if(event.detail<0){
                flag='up';
            }else {
                flag='down';
            }
        }
        switch (flag){
            case 'up':
                if(nowIndex>0){
                    nowIndex--;
                    move(nowIndex);
                }
                break;
            case 'down':
                if(nowIndex<4){
                    nowIndex++;
                    move(nowIndex);
                }
                break;
        }
    }
};
