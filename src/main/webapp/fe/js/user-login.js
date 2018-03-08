webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(106);


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

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';
	__webpack_require__(96);

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(107);
	__webpack_require__(95);
	var _user   = __webpack_require__(15);
	var _mm     = __webpack_require__(8);

	// 表单里的错误提示
	var formError = {
	    show : function(errMsg){
	        $('.error-item').show().find('.err-msg').text(errMsg);
	    },
	    hide : function(){
	        $('.error-item').hide().find('.err-msg').text('');
	    }
	};

	// page 逻辑部分
	var page = {
	    init: function(){
	        this.bindEvent();
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 登录按钮的点击
	        $('#submit').click(function(){
	            _this.submit();
	        });
	        // 如果按下回车，也进行提交
	        $('.user-content').keyup(function(e){
	            // keyCode == 13 表示回车键
	            if(e.keyCode === 13){
	                _this.submit();
	            }
	        });
	    },
	    // 提交表单
	    submit : function(){
	        var formData = {
	                username : $.trim($('#username').val()),
	                password : $.trim($('#password').val())
	            },
	            // 表单验证结果
	            validateResult = this.formValidate(formData);
	        // 验证成功
	        if(validateResult.status){
	            _user.login(formData, function(res){
	                window.location.href = _mm.getUrlParam('redirect') || './index.html';
	            }, function(errMsg){
	                formError.show(errMsg);
	            });
	        }
	        // 验证失败
	        else{
	            // 错误提示
	            formError.show(validateResult.msg);
	        }

	    },
	    // 表单字段的验证
	    formValidate : function(formData){
	        var result = {
	            status  : false,
	            msg     : ''
	        };
	        if(!_mm.validate(formData.username, 'require')){
	            result.msg = '用户名不能为空';
	            return result;
	        }
	        if(!_mm.validate(formData.password, 'require')){
	            result.msg = '密码不能为空';
	            return result;
	        }
	        // 通过验证，返回正确提示
	        result.status   = true;
	        result.msg      = '验证通过';
	        return result;
	    }
	};
	$(function(){
	    page.init();
	});

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});