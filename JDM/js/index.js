// 不建议用Jquery
// 入口函数  js原生的入口函数，当前文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 做轮播图   获取元素
    var banner = document.querySelector('.jd_banner');
    //需要移动的宽度
    var width = banner.offsetWidth;
    //图片盒子
    var imgBox = banner.querySelector('ul:first-child');
    //点盒子
    var dianBox = banner.querySelector('ul:last-child');


    // 常用方法
    var addTransition = function() {
        imgBox.style.transition = 'all 0.2s';
    }
    var delTransition = function() {
        imgBox.style.transition = 'none';
    }
    var setTranslateX = function(translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
    }


    //轮播图
    var index = 1;
    var timer = null;
    var autoPlay = function() {
        timer = setInterval(function() {
            index++;
            //动画切换
            addTransition();
            setTranslateX(-index * width);
        }, 3000);
    }
    autoPlay();

    //无缝衔接

    //监听动画结束后的操作
    imgBox.addEventListener('transitionend', function() {
        //无缝衔接
        if (index >= 9) {
            index = 1;
            delTransition();
            setTranslateX(-index * width);
        }
        //滑动无缝衔接
        else if (index <= 0) {
            index = 8;
            delTransition();
            setTranslateX(-index * width);
        }
        setdian();
    })

    // 点的运动
    var setdian = function() {
        dianBox.querySelector('li.now').classList.remove('now');
        dianBox.querySelector('li:nth-child(' + index + ')').classList.add('now');
    }



    //手机端滑动属性

    //开始触摸 
    var stratX = 0;
    var changeX = 0;
    var startTime = 0;
    imgBox.addEventListener('touchstart', function(e) {
            clearInterval(timer);
            //手指开始触摸到的第一个点
            stratX = e.touches[0].clientX;
            // 当前时间戳
            startTime = Date.now();
        })
        //滑动过程
    imgBox.addEventListener('touchmove', function(e) {
            var moveX = e.touches[0].clientX;
            //滑动的距离
            changeX = moveX - stratX;
            //将要移动的距离=原来位置+改变的位置
            var translateX = -index * width + changeX;
            //动画
            delTransition();
            setTranslateX(translateX);

        })
        //触摸结束
    imgBox.addEventListener('touchend', function(e) {
        // 算出每毫秒移动的距离
        var change = Math.abs(changeX); //取绝对值
        var time = Date.now() - startTime;
        var v = change / time;


        // 判断滑动方向
        if (v > 0.4) {
            //上一张
            if (changeX > 0) {
                index--;
                //下一张
            } else {
                index++
            }
            addTransition();
            setTranslateX(-index * width);
        } else {
            //移动的距离小于三分之一的话就吸附
            if (change < width / 3) {
                addTransition();
                setTranslateX(-index * width);
            } else {
                //下一张
                if (changeX > 0) {
                    index--;
                    //上一张
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }

        autoPlay();
    })
})