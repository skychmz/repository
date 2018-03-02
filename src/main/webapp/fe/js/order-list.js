webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(79);


/***/ }),

/***/ 2:
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

/***/ 3:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 12:
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

/***/ 13:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 15:
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

/***/ 16:
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

/***/ 47:
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

/***/ 48:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\n{{#isActive}}\n<li class=\"nav-item active\">\n{{/isActive}}\n{{^isActive}}\n<li class=\"nav-item\">\n{{/isActive}}\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\n</li>\n{{/navList}}";

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-28 11:58:08
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-28 15:36:16
	*/

	'use strict';
	__webpack_require__(61);
	var _mm                 = __webpack_require__(8);
	var templatePagination  = __webpack_require__(63);

	var Pagination = function(){
	    var _this = this;
	    this.defaultOption = {
	        container       : null,
	        pageNum         : 1,
	        pageRange       : 3,
	        onSelectPage    : null
	    };
	    // 事件的处理
	    $(document).on('click', '.pg-item', function(){
	        var $this = $(this);
	        // 对于active和disabled按钮点击，不做处理
	        if($this.hasClass('active') || $this.hasClass('disabled')){
	            return;
	        }
	        typeof _this.option.onSelectPage === 'function' 
	            ? _this.option.onSelectPage($this.data('value')) : null;
	    });
	};
	// 渲染分页组件
	Pagination.prototype.render = function(userOption){
	    // 合并选项
	    this.option = $.extend({}, this.defaultOption, userOption);
	    // 判断容器是否为合法的jquery对象
	    if(!(this.option.container instanceof jQuery)){
	        return;
	    }
	    // 判断是否只有1页
	    if(this.option.pages <= 1){
	        return;
	    }
	    // 渲染分页内容
	    this.option.container.html(this.getPaginationHtml());
	};
	// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
	Pagination.prototype.getPaginationHtml = function(){
	    var html        = '',
	        option      = this.option,
	        pageArray   = [],
	        start       = option.pageNum - option.pageRange > 0 
	            ? option.pageNum - option.pageRange : 1,
	        end         = option.pageNum + option.pageRange < option.pages
	            ? option.pageNum + option.pageRange : option.pages;
	    // 上一页按钮的数据
	    pageArray.push({
	        name : '上一页',
	        value : this.option.prePage,
	        disabled : !this.option.hasPreviousPage
	    });
	    // 数字按钮的处理
	    for(var i = start; i <= end; i++){
	        pageArray.push({
	            name : i,
	            value : i,
	            active : (i === option.pageNum)
	        });
	    };
	    // 下一页按钮的数据
	    pageArray.push({
	        name : '下一页',
	        value : this.option.nextPage,
	        disabled : !this.option.hasNextPage
	    });
	    html = _mm.renderHtml(templatePagination, {
	        pageArray   : pageArray,
	        pageNum     : option.pageNum,
	        pages       : option.pages
	    });
	    return html;
	};

	module.exports = Pagination;

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

	module.exports = "<div class=\"pg-content\">\n    {{#pageArray}}\n    {{#disabled}}\n        <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span>\n    {{/disabled}}\n    {{^disabled}}\n        {{#active}}\n            <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span>\n        {{/active}}\n        {{^active}}\n            <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span>\n        {{/active}}\n    {{/disabled}}\n    {{/pageArray}}\n    <span class=\"pg-total\">{{pageNum}} / {{pages}}</span>\n</div>";

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by weimin on 2017/7/13 0013.
	 */

	'use strict';
	var _mm = __webpack_require__(8);

	var _order = {
	    // 获取商品列表
	    getProductList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 提交订单
	    createOrder : function(orderInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/create.do'),
	            data    : orderInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取订单列表
	    getOrderList : function(listParam, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/list.do'),
	            data    : listParam,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取订单详情
	    getOrderDetail : function(orderNumber, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/detail.do'),
	            data    : {
	                orderNo : orderNumber
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消订单
	    cancelOrder : function(orderNumber, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/cancel.do'),
	            data    : {
	                orderNo : orderNumber
	            },
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _order;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by weimin on 2017/7/13 0013.
	 */

	'use strict';
	__webpack_require__(80);
	__webpack_require__(12);
	__webpack_require__(21);
	__webpack_require__(2);
	var navSide       = __webpack_require__(47);
	var _mm           = __webpack_require__(8);
	var _order        = __webpack_require__(68);
	var Pagination    = __webpack_require__(60);
	var templateIndex = __webpack_require__(82);

	// page 逻辑部分
	var page = {
	    data          : {
	        listParam: {
	            pageNum : 1,
	            pageSize: 10
	        }
	    },
	    init          : function () {
	        this.onLoad();
	    },
	    onLoad        : function () {
	        //初始化左侧菜单
	        navSide.init({
	            name: 'order-list'
	        });
	        //加载订单列表
	        this.loadOrderList();
	    },
	    //加载订单列表
	    loadOrderList : function () {
	        var _this         = this,
	            orderListHtml = '',
	            $listCon      = $('.order-list-con');
	        $listCon.html('<div class="loading"></div>');
	        _order.getOrderList(this.data.listParam, function (res) {
	            // _this.dataFilter(res);
	            //渲染html
	            orderListHtml = _mm.renderHtml(templateIndex, res);
	            $listCon.html(orderListHtml);
	            _this.loadPagination({
	                hasPreviousPage: res.hasPreviousPage,
	                prePage        : res.prePage,
	                hasNextPage    : res.hasNextPage,
	                nextPage       : res.nextPage,
	                pageNum        : res.pageNum,
	                pages          : res.pages
	            });
	        }, function (errMsg) {
	            $listCon.html('<p class="err-tip">加载提示信息失败，请刷新</p>');
	        });
	    },
	    //数据适配
	    // dataFilter    : function (data) {
	    //     data.isEmpty = !data.list.length;
	    // },
	    // 加载分页信息
	    loadPagination: function (pageInfo) {
	        var _this = this;
	        this.pagination ? '' : (this.pagination = new Pagination());
	        this.pagination.render($.extend({}, pageInfo, {
	            container   : $('.pagination'),
	            onSelectPage: function (pageNum) {
	                _this.data.listParam.pageNum = pageNum;
	                _this.loadOrderList();
	            }
	        }));
	    }
	};
	$(function () {
	    page.init();
	});


/***/ }),

/***/ 80:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

	module.exports = "<table class=\"order-list-table\">\n    <tr>\n        <th class=\"cell cell-img\">&nbsp;</th>\n        <th class=\"cell cell-info\">商品信息</th>\n        <th class=\"cell cell-price\">单价</th>\n        <th class=\"cell cell-count\">数量</th>\n        <th class=\"cell cell-total\">小计</th>\n    </tr>\n</table>\n{{#list}}\n<table class=\"order-list-table order-item\">\n    <tr>\n        <td colspan=\"5\" class=\"order-info\">\n                                <span class=\"order-text\">\n                                    <span>订单号</span>\n                                    <a href=\"order-detail.html?orderNumber={{orderNo}}\"\n                                       class=\"link order-num\" target=\"_blank\">{{orderNo}}</a>\n                                </span>\n            <span class=\"order-text\">{{createTime}}</span>\n            <span class=\"order-text\">收件人：{{receiverName}}</span>\n            <span class=\"order-text\">订单状态：{{statusDesc}}</span>\n            <span class=\"order-text\">\n                                    <span>订单总价：</span>\n                                    <span class=\"order-total\">￥{{payment}}</span>\n                                </span>\n            <a href=\"order-detail.html?orderNumber={{orderNo}}\" class=\"link order-detail\">查看详情></a>\n        </td>\n    </tr>\n    {{#orderItemVoList}}\n    <tr>\n        <td class=\"cell cell-img\">\n            <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\" class=\"link\">\n                <img src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\" class=\"p-img\"/>\n            </a>\n        </td>\n        <td class=\"cell cell-info\">{{productName}}</td>\n        <td class=\"cell cell-price\">￥{{currentUnitPrice}}</td>\n        <td class=\"cell cell-count\">{{quantity}}</td>\n        <td class=\"cell cell-total\">￥{{totalPrice}}</td>\n    </tr>\n    {{/orderItemVoList}}\n</table>\n{{/list}}\n{{^list}}\n<p class=\"err-tip\">暂时没有订单</p>\n{{/list}}";

/***/ })

});