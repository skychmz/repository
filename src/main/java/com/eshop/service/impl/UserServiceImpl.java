package com.eshop.service.impl;

import com.eshop.common.Const;
import com.eshop.common.ServiceResponse;
import com.eshop.common.TokenCache;
import com.eshop.dao.UserMapper;
import com.eshop.pojo.User;
import com.eshop.service.IUserService;
import com.eshop.util.MD5Util;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;
import java.util.UUID;

/**
 * Created by ed on 2017/7/9.
 */
@Service("iUserService")
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public ServiceResponse<User> login(String username, String password) {
        int resultCount=userMapper.checkUsername(username);
        if(resultCount==0){
            return ServiceResponse.createByErrorMessage("用户名不存在");
        }
        String md5Password=MD5Util.MD5EncodeUtf8(password);
        User user=userMapper.selectLogin(username,md5Password);
        if(user==null){
            return ServiceResponse.createByErrorMessage("密码错误");
        }
        user.setPassword(StringUtils.EMPTY);
        return ServiceResponse.createBySuccess("登录成功",user);
    }

    public ServiceResponse<String> register(User user){
        ServiceResponse validResponse=this.checkValid(user.getUsername(),Const.USERNAME);
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        validResponse=this.checkValid(user.getEmail(),Const.EMAIL);
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        //设置用户角色
        user.setRole(Const.Role.ROLE_CUSTOMER);
        //md5加密
        user.setPassword(MD5Util.MD5EncodeUtf8(user.getPassword()));
        int resultCount=userMapper.insert(user);
        if(resultCount==0){
            return ServiceResponse.createByErrorMessage("注册失败");
        }
        return ServiceResponse.createBySuccessMessage("注册成功");
    }

    public ServiceResponse<String> checkValid(String str,String type){
        if(StringUtils.isNoneBlank(type)){
            if(Const.USERNAME.equals(type)){
                int resultCount=userMapper.checkUsername(str);
                if(resultCount>0){
                    return ServiceResponse.createByErrorMessage("用户名已存在");
                }
            }
            if(Const.EMAIL.equals(type)){
               int resultCount=userMapper.checkEmaill(str);
                if(resultCount>0){
                    return ServiceResponse.createByErrorMessage("email已存在");
                }
            }
        }else {
            return ServiceResponse.createBySuccessMessage("参数错误");
        }
            return ServiceResponse.createBySuccessMessage("校验成功");
    }
    public  ServiceResponse<String> selectQuestion(String username){
        ServiceResponse validResponse=this.checkValid(username,Const.USERNAME);
        if(validResponse.isSuccess()){
            return ServiceResponse.createByErrorMessage("用户不存在");
        }
        String question = userMapper.selectQuestionByUsername(username);
        if(StringUtils.isNoneBlank(question)){
            return ServiceResponse.createBySuccess(question);
        }
        return ServiceResponse.createByErrorMessage("找回密码的问题是空的");
    }

    public ServiceResponse<String> checkAnswer(String username,String question,String answer){
        int resultCount=userMapper.checkAnswer(username, question, answer);
        if(resultCount>0){
            String forgetToken= UUID.randomUUID().toString();
            TokenCache.setKey(TokenCache.TOKEN_PREFIX+username,forgetToken);
            return ServiceResponse.createBySuccess(forgetToken);
        }
        return ServiceResponse.createByErrorMessage("问题的答案错误");
    }

    public ServiceResponse<String> forgetResetPassword(String username,String passwordNew,String forgetToken){
        if(StringUtils.isBlank(forgetToken)){
            return ServiceResponse.createByErrorMessage("参数错误，token需要传递");
        }
        ServiceResponse validResponse=this.checkValid(username,Const.USERNAME);
        if(validResponse.isSuccess()){
            return ServiceResponse.createByErrorMessage("用户不存在");
        }
        String token = TokenCache.getKey(TokenCache.TOKEN_PREFIX+username);
        if(StringUtils.isBlank(forgetToken)){
            return ServiceResponse.createByErrorMessage("token无效或者过期");
        }
        if(StringUtils.equals(forgetToken,token)){
            String md5Password=MD5Util.MD5EncodeUtf8(passwordNew);
            int rowCount=userMapper.updatePasswordByUsername(username,md5Password);
            if(rowCount>0){
                return ServiceResponse.createBySuccessMessage("修改密码成功");
            }
        }else{
            return ServiceResponse.createByErrorMessage("token错误，请重新获取重置密码的token");
        }
        return ServiceResponse.createByErrorMessage("修改密码失败");
    }

    public ServiceResponse<String> resetPassword(User user,String passwordOld,String passwordNew){
        int resultCount=userMapper.checkPassword(MD5Util.MD5EncodeUtf8(passwordOld),user.getId());
        if(resultCount==0){
            return ServiceResponse.createByErrorMessage("旧密码错误");
        }
        user.setPassword(MD5Util.MD5EncodeUtf8(passwordNew));
        int updateCount=userMapper.updateByPrimaryKeySelective(user);
        if(updateCount>0){
            return ServiceResponse.createBySuccessMessage("密码更新成功");
        }
        return ServiceResponse.createByErrorMessage("密码更新失败");
    }

    public  ServiceResponse<User> updateInformation(User user){
        int resultCount=userMapper.checkEmailByUserId(user.getEmail(),user.getId());
        if(resultCount>0){
            return ServiceResponse.createByErrorMessage("email已存在，请更换email");
        }
        User updateUser=new User();
        updateUser.setId(user.getId());
        updateUser.setEmail(user.getEmail());
        updateUser.setPhone(user.getPhone());
        updateUser.setQuestion(user.getQuestion());
        updateUser.setAnswer(user.getAnswer());
        int updateCount=userMapper.updateByPrimaryKeySelective(updateUser);
        if(updateCount>0){
            return ServiceResponse.createBySuccess("更新个人信息成功",updateUser);
        }
        return ServiceResponse.createByErrorMessage("更新个人信息失败");
    }

    public ServiceResponse<User> getInformation(Integer userId){
        User user=userMapper.selectByPrimaryKey(userId);
        if(user==null){
            return ServiceResponse.createByErrorMessage("找不到当前用户");
        }
        user.setPassword(StringUtils.EMPTY);
        return ServiceResponse.createBySuccess(user);
    }
}
