/*
user:罗勇,
data:2015.1.15
参数    列表ul的类            ul_Class
        最大容器类            contain_select
        默认的显示值的类      dj
调用方法见html
*/


$.fn.extend({
    select:function(ul_Class,contain_select,dj){
        var     myselect=$("."+contain_select),
            ulClass=myselect.find($("."+ul_Class)),
            dj_p=myselect.find($("."+dj)),
            ul_li=ulClass.find("li");
        dj_p.html( ulClass.children().first().html());
        dj_p.on("click",function(){
            ul_li.each(function(i,n){
                if(  dj_p.html()==$(ul_li[i]).html()){
                    $(ul_li[i]).addClass("in_hover").removeClass("out_hover");
                    $(ul_li[i]).siblings().addClass("out_hover").removeClass("in_hover");
                }
            });
            if(ulClass.hasClass("close")){
                ulClass.addClass("open").removeClass("close");
            }else{
                ulClass.addClass("close").removeClass("open");
            };
            return false;
        });
        ul_li.hover(function(){
            $(this).addClass("in_hover").removeClass("out_hover");
            $(this).siblings().addClass("out_hover").removeClass("in_hover");
        },function(){

        });
        ul_li.on("click",function(){
            dj_p.html($(this).html());
            ulClass.addClass("close").removeClass("open");
            return false;
        });
        $(document).on("click",function(){/*点击空白处关闭下拉列表*/
            ulClass.addClass("close").removeClass("open");
        })
    }

});