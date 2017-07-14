package com.eshop.service;

import com.eshop.common.ServerResponse;
import com.eshop.pojo.Product;
import com.eshop.vo.ProductDetailVo;

/**
 * Created by ed on 2017/7/14.
 */
public interface IProductService {
    ServerResponse saveOrUpdateProduct(Product product);
    ServerResponse<String> setSaleStatus(Integer productId, Integer status);
    ServerResponse<ProductDetailVo> manageProductDetail(Integer productId);
}
