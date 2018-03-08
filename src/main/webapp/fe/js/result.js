webpackJsonp([11],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(92);


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(93);
	__webpack_require__(95);
	var _mm = __webpack_require__(8);
	$(function () {
	    var type        = _mm.getUrlParam('type') || 'default',
	        $element    = $('.' + type + '-success');
	    if(type === 'payment'){
	        var orderNumber = _mm.getUrlParam('orderNumber'),
	            $orderNumber = $element.find('.order-number');
	        $orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
	    }
	    if(type === 'comment-add'){
	        var productId = _mm.getUrlParam('productId'),
	            $product_Id = $element.find('.product-id');
	        $product_Id.attr('href',$product_Id.attr('href') + productId);
	    }
	    //显示对应的提示元素
	    $element.show();
	});

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';
	__webpack_require__(96);

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});