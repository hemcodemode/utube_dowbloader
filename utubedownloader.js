
var oldXHR = window.XMLHttpRequest;
function newXHR() {
    var realXHR = new oldXHR();
    realXHR.addEventListener("readystatechange", function() {
        if(realXHR.readyState==4 && realXHR.status==200){
            if(realXHR.responseURL.indexOf("pbj=1")!=-1){
                var newParams = JSON.parse(realXHR.responseText);
                console.log(newParams);
                for(var i=0;i<newParams.length;i++){if(newParams[i].player !=null){
                    if(!window.ytplayer.config){
                        window.ytplayer.config = {};
                    }
                    window.ytplayer.config.args = newParams[i].player.args;
                    break;
                }}
            } 
        }
    }, false);
    return realXHR;
}

var video_page;
var strr = document.URL;
var mainpage = 0;
var playerContainer = document.getElementById("player-container")||document.getElementById("player-api");
if (strr.match(/youtube/gi)) {
    video_page = "yt";
    mainpage = 1;
    window.XMLHttpRequest = newXHR;
    function checkpagechanges() {
        if (video_page != "yt"){return false;};
        var topPos = (document.getElementById("top") || document.getElementById("player")).offsetTop;
        var LeftPos = playerContainer.offsetLeft+(document.getElementById("top") || document.getElementById("player")).offsetLeft;
        ispan.style.top = topPos+'px';
        ispan.style.left = LeftPos+'px';
        drop.style.top = topPos+23+'px';
        drop.style.left = LeftPos+'px';
        var newurl = document.URL;
        var resurl = newurl.split("=");
        if (resurl[0].match(/youtube/gi)) {
            if (resurl[0].match(/watch/gi) && strr != newurl) {
                drop.style.display = 'none';
                ispan.innerHTML = 'Loading......';
                strr = newurl;
                setTimeout(function() {
                    showdownloadinfo();
                    console.log("page changes");
                    //document.getElementById("watch7-sidebar-modules").onclick = checkpagetrans;
                }, 4000);
            } else if (resurl.length == 1 || resurl[0].match(/search/gi)) {
                strr = newurl;
                ispan.style.display = 'none';
                drop.style.display = 'none';

            }
        }
    }
}
window.onpopstate = checkpagechanges;
window.onclick = function() {
    setTimeout(function() {

        checkpagechanges();
    }, 1000);
}

var ress = strr.split("=") || strr.split("com");
if (ress[0].match(/facebook/gi)) video_page = "fb";
if (ress[0].match(/youtube/gi)) video_page = "yt";
if (ress[0].match(/dailymotion/gi)) video_page = "dm";
if (ress[0].match(/vimeo/gi)) video_page = "vm";

var ispan = document.createElement('span');
var drop = document.createElement('div');
var div = document.createElement('div');
ispan.id = 'block';
ispan.className = ' yt-uix-button-subscription-container with-preferences';
ispan.style.padding = '4px 6px 5px 6px';
ispan.style.border = '4px';
ispan.style.color = '#fff';
ispan.style.borderRadius = '2px';
ispan.style.fontWeight = 'bold';
ispan.style.cursor = "pointer";
ispan.style.verticalAlign = 'middle';
ispan.style.background = '#00CC00';
ispan.style.position = 'absolute';
ispan.style.zIndex = '1000';
ispan.style.top = '50px';
ispan.style.left = '250px';
ispan.innerHTML = 'Loading......';

drop.style.position = 'absolute';
drop.style.left = '250px';
drop.style.top = '73px';
drop.style.padding = '10px 10px 7px 10px';
drop.style.border = '4px';
drop.style.display = 'none';
drop.style.width = '200px';
drop.style.color = '#999';
drop.style.boxShadow = '0 2px 10px 0 rgba(0,0,0,0.2)';
drop.style.zIndex = '1000';
drop.style.border = '1px solid #ccc';
drop.style.background = '#fff';
drop.style.lineHeight = '1';
function adddivs(){
document.body.appendChild(div);
document.body.appendChild(ispan);
document.body.appendChild(drop);
}

