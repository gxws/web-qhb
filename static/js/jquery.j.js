/**
 * jQuery J Plugins
 * jqjjian@126.com
 */
+function(window, undefined){
	'use strict';
	var jQueryJ = function($){
		var $win = $(window),
				$doc = $(document),
				Fn = function(){};
		$.extend({
			pagination: function(options){
				var defaults = {
							pagnbId: "",//翻页按钮组ID
							templateId: "",//模板ID
							containerId: "",//容器ID
							prev: "prev",//上一页
							next: "next",//下一页
							curr: 1,//当前页码
							//size: 0//显示数量
							//total: 0,//总记录数
							row: 1,//行数
							span: 4, //每行个数
							extra: 0,//额外个数
							other: false,
							items: [] //数据
						},
						param = defaults;
				$.extend(param,options);
				var itemslen = param.items.length;
				param.total = param.total || itemslen;//计算总数
				param.size = param.row*param.span;//计算每页显示个数
				if(!param.templateId || !param.containerId || itemslen===0) return;
				var $prev = $('#'+ param.prev),
						$next = $('#'+ param.next),
						$pgnb = $('#'+ param.pagnbId),
						$curr = $pgnb.find('.curr'),
						$total = $pgnb.find('.total'),
						start = 0,
						pages = Math.ceil((param.total+param.extra) / (param.size));
				$total.text(pages);
				$prev.on('keydown', function(e){
        	if( param.curr > 1 && e.keyCode==37 || e.keyCode==13){
        			paging(-1);
        	}
        });
        $next.on('keydown', function(e){
        	if(param.curr < pages && e.keyCode==39 || e.keyCode==13){
        			paging(1);
        	}
        });
        var paging = function(nb){
        	param.curr+=nb;
          loadData(param.row);
        },
        zs=0;
				var loadData = function(row){
					if(param.other===true){
						var $pg = $('.pg');
						if(param.curr === 1) { //设置起始位置
	            start = 0;
	            $('#recommend_bx').show();
	            $('#quan_bx_after').hide();
	            $pg.addClass('bottom').removeClass('middle');
	          }else if(param.curr === 2){
	          	$('#recommend_bx').hide();
	            $('#quan_bx_after').show();
	            start = param.span;
	            $pg.addClass('middle').removeClass('bottom');
	          }else{
	          	start = zs;
	          	$pg.addClass('middle').removeClass('bottom');
	          }
	          zs = start + param.span*row;
					}else{
						if(param.curr === 1){
							start = 0;
						}else{
							start = (param.curr-1) * param.size
						}
						zs = start + param.size;
					}
          var data = {
          	list: param.items.slice(start, zs),
          	row: param.row
          },
          html = template(param.templateId, data);
          $('#'+ param.containerId).html(html);
          $curr.text(param.curr);
          //判断显示翻页按钮
          $prev[pages === 1 || param.curr === 1 ? 'hide' : 'show']();
          $next[pages === 1 || param.curr === pages ? 'hide' : 'show']();
				}
				return loadData(1);
			}
		});
		return $;
	},
	jQuery		= window.jQuery;
	jQuery && jQuery().jquery && jQueryJ(jQuery);
}(window);