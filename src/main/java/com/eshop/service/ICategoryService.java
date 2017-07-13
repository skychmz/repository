package com.eshop.service;

import com.eshop.common.ServiceResponse;
import com.eshop.pojo.Category;

import java.util.List;

/**
 * Created by ed on 2017/7/13.
 */
public interface ICategoryService {
    ServiceResponse addCategory(String categoryName, Integer parentId);
    ServiceResponse updateCategoryName(Integer categoryId,String categoryName);
    ServiceResponse<List<Category>> getChildrenParallelCategory(Integer categoryId);
    ServiceResponse selectCategoryAndChildrenById(Integer categoryId);
}
