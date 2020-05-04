/**
 * Created by xuliang on 2016/11/1.
 */
    alert("aaa");
    var contPath = "http://test.12306.cn.8686c.com/btgweb/appService";
    var page = 0;
    //记得同时去修改 yingyongxiazai.html
    var datJson = "";
    var TIME = "";
    var uuid = "";
    var data_0010 = "11";
    var data_0011;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var clientType = "1";
    $(function () {
        if (isIOS) {
            clientType = "0";
        }
        getAd("0010");
        getAd("0011");
        //getAd("0012");
        //getAd("0013");
        //getOtherData();
        aa();
        function imageSwipe() {
            var width = $(document.body).width();
            var height = 0.32 * width;
            $(".homebanner,.mod_01,.mod_01 img").css("width", width);
            $(".homebanner,.mod_01 img").css("height", height);
            if (document.getElementById("slide_01")) {
                var slide_01 = new ScrollPic();
                slide_01.scrollContId = "slide_01"; //内容容器ID
                slide_01.dotListId = "slide_01_dot";//点列表ID
                slide_01.dotOnClassName = "selected";
                slide_01.arrLeftId = "sl_left"; //左箭头ID
                slide_01.arrRightId = "sl_right";//右箭头ID
                slide_01.frameWidth = width; //图片容器宽度
                slide_01.pageWidth = width; //每张图片宽度
                slide_01.upright = false;
                slide_01.speed = 30;//移动速度(单位毫秒，越小越快)
                slide_01.space = 50; //每次移动像素(单位px，越大越快)
                slide_01.autoPlay = true;//自动播放
                slide_01.autoPlayTime = 3; //自动播放间隔时间(秒)
                slide_01.initialize(); //初始化
            }
        }

        function getAd(placementNo) {
            $.ajax({
                type: "get",
                url: contPath + "/webservice/rest/appService/getAdAppInfo.json?placementNo=" + placementNo + "&clientType=" + clientType,
                success: function (data) {
                    if (data != null) {
                        init(placementNo, data);
                    }
                }
            })
        }

        function init(placementNo, data) {
            if (placementNo == "0010") {
                var html = "";
                var s = 0;
                $.each(data.materialsList, function (i, n) {
                    html += "<div class='mod_01'>";
                    var linkUri = "#";
                    if (n.linkUri != null && n.linkUri != "") {
                        linkUri = n.linkUri;
                    }
                    html += "<a href='javascript:onClickAdsImage(\"" + placementNo + "\",\"" + n.billMaterialsId + "\",\"" + linkUri + "\")'><img src='" + n.filePath + "'></img></a>";
                    html += "</div>";
                    //liulan(placementNo,n.billMaterialsId);
                    s++;
                })
                $("#slide_01").html(html);
                if (s > 1) {
                    imageSwipe();
                } else {
                    $(".homebanner,.mod_01 img").css("height", 0.4 * $(document.body).width());
                }
            } else if (placementNo == "0011") {
                var html = "";
                $.each(data.materialsList, function (i, n) {
                    var linkUri = "#";
                    if (n.linkUri != null && n.linkUri != "") {
                        linkUri = n.linkUri;
                    }
                    html += "<div><a href='javascript:void(0);'  onclick=onClickAdsImage('" + placementNo + "','" + n.billMaterialsId + "','" + linkUri + "')><img src='" + n.filePath + "'/></a><br/>" + n.title + "<br/><u></u></div>";
                    //liulan(placementNo,n.billMaterialsId);
                })

                //敬请期待
                var str = [
                    ["images/pic_13.png", "酒店"],
                    ["images/pic_14.png", "美食"],
                    ["images/pic_12.png", "旅行"],
                    ["images/pic_10.png", "租车"]
                ];
                for (var i = 0; i < 4; i++) {
                    html += "<div><a href='javascript:void(0);')><img src='" + str[i][0] + "'/></a><br/>" + str[i][1] + "<u></u></div>";
                }
                $("#yingyong").children(".app_neir").html(html);
            }
        }

        function liulan(placementNo, billMaterialsId) {
            $.ajax({
                type: "get",
                url: contPath + "/appService/webservice/rest/appService/btnview.json?placementNo=" + placementNo + "&clientType=" + clientType + "&billMaterialsId=" + billMaterialsId + "&ip=" + uuid,
                success: function (data) {
                    //alert("成功"+uuid);
                }
            })
        }

        function onClickAdsImage(placementNo, billMaterialsId, targetUrl) {
            if (isIOS) {
                location.href = "bontaiads://onClickAdsImage?id=" + billMaterialsId + "&targetUrl=" + encodeURIComponent(targetUrl);
            } else if (isAndroid) {
                window.bontaiAndroidJS.onClickAdsImage(billMaterialsId, targetUrl);
            }
            dianji(placementNo, billMaterialsId);
        }

        function dianji(placementNo, billMaterialsId) {
            $.ajax({
                type: "get",
                url: contPath + "/appService/webservice/rest/appService/btnhui.json?placementNo=" + placementNo + "&clientType=" + clientType + "&billMaterialsId=" + billMaterialsId + "&ip=" + uuid,
                success: function (data) {
                    //alert(data)
                }
            })
        }

        function loadAdsSuccess(backuuid) {
            uuid = backuuid;
        }

        function autoScroll(obj) {
            $(obj).find("ul").animate({
                marginTop: "-50px"
            }, 500, function () {
                $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
            })
        }

        function getOtherData() {
            $.ajax({
                type: "get",
                url: "http://101.200.149.154/lyxx/webservice/rest/lyxxService/getTunXunData.json",
                success: function (data) {
                    if (data != null && data.ret == 0) {
                        var html_other = "";
                        $.each(data.newslist, function (i, n) {
                            html_other += "<li><a  href='javascript:;' onclick=onClickAdsImage('','" + n.timestamp + "','" + n.url + "')>" + n.title + "</a></li>";
                        });

                        $(".other_data").html(html_other);
                        setInterval('autoScroll(".guangg")', 3000);
                    }

                }
            })
        }

        function aa() {
            //（跨域请求）接口返回数据格式 必须是 callBack({"ret":0,"info":"success"}  callBack对应下面的函数名称
            var url = "http://op.inews.qq.com/mcms/h5/info/channel_data?refer=100000069&app_key=3a0bc088aeaf9417814b6a2b86ae22cf&channel_code=visit&start=" + page + "&size=10"
            $.get(url, function (json) {
                json = $.parseJSON(json);
                var html_other = "";
                $.each(json.data.list, function (i, n) {
                    if (n.content.articletype == 1) {
                        html_other = '<li><div class="right"><p><a href="' + n.content.url + '">' + n.content.title + '</p></a>' +
                        '<span>' + n.content.src + '</span><i></i><span></span></div>' +
                        '<div class="left"><img src="' + n.content.image33_l[0] + '"/></div></li>';
                    } else {
                        html_other = '<li><div class="right"><p><a href="' + n.content.url + '">' + n.content.title + '</p></a>' +
                        '<span>' + n.content.src + '</span><i></i><span></span></div>' +
                        '<div class="left"><img src="' + n.content.image32 + '"/></div></li>';
                    }
                    $(".detail").append(html_other);
                    page++;
                });
            });

        }


        var myScroll,
            pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;

        /**
         * 下拉刷新 （自定义实现此方法）
         * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
         */
        function pullDownAction () {
            setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
                var el, li, i;
                el = document.getElementById('thelist');

                for (i=0; i<3; i++) {
                    li = document.createElement('li');
                    li.innerText = 'Generated row ' + (++generatedCount);
                    el.insertBefore(li, el.childNodes[0]);
                }

                myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        /**
         * 滚动翻页 （自定义实现此方法）
         * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
         */
        function pullUpAction () {
            setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
                aa();
                myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        /**
         * 初始化iScroll控件
         */
        function loaded() {
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');
            pullUpOffset = pullUpEl.offsetHeight;

            myScroll = new iScroll('wrapper', {
                scrollbarClass: 'myScrollbar', /* 重要样式 */
                useTransition: false, /* 此属性不知用意，本人从true改为false */
                topOffset: pullDownOffset,
                onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    } else if (pullUpEl.className.match('loading')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                        pullDownAction();	// Execute custom function (ajax call?)
                    } else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                        pullUpAction();	// Execute custom function (ajax call?)
                    }
                }
            });

            setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
        }

//初始化绑定iScroll控件
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        document.addEventListener('DOMContentLoaded', loaded, false);

    })





