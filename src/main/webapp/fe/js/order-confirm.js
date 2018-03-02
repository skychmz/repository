webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);


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

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(66);
	__webpack_require__(2);
	__webpack_require__(12);
	var _mm             = __webpack_require__(8);
	var _order          = __webpack_require__(68);
	var _address        = __webpack_require__(69);
	var templateAddress = __webpack_require__(70);
	var templateProduct = __webpack_require__(71);
	var addressModal    = __webpack_require__(72);

	var page = {
	    data           : {
	        selectedAddressId: null
	    },
	    init           : function () {
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad         : function () {
	        this.loadAddressList();
	        this.loadProductList();
	    },
	    bindEvent      : function () {
	        var _this = this;
	        // 地址的选择
	        $(document).on('click', '.address-item', function () {
	            $(this).addClass('active')
	                .siblings('.address-item').removeClass('active');
	            _this.data.selectedAddressId = $(this).data('id');
	        });
	        // 订单提交
	        $(document).on('click', '.order-submit', function () {
	            var shippingId = _this.data.selectedAddressId;
	            if (shippingId) {
	                _order.createOrder({
	                    shippingId: shippingId
	                }, function (res) {
	                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
	                }, function (errMsg) {
	                    _mm.errorTips(errMsg)
	                });
	            } else {
	                _mm.errorTips('请选择地址后提交');
	            }
	        });
	        // 添加地址
	        $(document).on('click', '.address-add', function () {
	            addressModal.show({
	                isUpdate : false,
	                onSuccess: function () {
	                    _this.loadAddressList();
	                }
	            });
	        });
	        // 编辑地址
	        $(document).on('click', '.address-update', function (e) {
	            e.stopPropagation();
	            var shippingId = $(this).parents('.address-item').data('id');
	            _address.getAddress(shippingId, function (res) {
	                addressModal.show({
	                    isUpdate : true,
	                    data     : res,
	                    onSuccess: function () {
	                        _this.loadAddressList();
	                    }
	                })
	            }, function (errMsg) {
	                _mm.errorTips(errMsg);
	            });
	        });
	        // 地址的删除
	        $(document).on('click', '.address-delete', function (e) {
	            e.stopPropagation();
	            var id = $(this).parents('.address-item').data('id');
	            if (window.confirm('确认要删除该地址？')) {
	                _address.deleteAddress(id, function (res) {
	                    _this.loadAddressList();
	                }, function (errMsg) {
	                    _mm.errorTips(errMsg);
	                });
	            }
	        });
	    },
	    // 加载地址列表信息
	    loadAddressList: function () {
	        var _this = this;
	        $('.address-con').html('<div class="loading"></div>');
	        //获取地址列表
	        _address.getAddressList(function (res) {
	            _this.addressFilter(res);
	            var addressListHtml = _mm.renderHtml(templateAddress, res);
	            $('.address-con').html(addressListHtml);
	        }, function (errMsg) {
	            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新</p>');
	        });
	    },
	    // 处理地址列表中选中状态
	    addressFilter  : function (data) {
	        if (this.data.selectedAddressId) {
	            var selectedAddressIdFlag = false;
	            for (var i = 0, length = data.list.length; i < length; i++) {
	                if (data.list[i].id === this.data.selectedAddressId) {
	                    data.list[i].isActive = true;
	                    selectedAddressIdFlag = true;
	                }
	            }
	            // 如果以前选中的地址不在列表里，将其删除
	            if (!selectedAddressIdFlag) {
	                this.data.selectedAddressId = null;
	            }
	        }
	    },
	    // 加载商品清单
	    loadProductList: function () {
	        var _this = this;
	        $('.product-con').html('<div class="loading"></div>');
	        //获取地址列表
	        _order.getProductList(function (res) {
	            var productListHtml = _mm.renderHtml(templateProduct, res);
	            $('.product-con').html(productListHtml);
	        }, function (errMsg) {
	            $('.product-con').html('<p class="err-tip">商品清单加载失败，请刷新</p>');
	        });
	    }
	};
	$(function () {
	    page.init();
	});

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by weimin on 2017/7/13 0013.
	 */

	'use strict';
	var _mm = __webpack_require__(8);

	var _address   = {
	    // 获取地址列表
	    getAddressList: function (resolve, reject) {
	        _mm.request({
	            url    : _mm.getServerUrl('/shipping/list.do'),
	            data   : {
	                pageSize: 50
	            },
	            success: resolve,
	            error  : reject
	        });
	    },
	    // 新建收件人
	    save          : function (addressInfo, resolve, reject) {
	        _mm.request({
	            url    : _mm.getServerUrl('/shipping/add.do'),
	            data   : addressInfo,
	            success: resolve,
	            error  : reject
	        });
	    },
	    // 更新收件人
	    update        : function (addressInfo, resolve, reject) {
	        _mm.request({
	            url    : _mm.getServerUrl('/shipping/update.do'),
	            data   : addressInfo,
	            success: resolve,
	            error  : reject
	        });
	    },
	    // 删除收件人
	    deleteAddress : function (shippingId, resolve, reject) {
	        _mm.request({
	            url    : _mm.getServerUrl('/shipping/del.do'),
	            data   : {
	                shippingId: shippingId
	            },
	            success: resolve,
	            error  : reject
	        });
	    },
	    // 获取单条收件人信息
	    getAddress    : function (shippingId, resolve, reject) {
	        _mm.request({
	            url    : _mm.getServerUrl('/shipping/select.do'),
	            data   : {
	                shippingId: shippingId
	            },
	            success: resolve,
	            error  : reject
	        });
	    },
	};
	module.exports = _address;

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

	module.exports = "{{#list}}\r\n{{#isActive}}\r\n<div class=\"address-item active\" data-id=\"{{id}}\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<div class=\"address-item\" data-id=\"{{id}}\">\r\n{{/isActive}}\r\n    <div class=\"address-title\">\r\n        {{receiverCity}} {{receiverProvince}} （ {{receiverName}} 收 ）\r\n    </div>\r\n    <div class=\"address-detail\">\r\n        {{receiverAddress}} {{receiverPhone}}\r\n    </div>\r\n    <div class=\"address-opera\">\r\n        <span class=\"link address-update\">编辑</span>\r\n        <span class=\"link address-delete\">删除</span>\r\n    </div>\r\n</div>\r\n{{/list}}\r\n<div class=\"address-add\">\r\n    <div class=\"address-new\">\r\n        <i class=\"fa fa-plus\"></i>\r\n        <div class=\"text\">使用新地址</div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

	module.exports = "<table class=\"product-table\">\r\n    <tr>\r\n        <th class=\"cell-img\">&nbsp;</th>\r\n        <th class=\"cell-info\">商品描述</th>\r\n        <th class=\"cell-price\">价格</th>\r\n        <th class=\"cell-count\">数量</th>\r\n        <th class=\"cell-total\">小计</th>\r\n    </tr>\r\n    {{#orderItemVoList}}\r\n    <tr>\r\n        <td class=\"cell-img\">\r\n            <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\">\r\n                <img class=\"p-img\"\r\n                     src=\"{{imageHost}}{{productImage}}\"\r\n                     alt=\"{{productName}}\"/>\r\n            </a>\r\n        </td>\r\n        <td class=\"cell-info\">\r\n            <a href=\"./detail.html?productId={{productId}}\" class=\"link\">{{productName}}</a>\r\n        </td>\r\n        <td class=\"cell-price\">￥{{currentUnitPrice}}</td>\r\n        <td class=\"cell-count\">{{quantity}}</td>\r\n        <td class=\"cell-total\">￥{{totalPrice}}</td>\r\n    </tr>\r\n    {{/orderItemVoList}}\r\n</table>\r\n<div class=\"submit-con\">\r\n    <span>订单总价:</span>\r\n    <span class=\"submit-total\">￥{{productTotalPrice}}</span>\r\n    <span class=\"btn order-submit\">提交订单</span>\r\n</div>";

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by weimin on 2017/7/13 0013.
	 */

	'use strict';
	var _mm                  = __webpack_require__(8);
	var _cities              = __webpack_require__(73);
	var _address             = __webpack_require__(69);
	var templateAddressModal = __webpack_require__(74);

	var addressModal = {
	    show           : function (option) {
	        // option 绑定
	        this.option      = option;
	        this.option.data = option.data || {};
	        this.$modalWrap  = $('.modal-wrap');
	        //渲染页面
	        this.loadModal();
	        //绑定事件
	        this.bindEvent();
	    },
	    bindEvent      : function () {
	        var _this = this;
	        //城市和省份的二级联动
	        this.$modalWrap.find('#receiver-province').change(function () {
	            var selectedProvince = $(this).val();
	            _this.loadCities(selectedProvince);
	        });
	        //提交收货地址
	        this.$modalWrap.find('.address-btn').click(function () {
	            var receiverInfo = _this.getReceiverInfo(),
	                isUpdate     = _this.option.isUpdate;
	            // 使用新地址且验证通过
	            if (!isUpdate && receiverInfo.status) {
	                _address.save(receiverInfo.data, function (res) {
	                    _mm.successTips('地址添加成功');
	                    _this.hide();
	                    typeof _this.option.onSuccess === 'function'
	                    && _this.option.onSuccess(res);
	                }, function (errMsg) {
	                    _mm.errorTips(errMsg);
	                });
	            } else if (isUpdate && receiverInfo.status) {
	                //更新收件人，并且验证通过
	                _address.update(receiverInfo.data, function (res) {
	                    _mm.successTips('地址修改成功');
	                    _this.hide();
	                    typeof _this.option.onSuccess === 'function'
	                    && _this.option.onSuccess(res);
	                }, function (errMsg) {
	                    _mm.errorTips(errMsg);
	                });
	            } else {
	                //验证不通过
	                _mm.errorTips(receiverInfo.errMsg || '验证不通过了~')
	            }
	        });
	        //保证点击modal内容区域时不关闭弹窗
	        this.$modalWrap.find('.modal-container').click(function (e) {
	            e.stopPropagation();
	        });
	        //点击x或者蒙版区域，关闭modal弹窗
	        this.$modalWrap.find('.close').click(function () {
	            _this.hide();
	        });
	    },
	    loadModal      : function () {
	        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
	            isUpdate: this.option.isUpdate,
	            data    : this.option.data
	        });
	        this.$modalWrap.html(addressModalHtml);
	        // 加载省份
	        this.loadProvince();
	    },
	    //加载省份信息
	    loadProvince   : function () {
	        var provinces       = _cities.getProvinces() || [],
	            $provinceSelect = this.$modalWrap.find('#receiver-province');
	        $provinceSelect.html(this.getSelectOption(provinces));
	        // 如果是更新地址，并且有省份信息，做省份的回填
	        if (this.option.isUpdate && this.option.data.receiverProvince) {
	            $provinceSelect.val(this.option.data.receiverProvince);
	            this.loadCities(this.option.data.receiverProvince);
	        }
	    },
	    //加载城市信息
	    loadCities     : function (provinceName) {
	        var cities      = _cities.getCities(provinceName) || [],
	            $citySelect = this.$modalWrap.find('#receiver-city');
	        $citySelect.html(this.getSelectOption(cities));
	        // 如果是更新地址，并且有城市信息，做城市的回填
	        if (this.option.isUpdate && this.option.data.receiverCity) {
	            $citySelect.val(this.option.data.receiverCity);
	        }
	    },
	    //获取表单收件人信息的方式，并作表单验证
	    getReceiverInfo: function () {
	        var receiverInfo              = {},
	            result                    = {
	                status: false
	            };
	        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());
	        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
	        receiverInfo.receiverCity     = this.$modalWrap.find('#receiver-city').val();
	        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
	        receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
	        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());

	        if (this.option.isUpdate) {
	            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
	        }
	        //表单字段验证
	        if (!receiverInfo.receiverName) {
	            result.errMsg = '请输入收件人姓名';
	        } else if (!receiverInfo.receiverProvince) {
	            result.errMsg = '请选择收件人所在省份';
	        } else if (!receiverInfo.receiverCity) {
	            result.errMsg = '请选择收件人所在城市';
	        } else if (!receiverInfo.receiverAddress) {
	            result.errMsg = '请输入收件人详细地址';
	        } else if (!receiverInfo.receiverPhone) {
	            result.errMsg = '请输入收件人手机号';
	        } else {
	            //验证均通过
	            result.status = true;
	            result.data   = receiverInfo;
	        }
	        return result;
	    },
	    //获取select框的选项，输入是一个数组：array，输出html
	    getSelectOption: function (optionArray) {
	        var html = '<option value="">请选择</option>';
	        for (var i = 0, length = optionArray.length; i < length; i++) {
	            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
	        }
	        return html;
	    },

	    //关闭弹窗
	    hide: function () {
	        this.$modalWrap.empty();
	    }
	};
	module.exports   = addressModal;

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

	/*
	* @Author: Rosen
	* @Date:   2017-06-08 08:45:41
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-06-08 08:51:07
	*/

	'use strict';

	var _cities = {
	    cityInfo : {
	        '北京':['北京'],
	        '上海':['上海'],
	        '天津':['天津'],
	        '重庆':['重庆'],
	        '河北省':['石家庄','张家口','承德','秦皇岛','唐山','廊坊','保定','沧州','衡水','邢台','邯郸'],
	        '山西省':['太原','大同','朔州','阳泉','长治','晋城','忻州','吕梁','晋中','临汾','运城'],
	        '辽宁省':['沈阳','朝阳','阜新','铁岭','抚顺','本溪','辽阳','鞍山','丹东','大连','营口','盘锦','锦州','葫芦岛'],
	        '吉林省':['长春','白城','松原','吉林','四平','辽源','通化','白山','延边'],
	        '黑龙江省':['哈尔滨','齐齐哈尔','黑河','大庆','伊春','鹤岗','佳木斯','双鸭山','七台河','鸡西','牡丹江','绥化','大兴安'],
	        '江苏省':['南京','徐州','连云港','宿迁','淮阴','盐城','扬州','泰州','南通','镇江','常州','无锡','苏州'],
	        '浙江省':['杭州','湖州','嘉兴','舟山','宁波','绍兴','金华','台州','温州','丽水'],
	        '安徽省':['合肥','宿州','淮北','阜阳','蚌埠','淮南','滁州','马鞍山','芜湖','铜陵','安庆','黄山','六安','巢湖','池州','宣城'],
	        '福建省':['福州','南平','三明','莆田','泉州','厦门','漳州','龙岩','宁德'],
	        '江西省':['南昌','九江','景德镇','鹰潭','新余','萍乡','赣州','上饶','抚州','宜春','吉安'],
	        '山东省':['济南','聊城','德州','东营','淄博','潍坊','烟台','威海','青岛','日照','临沂','枣庄','济宁','泰安','莱芜','滨州','菏泽'],
	        '河南省':['郑州','三门峡','洛阳','焦作','新乡','鹤壁','安阳','濮阳','开封','商丘','许昌','漯河','平顶山','南阳','信阳','周口','驻马店'],
	        '湖北省':['武汉','十堰','襄攀','荆门','孝感','黄冈','鄂州','黄石','咸宁','荆州','宜昌','恩施','襄樊'],
	        '湖南省':['长沙','张家界','常德','益阳','岳阳','株洲','湘潭','衡阳','郴州','永州','邵阳','怀化','娄底','湘西'],
	        '广东省':['广州','清远','韶关','河源','梅州','潮州','汕头','揭阳','汕尾','惠州','东莞','深圳','珠海','江门','佛山','肇庆','云浮','阳江','茂名','湛江'],
	        '海南省':['海口','三亚'],
	        '四川省':['成都','广元','绵阳','德阳','南充','广安','遂宁','内江','乐山','自贡','泸州','宜宾','攀枝花','巴中','达川','资阳','眉山','雅安','阿坝','甘孜','凉山'],
	        '贵州省':['贵阳','六盘水','遵义','毕节','铜仁','安顺','黔东南','黔南','黔西南'],
	        '云南省':['昆明','曲靖','玉溪','丽江','昭通','思茅','临沧','保山','德宏','怒江','迪庆','大理','楚雄','红河','文山','西双版纳'],
	        '陕西省':['西安','延安','铜川','渭南','咸阳','宝鸡','汉中','榆林','商洛','安康'],
	        '甘肃省':['兰州','嘉峪关','金昌','白银','天水','酒泉','张掖','武威','庆阳','平凉','定西','陇南','临夏','甘南'],
	        '青海省':['西宁','海东','西宁','海北','海南','黄南','果洛','玉树','海西'],
	        '内蒙古':['呼和浩特','包头','乌海','赤峰','呼伦贝尔盟','兴安盟','哲里木盟','锡林郭勒盟','乌兰察布盟','鄂尔多斯','巴彦淖尔盟','阿拉善盟'],
	        '广西':['南宁','桂林','柳州','梧州','贵港','玉林','钦州','北海','防城港','南宁','百色','河池','柳州','贺州'],
	        '西藏':['拉萨','那曲','昌都','林芝','山南','日喀则','阿里'],
	        '宁夏':['银川','石嘴山','吴忠','固原'],
	        '新疆':['乌鲁木齐','克拉玛依','喀什','阿克苏','和田','吐鲁番','哈密','博尔塔拉','昌吉','巴音郭楞','伊犁','塔城','阿勒泰'],
	        '香港':['香港'],
	        '澳门':['澳门'],
	        '台湾':['台北','台南','其他']
	    },
	    // 获取所有的省份
	    getProvinces : function(){
	        var provinces = [];
	        for(var item in this.cityInfo){
	            provinces.push(item);
	        }
	        return provinces;
	    },
	    // 获取某省份的所有城市
	    getCities : function(provinceName){
	        return this.cityInfo[provinceName] || [];
	    }
	};

	module.exports = _cities;

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

	module.exports = "<div class=\"modal close\">\n    <div class=\"modal-container\">\n        <div class=\"modal-header\">\n            {{#isUpdate}}\n            <h1 class=\"modal-title\">更新地址</h1>\n            {{/isUpdate}}\n            {{^isUpdate}}\n            <h1 class=\"modal-title\">使用新地址</h1>\n            {{/isUpdate}}\n            <i class=\"fa fa-close close\"></i>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"form\">\n                <div class=\"form-line\">\n                    <label class=\"label\" for=\"receiver-name\">\n                        <span class=\"required\">*</span>收件人姓名\n                    </label>\n                    <input type=\"text\" class=\"form-item\" id=\"receiver-name\"\n                           placeholder=\"请输入收件人姓名\" value=\"{{data.receiverName}}\"/>\n                </div>\n                <div class=\"form-line\">\n                    <label class=\"label\" for=\"receiver-province\">\n                        <span class=\"required\">*</span>所在城市\n                    </label>\n                    <select id=\"receiver-province\" class=\"form-item\">\n                        <option value=\"\">请选择</option>\n                    </select>\n                    <select id=\"receiver-city\" class=\"form-item\">\n                        <option value=\"\">请选择</option>\n                    </select>\n                </div>\n                <div class=\"form-line\">\n                    <label class=\"label\" for=\"receiver-address\">\n                        <span class=\"required\">*</span>详细地址\n                    </label>\n                    <input type=\"text\" class=\"form-item\" id=\"receiver-address\"\n                           placeholder=\"请精确到门牌号\" value=\"{{data.receiverAddress}}\"/>\n                </div>\n                <div class=\"form-line\">\n                    <label class=\"label\" for=\"receiver-phone\">\n                        <span class=\"required\">*</span>收件人手机\n                    </label>\n                    <input type=\"text\" class=\"form-item\" id=\"receiver-phone\"\n                           placeholder=\"请输入11位手机号\" value=\"{{data.receiverPhone}}\"/>\n                </div>\n                <div class=\"form-line\">\n                    <label class=\"label\" for=\"receiver-zip\">邮政编码</label>\n                    <input type=\"text\" class=\"form-item\" id=\"receiver-zip\"\n                           placeholder=\"如：100000\" value=\"{{data.receiverZip}}\"/>\n                </div>\n                <div class=\"form-line\">\n                    <input type=\"hidden\" id=\"receiver-id\" value=\"{{data.id}}\" />\n                    <a class=\"btn address-btn\">保存</a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ })

});