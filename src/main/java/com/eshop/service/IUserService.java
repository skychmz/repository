package com.eshop.service;

import com.eshop.common.ServerResponse;
import com.eshop.pojo.User;

/**
 * Created by ed on 2017/7/9.
 */
public interface IUserService {
    ServerResponse<User> login(String username, String password);
    ServerResponse<String> register(User user);
    ServerResponse<String> checkValid(String str, String type);
    ServerResponse<String> selectQuestion(String username);
    ServerResponse<String> checkAnswer(String username, String question, String answer);
    ServerResponse<String> forgetResetPassword(String username, String passwordNew, String forgetToken);
    ServerResponse<String> resetPassword(User user, String passwordOld, String passwordNew);
    ServerResponse<User> updateInformation(User user);
    ServerResponse<User> getInformation(Integer userId);
    public ServerResponse checkAdminRole(User user);

}
