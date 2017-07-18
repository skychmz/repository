package com.eshop.service;

import com.eshop.common.ServerResponse;
import com.eshop.pojo.Category;

import java.util.List;

/**
 * Created by ed on 2017/7/13.
 */
public interface ICategoryService {
    ServerResponse addCategory(String categoryName, Integer parentId);
    ServerResponse updateCategoryName(Integer categoryId, String categoryName);
    ServerResponse<List<Category>> getChildrenParallelCategory(Integer categoryId);
    ServerResponse<List<Integer>> selectCategoryAndChildrenById(Integer categoryId);
}
