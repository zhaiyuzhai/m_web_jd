function search() {
    var searchBox=document.querySelector(".jd_header_box");
    var bannerBox=document.querySelector(".jd_banner");
    var h=bannerBox.offsetHeight;
    window.onscroll=function () {
        var top=document.body.scrollTop;
        var opacity=0;
        if(top<h){
            opacity= top/h * 0.85;
        }else{
            opacity=0.85;
        }
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }
}
search();
function banner(){
    /*轮播图的下标为1~8*/
    var indexNum=1;
    var jdBanner=document.querySelector(".jd_banner");
    var jdBannerWidth=parseFloat(getComputedStyle(jdBanner)['width']);
    console.log(jdBannerWidth)
    var firstUl=document.querySelector("ul:first-child");
    var firstULlis=document.querySelectorAll("ul:first-child>li");
    var timer=setInterval(function () {
        firstUl.style.transition="all 0.5s linear";
        firstUl.style.transform="translateX(-"+jdBannerWidth*(indexNum+1)+"px)";
        indexNum++;
        if(indexNum>8){
            indexNum=1;
        }
    },2000);
    // touch事件的处理
    // 取出touch事件开始时的x坐标
    var startX;
    var startY;
    var moveX;
    var moveDis;
    firstUl.addEventListener("touchstart",function (e) {
        e.preventDefault();
        clearInterval(timer);
        timer=null;
        startX=e.changedTouches[0].clientX;
        startY=e.changedTouches[0].clientY;
    });
    firstUl.addEventListener("touchmove",function (e) {
        // console.log(e)
        moveX=e.changedTouches[0].clientX;
        // console.log(moveX);
        moveDis=moveX-startX;
        // console.log(this);
        // this.style.width=jdBannerWidth*(indexNum)+startX-moveX+"px";
        var tranX=jdBannerWidth*(indexNum)-moveDis;
        this.style.transition="";
        this.style.transform="translateX(-"+tranX+"px)";
    })
    firstUl.addEventListener("touchend",function (e) {
        if(Math.abs(moveDis)>jdBannerWidth/2){
            if(moveDis>0){
                firstUl.style.transform="translateX(-"+jdBannerWidth*(indexNum-1)+"px)";
            }else{
                firstUl.style.transform="translateX(-"+jdBannerWidth*(indexNum+1)+"px)";
            }
        }else{
            console.log(2);
            firstUl.style.transform="translateX(-"+jdBannerWidth*indexNum+"px)";
        }
        setInterval(function () {
            var timer=setInterval(function () {
                firstUl.style.transition="all 0.5s linear";
                firstUl.style.transform="translateX(-"+jdBannerWidth*(indexNum+1)+"px)";
                indexNum++;
                if(indexNum>8){
                    indexNum=1;
                }
            },2000);
        })
    });
}
banner()