webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(87);


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

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(88);
	__webpack_require__(12);
	__webpack_require__(2);
	var _mm           = __webpack_require__(8);
	var _payment      = __webpack_require__(90);
	var templateIndex = __webpack_require__(91);

	var page = {
	    data      : {
	        orderNumber: _mm.getUrlParam('orderNumber')
	    },
	    init      : function () {
	        this.onLoad();
	    },
	    onLoad    : function () {
	        this.loadPaymentInfo();
	    },
	    // 加载订单 数据
	    loadPaymentInfo: function () {
	        var _this           = this,
	            paymentHtml = '',
	            $pageWrap        = $('.page-wrap');
	        $pageWrap.html('<div class="loading"></div>');
	        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
	            //渲染html
	            paymentHtml = _mm.renderHtml(templateIndex, res);
	            $pageWrap.html(paymentHtml);
	            //监听订单状态
	            _this.listenOrderStatus();
	        }, function (errMsg) {
	            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
	        });
	    },
	    listenOrderStatus:function () {
	        var _this = this;
	        this.paymentTimer = window.setInterval(function () {
	            _payment.getPaymentStatus(_this.data.orderNumber,function (res) {
	                if(res == true){
	                    window.location.href
	                        = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
	                }
	            },function (errMsg) {

	            })
	        })
	    }
	};
	$(function () {
	    page.init();
	});

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var _mm = __webpack_require__(8);

	var _payment = {
	    // 获取支付信息
	    getPaymentInfo : function(orderNumber, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/pay.do'),
	            data    : {
	                orderNo : orderNumber
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取订单状态
	    getPaymentStatus : function(orderNumber, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
	            data    : {
	                orderNo : orderNumber
	            },
	            success : resolve,
	            error   : reject
	        });
	    }
	};
	module.exports = _payment;

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

	module.exports = "<p class=\"payment-tips\">订单提交成功，请尽快支付！订单号：{{orderNo}}</p>\n<p class=\"payment-tips enhance\">请使用支付宝APP扫描下方二维码进行支付</p>\n<div class=\"img-con\">\n    <img src=\"{{qrUrl}}\" alt=\"支付二维码\" class=\"qr-code\"/>\n</div>";

/***/ })

});