webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(79);


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	

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

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(52);
	var _mm             = __webpack_require__(8);
	var templateIndex   = __webpack_require__(54);
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

/***/ 52:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\n{{#isActive}}\n<li class=\"nav-item active\">\n{{/isActive}}\n{{^isActive}}\n<li class=\"nav-item\">\n{{/isActive}}\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\n</li>\n{{/navList}}";

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

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

	
	'use strict';
	__webpack_require__(80);
	__webpack_require__(12);
	__webpack_require__(2);
	var navSide         = __webpack_require__(51);
	var _mm             = __webpack_require__(8);
	var _order          = __webpack_require__(72);
	var templateIndex   = __webpack_require__(82);

	var page = {
	    data           : {
	        orderNumber: _mm.getUrlParam('orderNumber')
	    },
	    init           : function () {
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad         : function () {
	        navSide.init({
	            name:'order-list'
	        });
	        this.loadPaymentInfo();
	    },
	    bindEvent      : function () {
	        var _this = this;
	        $(document).on('click', '.order-cancel', function(){
	            if(window.confirm('确实要取消该订单？')){
	                _order.cancelOrder(_this.data.orderNumber, function(res){
	                    _mm.successTips('该订单取消成功');
	                    _this.loadPaymentInfo();
	                }, function(errMsg){
	                    _mm.errorTips(errMsg);
	                });
	            }
	        });
	    },

	    // 加载订单 数据
	    loadPaymentInfo: function () {
	        var _this         = this,
	            orderDetailHtml = '',
	            $content      = $('.content');
	        $content.html('<div class="loading"></div>');
	        _order.getOrderDetail(this.data.orderNumber, function (res) {
	            _this.dataFilter(res);
	            //渲染html
	            orderDetailHtml = _mm.renderHtml(templateIndex, res);
	            $content.html(orderDetailHtml);
	        }, function (errMsg) {
	            $content.html('<p class="err-tip">' + errMsg + '</p>');
	        });
	    },
	    // 数据的适配
	    dataFilter : function(data){
	        data.needPay        = data.status == 10;
	        data.isCancelable   = data.status == 10;
	        data.isPayed        = data.status >= 20;

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

	module.exports = "<div class=\"panel\">\n    <div class=\"panel-title\">订单信息</div>\n    <div class=\"panel-body\">\n        <div class=\"order-info\">\n            <div class=\"text-line\">\n                <span class=\"text\">订单号：{{orderNo}}</span>\n                <span class=\"text\">创建时间：{{createTime}}</span>\n            </div>\n            <div class=\"text-line\">\n                <span class=\"text\">\n                    收件人：\n                    {{receiverName}}\n                    {{shippingVo.receiverProvince}}\n                    {{shippingVo.receiverCity}}\n                    {{shippingVo.receiverAddress}}\n                    {{shippingVo.receiverMobile}}\n                </span>\n            </div>\n            <div class=\"text-line\">\n                <span class=\"text\">订单状态： {{statusDesc}}</span>\n            </div>\n            <div class=\"text-line\">\n                <span class=\"text\">支付方式：{{paymentTypeDesc}}</span>\n            </div>\n            <div class=\"text-line\">\n                {{#needPay}}\n                <a class=\"btn\" href=\"./payment.html?orderNumber={{orderNo}}\">去支付</a>\n                {{/needPay}}\n                {{#isCancelable}}\n                <a class=\"btn order-cancel\">取消订单</a>\n                {{/isCancelable}}\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"panel\">\n    <div class=\"panel-title\">商品清单</div>\n    <div class=\"panel-body\">\n        <table class=\"product-table\">\n            <tr>\n                <th class=\"cell-th cell-img\">&nbsp;</th>\n                <th class=\"cell-th cell-info\">商品信息</th>\n                <th class=\"cell-th cell-price\">单价</th>\n                <th class=\"cell-th cell-count\">数量</th>\n                <th class=\"cell-th cell-total\">小计</th>\n            </tr>\n            {{#orderItemVoList}}\n            <tr>\n                <td class=\"cell cell-img\">\n                    <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\">\n                        <img class=\"p-img\" src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\" />\n                    </a>\n                </td>\n                <td class=\"cell cell-info\">\n                    <a class=\"link\" href=\"./detail.html?productId={{productId}}\" target=\"_blank\">{{productName}}</a>\n                    {{#isPayed}}\n                        <a href=\"./comment-add.html?productId={{productId}}\" target=\"_blank\">去评价>></a>\n                    {{/isPayed}}\n                </td>\n                <td class=\"cell cell-price\">￥{{currentUnitPrice}}</td>\n                <td class=\"cell cell-count\">{{quantity}}</td>\n                <td class=\"cell cell-total\">￥{{totalPrice}}</td>\n            </tr>\n            {{/orderItemVoList}}\n        </table>\n        <p class=\"total\">\n        \n            <span>订单总价：</span>\n            <span class=\"total-price\">￥{{payment}}</span>\n        </p>\n    </div>\n</div>";

/***/ })

});