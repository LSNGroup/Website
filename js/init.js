/**
 * Created on 2018/5/22.
 */
//Prohibit the right mouse button
document.oncontextmenu = function(){
    return false;
}
//menu
$('#menu').onePageNav({
    currentClass: 'active',
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: '',
    easing: 'swing',
    begin: function() {
    },
    end: function() {
    },
    scrollChange: function($currentListItem) {
    }
});
$('.DB_tab25').DB_tabMotionBanner({
    key: 'b28551',
    autoRollingTime: 6000,
    bgSpeed: 1000,
    motion: {
        DB_1_1: { left: -50, opacity: 0, speed: 1000, delay: 500 },
        DB_1_2: { left: -50, opacity: 0, speed: 1000, delay: 1000 },
        DB_1_3: { left: 100, opacity: 0, speed: 1000, delay: 1500 },
        DB_2_1: { top: 50, opacity: 0, speed: 1000, delay: 500 },
        DB_2_2: { top: 50, opacity: 0, speed: 1000, delay: 1000 },
        DB_2_3: { top: 100, opacity: 0, speed: 1000, delay: 1500 },
        DB_3_1: { left: -50, opacity: 0, speed: 1000, delay: 500 },
        DB_3_2: { top: 50, opacity: 0, speed: 1000, delay: 1000 },
        DB_3_3: { top: 0, opacity: 0, speed: 1000, delay: 1500 },
        end: null
    }
})
//Show nodes info
var nodes_key = 'xw5G12GHWQSGVwXWZSX03VtJHKBfAZzk';
$.post("action.php",{nodes_key: nodes_key},
function(data){
    var result = eval("("+data+")");
    if(result != 0 ){
        $("#number-nodes").attr('data-to', result.number_nodes);
        $("#free-quantity").attr('data-to', result.free_quantity);
        $("#busy-quantity").attr('data-to', result.busy_quantity);
    }
    var wrapTop = $(".main-info").offset().top;
    var istrue = true;
    $(window).on("scroll",
        function() {
            var s = $(window).scrollTop();
            if (s > wrapTop - 500 && istrue) {
                $(".timer").each(count);
                function count(a) {
                    var b = $(this);
                    a = $.extend({},
                        a || {},
                        b.data("countToOptions") || {});
                    b.countTo(a)
                };
                istrue = false;
            };
        })
    //设置计数
    $.fn.countTo = function (options) {
        options = options || {};
        return $(this).each(function () {
            //当前元素的选项
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals')
            }, options);
            //更新值
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            //更改应用和变量
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            $self.data('countTo', data);
            //如果有间断，找到并清除
            if (data.interval) {
                clearInterval(data.interval);
            };
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            //初始化起始值
            render(value);
            function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    //移出间隔
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }
            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };
    $.fn.countTo.defaults={
        from:1,               //数字开始的值
        to:0,                 //数字结束的值
        speed:1000,           //设置步长的时间
        refreshInterval:30,    //隔间值
        decimals:0,           //显示小位数
        formatter: formatter, //渲染之前格式化
        onUpdate:null,        //每次更新前的回调方法
        onComplete:null       //完成更新的回调方法
    };
    function formatter(value, settings){
        return value.toFixed(settings.decimals);
    }
    //自定义格式
    $('#number-nodes').data('countToOptions',{
        formmatter:function(value, options){
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });
    //定时器
    $('.timer').each(count);
    function count(options){
        var $this=$(this);
        options=$.extend({}, options||{}, $this.data('countToOptions')||{});
        $this.countTo(options);
    }
});