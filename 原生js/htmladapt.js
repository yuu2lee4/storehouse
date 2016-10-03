/*
 author:    yuri
 version:   0.0.1   
 design_w:  初始化（效果图）宽度，
 maxW:  最大页面宽度，超过这个宽度html fontsize不再变化 建议跟设计图宽度一样
 minW:  最小页面宽度，小于这个宽度html fontsize不再变化 建议为320
 default_fz:    初始化页面html字体大小
 说明： 最好在body加载之前执行
 */
var htmladapt = {
    opt:{
        design_w:720,
        maxW:0,
        minW:0,
        default_fz:100
    },
    tid: null,
    htmlObj:document.getElementsByTagName('html')[0],
    init:function (option){
        var self = this;
        this.extend(this.opt,option);
        //alert(1);
        this.setHtmlFontSize();
        
        window.addEventListener('resize', function() {
            clearTimeout(self.tid);
            self.tid = setTimeout(self.setHtmlFontSize.bind(self), 300);
        }, false);
        window.addEventListener('pageshow', function(e) {
            if (e.persisted) {
                clearTimeout(self.tid);
                self.tid = setTimeout(self.setHtmlFontSize.bind(self), 300);
            }
        }, false);
    },
    setHtmlFontSize:function(){
        var opt = this.opt,fz;
        var base = win_width = window.document.documentElement.getBoundingClientRect().width;
        
        if(opt.maxW && win_width > opt.maxW){//最大值
            base = opt.maxW;
        }
        if(opt.minW && win_width < opt.minW){//最小值
            base = opt.minW;
        }
        fz = (base/opt.design_w)*opt.default_fz;
        this.htmlObj.style.fontSize = fz+'px';
    },
    extend:function(o,n){
        for(var p in n){
            if(n.hasOwnProperty(p) || !o.hasOwnProperty(p)){
                o[p]=n[p];
            }
        }
    },
    getStyle:function(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
    }
}

