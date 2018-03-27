function queryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function limit_height(h) {
    var m_h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (h < 0) {
        return 0
    } else if (h > m_h - 43) {
        return m_h - 43
    } else
        return h
}
function limit_width(w) {
    var m_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 0) {
        return 0
    } else if (w > m_w - 43) {
        return m_w - 43
    } else
        return w
}
