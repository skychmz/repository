package com.eshop.service;

import com.eshop.common.ServiceResponse;
import com.eshop.pojo.User;

/**
 * Created by ed on 2017/7/9.
 */
public interface IUserService {
    ServiceResponse<User> login(String username, String password);
    ServiceResponse<String> register(User user);
    ServiceResponse<String> checkValid(String str,String type);
    ServiceResponse<String> selectQuestion(String username);
    ServiceResponse<String> checkAnswer(String username,String question,String answer);
    ServiceResponse<String> forgetResetPassword(String username,String passwordNew,String forgetToken);
    ServiceResponse<String> resetPassword(User user,String passwordOld,String passwordNew);
    ServiceResponse<User> updateInformation(User user);
    ServiceResponse<User> getInformation(Integer userId);
}
