/**
 * base
 * create: 20151221
 * 高清基础模块
 * @module baseAjax
 * @since p142
 */
(function(window, undefined){
	/**
	 * 基础模块 - 业务逻辑
	 * @class base_HD_Ajax
	 */
	var	$win = $(window),
			doc  = document,
			$doc = $(doc),
			loc  = location,
			WS   = window.WS || (window.WS = {}),
			init = {},							//启动时加载程序
			base = WS.base || (WS.base = {});	//接口程序
	/**
	 * [qiAnghb description]
	 * @param  {[string]}   url [ajaxurl]
	 * @param  {Function} fn  [callback]
	 * @return {[null]}       [description]
	 */
	base.qiAnghb = function(url,fn){
		$.xajax(url,function(d){
			if(d.state==1){
				fn(d);
			}
		},{"state":"1", "success":"4", "errormsg":"错误原因错误原因错误原因"});
		//{"state":"1", "success":"3", "title":"芒果TV", "spurl":"www.baidu.com", "exchangeurl":"#", "perception":"30"});
		//{"state":"1", "success":"1", "date":"2015年12月31日", "exchangeurl":"#"});
		//{"state":"1", "success":"2", "money":"100", "date":"2015年12月31日", "exchangeurl":"#"});
		//{"state":"1", "success":"0"});
	};

	$.extend(base, $.loader(init));//将启动程序并入
})(window)