function drop_menu() {
    if (drop.style.display == 'block') {
        drop.style.display = 'none';
    } else {
        drop.style.display = 'block';
    }
};
ispan.onclick = drop_menu;

var updateinfo = '<div style="padding-top:10px;padding-right:22px;font-size:11px;text-align:center;text-decoration:none;color:#bbb;"><a style="font-size:11px;text-align:center;text-decoration:none;color:#bbb;" target="_blank" href="http://hemantmeena.net" title="check for latest version">v2.0 </a><a  style="font-size:11px;text-align:center;text-decoration:none;color:#bbb;" href="http://hemantmeena.net/apps_update.php" target="_blank" title="click this if download failed" id="update" >Update</a></div>';

function unicodeToChar(text) {
    return text.replace(/\\u[\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef]/g,
        function(match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}

function update_algo(str) {

    var jsstring = str.substring(str.lastIndexOf('"js":') + 7);
    var jsfile = "http:" + jsstring.substring(0, jsstring.indexOf('html5player.js') + 14).replace(/\\\//g, "/");
    //console.log(jsfile);
    var ajax = new XMLHttpRequest;
    ajax.open('POST', 'http://iskodekho1.hostingsiteforfree.com/apps/update_algo.php', false);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.onreadystatechange = function() {
        if (ajax.status == 200) {
            code = ajax.responseText;
        }
    };
    ajax.send("jsurl=" + jsfile);
    //console.log(code);
    drop.innerHTML = "Updated ! please <a style='font-size:13px;text-align:center;text-decoration:none;' href='javascript:location.reload();'>click</a> to reload this page ";

    return false;
    void(0);


}
var ps1 = document.getElementsByTagName('html')[0].innerHTML;
if (video_page == "fb") {
    //document.querySelectorAll('[data-sigil="inlineVideo"]')[0].getAttribute('data-store')
    /*
    var allscripts = document.getElementsByTagName("script");
    for(var i=0;i<allscripts.length;i++){

        var scriptHtml = allscripts[i].innerHTML;
        if(scriptHtml.indexOf('VideoPlayerController')!=-1){
            console.log(scriptHtml);
            break;
        }
    }
    */
    ispan.style.top = ispan.style.left = drop.style.left = '0px';
    drop.style.top = '25px';
    var parentElement = document.querySelectorAll('[aria-label="Dialog content"]')[0].getElementsByTagName('video')[0].parentNode||document.getElementById("photoborder");
    parentElement.appendChild(ispan);
    parentElement.appendChild(drop);
    //var str = new String(ps1);
    //var title = str.substring(str.lastIndexOf('<title id="pageTitle">') + 22, str.lastIndexOf("</title>"));
    var title = document.title;
    //var test = str.substring(str.indexOf("flashvars"));
    //var test2 = test.substring(0, test.indexOf("buffer_length"));
    //var clear_text = decodeURIComponent(unicodeToChar(test2));
    //var video_data = clear_text.split('"hd_src":')[1];
    //var hd_video = video_data.substring(1, video_data.indexOf('",'));
    //video_data = video_data.split('"sd_src":')[1];
    //var sd_video = video_data.substring(1, video_data.indexOf('",'));
    //var video_data = document.getElementsByTagName('video')[0].src;
    var FgPageContent = "";
    var mypage = new XMLHttpRequest();
    mypage.open('GET',location.href,true)
    mypage.addEventListener("readystatechange", function() {
        if(mypage.readyState==4 && mypage.status==200){
                FgPageContent = mypage.responseText;
                var ss = /dash_manifest:"([\s\S]*?)(",)/gi.exec(FgPageContent);
                var x = 0;
                if(ss.length>0){
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(ss[1].replace(/\\x3C/gi,'<').replace(/\\n/gi,'').replace(/\\"/gi,'"'),"text/xml");
                    var Representation = xmlDoc.getElementsByTagName("Representation")
                    for(var i=0;i<Representation.length;i++){
                        x++;
                        var quallabel = Representation[i].getAttribute("FBQualityLabel");
                        var qualClass = Representation[i].getAttribute("FBQualityClass");
                        var baseurl = Representation[i].getElementsByTagName('BaseURL')[0].innerHTML.replace('&amp;','&');
                        var newTitle = title+' '+quallabel+' '+quallabel;
                        drop.innerHTML += String(i+1)+". <a href='" + baseurl + "' type='video/mp4' title='Hd'   target='_blank' download='" + title + ".mp4' >" + newTitle + ".mp4</a></br>";
                        
                    }
                    
                    //drop.innerHTML = "1. <a href='" + video_data + "' type='video/mp4' title='Hd' download='" + title + ".mp4' >" + title + ".mp4</a></br>"
                    //drop.innerHTML += "2. <a href='" + sd_video.replace(/\\\//g, "/") + "' title='Sd' download='" + title + "(SD)' >" + title + "(SD)</a></br>"
                    drop.innerHTML += updateinfo;
                    ispan.innerHTML = 'Download (' + x + ')';
                }                
        }
    }, false);
    mypage.send();
    



} else if (video_page == "yt") {
    adddivs();
    function givequality(quali) {
        switch (quali) {
            case '5':
                qualityInfo = "Low Quality,240p,FLV";
                break;
            case '17':
                qualityInfo = "Low Quality,144p,3GP";
                break;
            case '18':
                qualityInfo = "Medium Quality,360p,MP4";
                break;
            case '22':
                qualityInfo = "High Quality,720p,MP4";
                break;
            case '34':
                qualityInfo = "Medium Quality,360p,FLV";
                break;
            case '35':
                qualityInfo = "Standard Definition,480p,FLV";
                break;
            case '36':
                qualityInfo = "Low Quality,240p,3GP";
                break;
            case '37':
                qualityInfo = "Full High Quality,1080p";
                break;
            case '38':
                qualityInfo = "Original Definition,MP4";
                break;
            case '43':
                qualityInfo = "Medium Quality,360p,WebM";
                break;
            case '44':
                qualityInfo = "Standard Definition,480p,WebM";
                break;
            case '45':
                qualityInfo = "High Quality,720p,WebM";
                break;
            case '46':
                qualityInfo = "Full High Quality,1080p";
                break;
            case '82':
                qualityInfo = "Medium Quality 3D,360p,MP4";
                break;
            case '84':
                qualityInfo = "High Quality 3D,720p,MP4";
                break;
            case '100':
                qualityInfo = "Medium Quality 3D,360p,WebM";
                break;
            case '102':
                qualityInfo = "High Quality 3D,720p,WebM";
                break;
            case '101':
                qualityInfo = "High Quality 3D,480p,WebM";
                break;
            case '120':
                qualityInfo = "HD,720p,WebM";
                break;
            case '121':
                qualityInfo = "HD,1080p,WebM";
                break;
            case '137':
                qualityInfo = "HD,1080p, video/Mp4";
                break;
            case '171':
                qualityInfo = "HD,1080p, audio/Mp4";
                break;
            case '59':
                qualityInfo = "AVC, mp4a, Large";
                break;
            case '78':
                qualityInfo = "AVC, mp4a, Small";
                break;
            default:
                qualityInfo = "Not defined";
        }
        return qualityInfo;
    }

    function showdownloadinfo() {
        drop.innerHTML = ""; 
        var topPos = (document.getElementById("top") || document.getElementById("player")).offsetTop;
        var LeftPos = playerContainer.offsetLeft+(document.getElementById("top") || document.getElementById("player")).offsetLeft;;
        ispan.style.top = topPos+'px';
        ispan.style.left = LeftPos+'px';
        drop.style.top = topPos+23+'px';
        drop.style.left = LeftPos+'px';

        ispan.style.display = 'block';
        var title = window.ytplayer.config.args.title;
        var fmt_streams = window.ytplayer.config.args.url_encoded_fmt_stream_map;
        ispan.innerHTML = 'Loading......';
        if (mainpage) {
            ispan.innerHTML = '...Youtube...';
            mainpage = 0;
        }

        var stream = fmt_streams.split(",");
        var s;
        var sig = "";
        var urllink1 = [];
        var urllink2 = [];
        var downloadObject = {
            qual: [],
            dlink: []
        };
        var dlinks = [];
        var sign = 1;


        for (var i = 0; i < stream.length; i++) {


            s = stream[i].split("&");
            for (var j = 0; j < s.length; j++) {
                urllink1.push(s[j].split("=")[0]);
                urllink2.push(s[j].split("=")[1]);
                switch (urllink1[urllink1.length - 1]) {

                    case "itag":
                        var qual = givequality(urllink2[urllink1.length - 1]);
                        break;
                    case "url":
                        dlinks[i] = decodeURIComponent(decodeURIComponent(urllink2[urllink1.length - 1]));
                        break;
                    case "s":
                        if (sign == 1 && typeof tq == 'undefined') {
                            var code = '';
                            x = new(window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
                            x.onreadystatechange = function() {
                                if (x.readyState == 4) {
                                    if (x.status == 200) {
                                        code = JSON.parse(x.responseText).url;
                                        code = decodeURIComponent(code);
                                        console.log("got this");
                                    } else console.log('ERR', x.status, x.statusText)
                                }
                            };
                            x.open('GET', 'https://gluonchat.herokuapp.com/get_algo.php', false);
                            x.send();
                            //eval(code);
                            script_ele = window.document.createElement("script");
                            script_ele.innerHTML = code;
                            window.document.body.appendChild(script_ele);
                            sign = 0;
                        }
                        sig = "&signature=" + tq(urllink2[urllink1.length - 1]);
                        break;
                    default:
                }
            }
            dlinks[i] = dlinks[i] + sig + "&title=" + escape(title);
            downloadObject.dlink[i] = dlinks[i];
            downloadObject.qual[i] = qual;
            urllink1 = [];
            urllink2 = [];
        };
        for (var k = 0; k < downloadObject.dlink.length; k++) {
            drop.innerHTML += k + 1 + ". <a href='" + downloadObject.dlink[k] + "' download ='"+escape(title)+"' title='" + title + "'>" + downloadObject.qual[k] + "</a></br></br>";
        }
        drop.innerHTML += updateinfo;
        console.log(downloadObject);
        x = k;
        ispan.innerHTML = 'Download (' + x + ')';
    }
    showdownloadinfo();
    //document.getElementById("watch7-sidebar-modules").onclick = checkpagetrans;



} else if (video_page == "dm") {
    adddivs();
    ispan.innerHTML = 'Loading......';
    var topPos = document.getElementById("content").offsetTop;
    var leftPos = document.getElementById("content").offsetLeft;
    ispan.style.top = topPos+'px';
    ispan.style.left = leftPos+'px';
    drop.style.left = leftPos+'px';
    drop.style.top = topPos+27+'px';
    var video_id = ress[0].split("video/")[1].split("_")[0];
    var x=0;
    var ifr =document.createElement('iframe')
    ifr.src="http://www.dailymotion.com/embed/video/"+video_id;
    ifr.id="myIframe";
    document.body.appendChild(ifr);
    var objWindow;
    setTimeout(function() {

                     objWindow = window.document.getElementById('myIframe').contentWindow;

                     var obj = objWindow.info;
                     var title = obj.title;
                     console.log(title);
                     var quali = ["obj.stream_h264_hd1080_url", "obj.stream_h264_hd_url", "obj.stream_h264_hq_url", "obj.stream_h264_url", "obj.stream_h264_ld_url"];
                     var qualityInfo = ["Full HD Quality,1080p", "Full HD Quality,720p", "High Quality,480p,MP4", "Medium Quality,360p,MP4", "Low Quality,240p,MP4"]
                     drop.innerHTML = "";
                     for (var j = 0; j < quali.length; j++) {
                        if (eval(quali[j]) != null) {
                            ++x;
                            drop.innerHTML += "<div style='font-size:13px;color:#bbb;font-family: arial,sans-serif;display: inline-block;'>" + x + ".</div> <a style='color:#167ac6;text-align:start;font-size:13px;font-family: arial,sans-serif;text-decoration:none;' href='" + eval(quali[j]) + "&title=cdvdv' title='vdvvv' download='title'>" + qualityInfo[j] + "</a></br></br>";
                        }
                     }
                     ispan.innerHTML = 'Download (' + x + ')';
                     drop.innerHTML += updateinfo;
                    
                
                }, 5000);


    // var x = '';
    // var code = '';
    // y = new(window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
    // y.onreadystatechange = function() {
    //     if (y.readyState == 4) {
    //         if (y.status == 200) {
    //             code = y.responseText;
    //             console.log("got this");
    //             var code1 = code.substring(code.lastIndexOf("var info") + 11, code.indexOf("}}}") + 3);
    //             var obj = JSON.parse(code1);
    //             var title = obj.title;
    //             var quali = ["obj.stream_h264_hd1080_url", "obj.stream_h264_hd_url", "obj.stream_h264_hq_url", "obj.stream_h264_url", "obj.stream_h264_ld_url"];
    //             var qualityInfo = ["Full HD Quality,1080p", "Full HD Quality,720p", "High Quality,480p,MP4", "Medium Quality,360p,MP4", "Low Quality,240p,MP4"]
    //             drop.innerHTML = "";
    //             for (var j = 0; j < quali.length; j++) {
    //                 if (eval(quali[j]) != null) {
    //                     ++x;
    //                     drop.innerHTML += "<div style='font-size:13px;color:#bbb;font-family: arial,sans-serif;display: inline-block;'>" + x + ".</div> <a style='color:#167ac6;text-align:start;font-size:13px;font-family: arial,sans-serif;text-decoration:none;' href='" + eval(quali[j]) + "&title=cdvdv' title='vdvvv' download='title'>" + qualityInfo[j] + "</a></br></br>";

    //                 }
    //             }
    //             ispan.innerHTML = 'Download (' + x + ')';
    //             drop.innerHTML += updateinfo;
    //         } else console.log('ERR', y.status, y.statusText)
    //     }
    // };
    // y.open('GET', 'http://www.dailymotion.com/embed/video/' + video_id, true);
    // y.send();


} else if (video_page == "vm") {
    adddivs();
    var x = 1;
    var str = new String(ps1);
    var title = str.substring(str.lastIndexOf("<title>") + 7, str.lastIndexOf("</title>"));
    var video_tag = str.substring(str.lastIndexOf("<video"), str.lastIndexOf("</video>"));
    var video_src = video_tag.substring(video_tag.lastIndexOf('src="') + 5, video_tag.indexOf(">"));
    video_src = video_src.substring(0, video_src.indexOf('"'));
    drop.innerHTML += "1.<a href='" + video_src + "' download ='" + title + "' >" + title + "</a>";
    drop.innerHTML += updateinfo;
} else {
    adddivs();
    var x = 0;
    drop.innerHTML += "No download available for this page";
    drop.innerHTML += updateinfo;

}
drop.style.transition = 'height 1s';

function checkpagetrans() {
    ispan.innerHTML = 'Loading......';
    drop.style.display = 'none';
    setTimeout(function() {
        showdownloadinfo();
        console.log("page changes");
        //document.getElementById("watch7-sidebar-modules").onclick = checkpagetrans;
    }, 5000);

}
void(0);
