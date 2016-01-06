/**
 * base
 * create: 20151221
 * 高清基础模块
 * @module base
 * @since p142
 */
(function(window, undefined){
	/**
	 * 基础模块 - 交互逻辑
	 * @class base_HD
	 */
	var	$win = $(window),
			doc  = document,
			$doc = $(doc),
			loc  = location,
			WS   = window.WS || (window.WS = {}),
			init = {},							//启动时加载程序
			base = WS.base || (WS.base = {});	//接口程序

	init.public = function(){
		// $doc.on('keydown',function(e){
		// 	switch (e.keyCode){
		// 		case 48:
		// 			loc.reload();
		// 			break;
		// 		case 57:
		// 			loc.href = '../index.html';
		// 			break;
		// 	}
		// });
	}
	init.p142 = function(){
		var active = 0;
		$doc.on('click','.J_qing', function(){
			var url = $(this).attr('data-ajax'),
					$modal = $('#modal');
			base.qiAnghb(url,function(data){
				var success = data.success,
						node = '',
						css = success ==1 ? 'experience' : success==2 ? 'money' : success==3 ? 'success' : success==4 ? 'fail' : 'miss',
						dd = {},
				 		render = null;
				if(success==1){
					dd = {
						date: data.date,
						url: data.exchangeurl
					};
					node = '<div class="pa date">（请于{{date}}前使用）</div>' + '<div class="pa btn_bx tc"><a href={{url}} class="btn btn-sm"><span>立即兑换</span></a></div>';
				}else if(success==2){
					dd = {
						money: data.money,
						date: data.date,
						url: data.exchangeurl
					};
					node = '<div class="pa text">{{money}}</div>' + '<div class="pa date money">（请于{{date}}前使用）</div>' + '<div class="pa btn_bx tc"><a href={{url}} class="btn btn-sm"><span>立即兑换</span></a></div>';
				}else if (success==3){
					dd = {
						title: data.title,
						perception: data.perception,
						spurl: data.spurl,
						exchangeurl: data.exchangeurl
					};
					node = '<div class="pa sptitle tc">{{title}}</div>' +
						'<div class="pa success-info tc">已经进入您的口袋啦！体验时间{{perception}}天。</div>' +
						'<div class="pa btn_bx tc"><a href="{{spurl}}" class="btn btn-md"><span>去观看节目</span></a><a href={{exchangeurl}} class="btn btn-md"><span>继续兑换红包</span></a></div>';
				}else if(success==4){
					dd = {
						msg: data.errormsg,
						url: base.url.homeurl
					};
					node = '<div class="pa error">{{msg}}<p>若有疑问请拨打客服热线96335咨询。</p></div>' + '<div class="pa btn_bx tc"><a href="{{url}}" class="btn btn-sm"><span>确定</span></a></div>'
				}
				else{
					dd = {
						url: base.url.exiturl
					};
					node = '<div class="pa btn_bx tc"><a href="javascript:;" class="btn btn-lg"><span>没关系，再领一次</span></a><a href={{url}} class="btn btn-sm"><span>黯然离开</span></a></div>';
				}
				render = template.compile(node);
				$('#modal').html(render(dd));
				$modal.addClass('show '+ css);
				var $btn = $modal.find('.btn');
				if($btn.size()>1){
					$btn.on('keydown',function(e){
						var $this = $(this),
								index = $this.index(),
								key = index==0 ? 39 : 37;
						if((e.keyCode!=key) && (e.keyCode!=13)) return false;
					});
				}else{
					$btn.on('keydown',function(e){
						if(e.keyCode!=13) return false;
					});
				}
				$btn.eq(0).focus();
				var $lg = $modal.find('.btn-lg');
				$lg.size() && $lg.on('click', function(){
					$modal.removeClass('show fail');
					$('.J_qing').focus();
				});
			});
		}).on('keydown', '#recommend', function(e){
			var	$bx     = $('#recommend_bx'),
					$img    = $bx.find('.img_bx'),
					key     = e.keyCode,
					$active = $bx.find('.middle'),
					$right  = $bx.find('.right'),
					$left   = $bx.find('.left'),
					index   = $active.index(),
					$roll   = $('.roll_box'),
					$span   = $roll.find('span');
			if(key==39){
				nextRoll();
				return false;
			}
			if(key==37){
				prevRoll();
				return false;
			}
			if(key==13){
				loc.href = $bx.find('.middle').attr('data-url');
				return false;
			}
			function nextRoll(){
				$active.removeClass('middle').addClass('left');
				$right.removeClass('right').addClass('middle');
				$left.removeClass('left').addClass('right');
				_roll(1);
			}
			function prevRoll(){
				$active.removeClass('middle').addClass('right');
				$right.removeClass('right').addClass('left');
				$left.removeClass('left').addClass('middle');
				_roll(-1);
			}
			function _roll(nb){
				$span.eq(active).removeClass('active');
				active+=nb;
				if(active<0) active=2;
				if(active>2) active=0;
				$span.eq(active).addClass('active');
			}
		});
	}
	/**
	 * [Obj description]
	 * @param {[string]} id [节点ID]
	 */
	base.Obj = function (id){
		var obj = document.getElementById(id);
		return obj;
	}
	/**
	 * [render description]
	 * @param  {[string]} id     [dom节点ID]
	 * @param  {[string]} nodeID [模板ID]
	 * @param  {[obj]} data [json数据对象]
	 * @return {[obj]} [dom节点]
	 */
	base.render = function(id,nodeID,data){
		base.Obj(id).innerHTML= template(nodeID,data);
	}
	$.extend(base, $.loader(init));//将启动程序并入
})(window)
