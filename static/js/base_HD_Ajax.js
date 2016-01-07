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
	$.extend(base, $.loader(init));//将启动程序并入
})(window)