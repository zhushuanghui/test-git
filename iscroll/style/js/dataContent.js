/**
 * Created by xuliang on 2016/11/1.
 */
    alert("aaa");
    var contPath = "http://test.12306.cn.8686c.com/btgweb/appService";
    var page = 0;
    //�ǵ�ͬʱȥ�޸� yingyongxiazai.html
    var datJson = "";
    var TIME = "";
    var uuid = "";
    var data_0010 = "11";
    var data_0011;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android�ն�
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios�ն�
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
                slide_01.scrollContId = "slide_01"; //��������ID
                slide_01.dotListId = "slide_01_dot";//���б�ID
                slide_01.dotOnClassName = "selected";
                slide_01.arrLeftId = "sl_left"; //���ͷID
                slide_01.arrRightId = "sl_right";//�Ҽ�ͷID
                slide_01.frameWidth = width; //ͼƬ�������
                slide_01.pageWidth = width; //ÿ��ͼƬ���
                slide_01.upright = false;
                slide_01.speed = 30;//�ƶ��ٶ�(��λ���룬ԽСԽ��)
                slide_01.space = 50; //ÿ���ƶ�����(��λpx��Խ��Խ��)
                slide_01.autoPlay = true;//�Զ�����
                slide_01.autoPlayTime = 3; //�Զ����ż��ʱ��(��)
                slide_01.initialize(); //��ʼ��
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

                //�����ڴ�
                var str = [
                    ["images/pic_13.png", "�Ƶ�"],
                    ["images/pic_14.png", "��ʳ"],
                    ["images/pic_12.png", "����"],
                    ["images/pic_10.png", "�⳵"]
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
                    //alert("�ɹ�"+uuid);
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
            //���������󣩽ӿڷ������ݸ�ʽ ������ callBack({"ret":0,"info":"success"}  callBack��Ӧ����ĺ�������
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
         * ����ˢ�� ���Զ���ʵ�ִ˷�����
         * myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·���
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

                myScroll.refresh();		//���ݼ�����ɺ󣬵��ý�����·���   Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        /**
         * ������ҳ ���Զ���ʵ�ִ˷�����
         * myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·���
         */
        function pullUpAction () {
            setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
                aa();
                myScroll.refresh();		// ���ݼ�����ɺ󣬵��ý�����·��� Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        /**
         * ��ʼ��iScroll�ؼ�
         */
        function loaded() {
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');
            pullUpOffset = pullUpEl.offsetHeight;

            myScroll = new iScroll('wrapper', {
                scrollbarClass: 'myScrollbar', /* ��Ҫ��ʽ */
                useTransition: false, /* �����Բ�֪���⣬���˴�true��Ϊfalse */
                topOffset: pullDownOffset,
                onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '����ˢ��...';
                    } else if (pullUpEl.className.match('loading')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '�������ظ���...';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '���ֿ�ʼ����...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '����ˢ��...';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '���ֿ�ʼ����...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '�������ظ���...';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '������...';
                        pullDownAction();	// Execute custom function (ajax call?)
                    } else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '������...';
                        pullUpAction();	// Execute custom function (ajax call?)
                    }
                }
            });

            setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
        }

//��ʼ����iScroll�ؼ�
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        document.addEventListener('DOMContentLoaded', loaded, false);

    })





