webpackJsonp([4],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-18 19:30:12
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-27 19:46:42
	*/

	'use strict';
	__webpack_require__(3);
	var _mm     = __webpack_require__(8);
	// 通用页面头部
	var header = {
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        var keyword = _mm.getUrlParam('keyword');
	        // keyword存在，则回填输入框
	        if(keyword){
	            $('#search-input').val(keyword);
	        };
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 点击搜索按钮以后，做搜索提交
	        $('#search-btn').click(function(){
	            _this.searchSubmit();
	        });
	        // 输入会车后，做搜索提交
	        $('#search-input').keyup(function(e){
	            // 13是回车键的keyCode
	            if(e.keyCode === 13){
	                _this.searchSubmit();
	            }
	        });
	    },
	    // 搜索的提交
	    searchSubmit : function(){
	        var keyword = $.trim($('#search-input').val());
	        // 如果提交的时候有keyword,正常跳转到list页
	        if(keyword){
	            window.location.href = './list.html?keyword=' + keyword;
	        }
	        // 如果keyword为空，直接返回首页
	        else{
	            _mm.goHome();
	        }
	    }
	};

	header.init();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-17 14:17:01
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-22 12:21:05
	*/

	'use strict';
	__webpack_require__(13);
	var _mm     = __webpack_require__(8);
	var _user   = __webpack_require__(15);
	var _cart   = __webpack_require__(16);
	// 导航
	var nav = {
	    init : function(){
	        this.bindEvent();
	        this.loadUserInfo();
	        this.loadCartCount();
	        return this;
	    },
	    bindEvent : function(){
	        // 登录点击事件
	        $('.js-login').click(function(){
	            _mm.doLogin();
	        });
	        // 注册点击事件
	        $('.js-register').click(function(){
	            window.location.href = './user-register.html';
	        });
	        // 退出点击事件
	        $('.js-logout').click(function(){
	            _user.logout(function(res){
	                window.location.reload();
	            }, function(errMsg){
	                _mm.errorTips(errMsg);
	            });
	        });
	    },
	    // 加载用户信息
	    loadUserInfo : function(){
	        _user.checkLogin(function(res){
	            $('.user.not-login').hide().siblings('.user.login').show()
	                .find('.username').text(res.username);
	        }, function(errMsg){
	            // do nothing
	        });
	    },
	    // 加载购物车数量
	    loadCartCount : function(){
	        _cart.getCartCount(function(res){
	            $('.nav .cart-count').text(res || 0);
	        }, function(errMsg){
	            $('.nav .cart-count').text(0);
	        });
	    }
	};

	module.exports = nav.init();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: WillGiab
	* @Date:   2017-06-14 00:40:04
	* @Last Modified by:   WillGiab
	* @Last Modified time: 2017-06-14 11:43:26
	*/

	'use strict';
	var _mm = __webpack_require__(8);

	var _user = {
	    // 用户登录
	    login:function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查用户名
	    checkUsername:function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/login.do'),
	            data    : {
	                type    :'username',
	                str     :username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register:function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/register.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登陆状态
	    checkLogin:function(resolve,reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo:function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新用户信息
	    updateUserInfo:function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取提示问题
	    getQuestion:function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_get_question.do'),
	            data    : {
	              username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    checkAnswer:function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    resetPassword:function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新密码
	    updatePassword:function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/reset-password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登出
	    logout:function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/logout.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    }
	};
	module.exports = _user;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: 0284
	* @Date:   2017-06-14 11:46:02
	* @Last Modified by:   0284
	* @Last Modified time: 2017-06-14 11:50:09
	*/

	'use strict';
	var _mm = __webpack_require__(8);

	var _cart = {
	    // 获取购物车数量
	    getCartCount:function(resolve,reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
	            success : resolve,
	            error   : reject 
	        });
	    },
	    //添加到购物车
	    addToCart:function (productInfo,resolve,reject) {
	        _mm.request({
	            url:_mm.getServerUrl('/cart/add.do'),
	            data:productInfo,
	            success:resolve,
	            error:reject
	        });
	    },
	    // 获取购物车列表
	    getCartList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/list.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选择购物车商品
	    selectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select.do'),
	            data    :{
	                productId:productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选择购物车商品
	    unSelectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select.do'),
	            data    :{
	                productId:productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选中全部商品
	    selectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选择全部商品
	    unSelectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新购物车商品数量
	    updateProduct : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/update.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    //删除指定商品
	    deleteProduct : function(productIds, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/delete_product.do'),
	            data    : {
	                productIds:productIds
	            },
	            success : resolve,
	            error   : reject
	        });
	    },

	};
	module.exports = _cart;

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-08 15:19:12
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-26 19:36:18
	*/

	'use strict';
	__webpack_require__(41);
	__webpack_require__(12);
	__webpack_require__(2);
	__webpack_require__(43);
	var navSide         = __webpack_require__(47);
	var templateBanner  = __webpack_require__(51);
	var _mm             = __webpack_require__(8);

	$(function() {
	    // 渲染banner的html
	    var bannerHtml  = _mm.renderHtml(templateBanner);
	    $('.banner-con').html(bannerHtml);
	    // 初始化banner
	    var $slider     = $('.banner').unslider({
	        dots: true
	    });
	    // 前一张和后一张操作的事件绑定
	    $('.banner-con .banner-arrow').click(function(){
	        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
	        $slider.data('unslider')[forward]();
	    });
	});


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-26 18:19:14
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-26 18:20:00
	*/

	'use strict';

	__webpack_require__(44);
	__webpack_require__(46);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */,
