/**
 * Created by Nemoo on 2019/1/4.
 */
window.onload=function (event) {
    //获取DOM对象
    var headerLiNodes=document.querySelectorAll('.navList li');
    var arrow=document.querySelector('.arrow');
    var headerDownNodes=document.querySelectorAll('.down');
    //初始化显示
    arrow.style.left=headerLiNodes[0].getBoundingClientRect().left+headerLiNodes[0].offsetWidth/2-arrow.offsetWidth/2+'px';
    headerDownNodes[0].style.width='100%';
    //点击效果
    for (var i = 0; i < headerLiNodes.length; i++) {
        headerLiNodes[i].index=i;
        headerLiNodes[i].onclick=function () {
            nowIndex=this.index;
            move(nowIndex);
    }

    //页面移动效果
    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='';
        }
        headerDownNodes[nowIndex].style.width='100%';
        arrow.style.left=headerLiNodes[nowIndex].getBoundingClientRect().left+headerLiNodes[nowIndex].offsetWidth/2-arrow.offsetWidth/2+'px';
        contentUlNode.style.top=-nowIndex*content.offsetHeight+'px';
        };
    }
    //内容区绑定滚轮事件
    document.onmousewheel=wheel;
    document.addEventListener('DOMMouseScroll',wheel);
    var contentUlNode=document.querySelector('.content-main');
    var content=document.querySelector('.content');
    var nowIndex=0;
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