/* 46 */
/***/ (function(module, exports) {

	window.console&&console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),function(t,s){if(!t)return s;var i=function(){this.el=s,this.items=s,this.sizes=[],this.max=[0,0],this.current=0,this.interval=s,this.opts={speed:500,delay:3e3,complete:s,keys:!s,dots:s,fluid:s};var i=this;this.init=function(s,i){return this.el=s,this.ul=s.children("ul"),this.max=[s.outerWidth(),s.outerHeight()],this.items=this.ul.children("li").each(this.calculate),this.opts=t.extend(this.opts,i),this.setup(),this},this.calculate=function(s){var e=t(this),n=e.outerWidth(),h=e.outerHeight();i.sizes[s]=[n,h],n>i.max[0]&&(i.max[0]=n),h>i.max[1]&&(i.max[1]=h)},this.setup=function(){if(this.el.css({overflow:"hidden",width:i.max[0],height:this.items.first().outerHeight()}),this.ul.css({width:100*this.items.length+"%",position:"relative"}),this.items.css("width",100/this.items.length+"%"),this.opts.delay!==s&&(this.start(),this.el.hover(this.stop,this.start)),this.opts.keys&&t(document).keydown(this.keys),this.opts.dots&&this.dots(),this.opts.fluid){var e=function(){i.el.css("width",Math.min(Math.round(i.el.outerWidth()/i.el.parent().outerWidth()*100),100)+"%")};e(),t(window).resize(e)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function(){t.isFunction(i[this.className])&&i[this.className]()}),t.event.swipe&&this.el.on("swipeleft",i.prev).on("swiperight",i.next)},this.move=function(s,e){this.items.eq(s).length||(s=0),0>s&&(s=this.items.length-1);var n=this.items.eq(s),h={height:n.outerHeight()},o=e?5:this.opts.speed;this.ul.is(":animated")||(i.el.find(".dot:eq("+s+")").addClass("active").siblings().removeClass("active"),this.el.animate(h,o)&&this.ul.animate(t.extend({left:"-"+s+"00%"},h),o,function(){i.current=s,t.isFunction(i.opts.complete)&&!e&&i.opts.complete(i.el)}))},this.start=function(){i.interval=setInterval(function(){i.move(i.current+1)},i.opts.delay)},this.stop=function(){return i.interval=clearInterval(i.interval),i},this.keys=function(s){var e=s.which,n={37:i.prev,39:i.next,27:i.stop};t.isFunction(n[e])&&n[e]()},this.next=function(){return i.stop().move(i.current+1)},this.prev=function(){return i.stop().move(i.current-1)},this.dots=function(){var s='<ol class="dots">';t.each(this.items,function(t){s+='<li class="dot'+(1>t?" active":"")+'">'+(t+1)+"</li>"}),s+="</ol>",this.el.addClass("has-dots").append(s).find(".dot").click(function(){i.move(t(this).index())})}};t.fn.unslider=function(s){var e=this.length;return this.each(function(n){var h=t(this),o=(new i).init(h,s);h.data("unslider"+(e>1?"-"+(n+1):""),o)})}}(window.jQuery,!1);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-19 17:39:14
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-24 16:46:02
	*/
	'use strict';
	__webpack_require__(48);
	var _mm             = __webpack_require__(8);
	var templateIndex   = __webpack_require__(50);
	// 侧边导航
	var navSide = {
	    option : {
	        name : '',
	        navList : [
	            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
	            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
	            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
	            {name : 'about', desc : '关于eshop', href: './about.html'}
	        ]
	    },
	    init : function(option){
	        // 合并选项
	        $.extend(this.option, option);
	        this.renderNav();
	    },
	    // 渲染导航菜单
	    renderNav : function(){
	        // 计算active数据
	        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
	            if(this.option.navList[i].name === this.option.name){
	                this.option.navList[i].isActive = true;
	            }
	        };
	        // 渲染list数据
	        var navHtml = _mm.renderHtml(templateIndex, {
	            navList : this.option.navList
	        });
	        // 把html放入容器
	        $('.nav-side').html(navHtml);
	    }
	};

	module.exports = navSide;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 49 */,
/* 50 */
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\n{{#isActive}}\n<li class=\"nav-item active\">\n{{/isActive}}\n{{^isActive}}\n<li class=\"nav-item\">\n{{/isActive}}\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\n</li>\n{{/navList}}";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"banner\">\n    <ul>\n        <li>\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(52) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100030\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(53) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100016\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(54) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100001\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(55) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(56) + "\" />\n            </a>\n        </li>\n    </ul>\n    <div class=\"banner-arrow prev\">\n        <i class=\"fa fa-angle-left\"></i>\n    </div>\n    <div class=\"banner-arrow next\">\n        <i class=\"fa fa-angle-right\"></i>\n    </div>\n</div>";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner1.jpg";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner2.jpg";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner3.jpg";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner4.jpg";

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner5.jpg";

/***/ })
]);