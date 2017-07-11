package com.eshop.controller.portal;

import com.eshop.common.Const;
import com.eshop.common.ResponseCode;
import com.eshop.common.ServiceResponse;
import com.eshop.pojo.User;
import com.eshop.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * Created by ed on 2017/7/9.
 */
@Controller
@RequestMapping("/user/")
public class UserController {
    @Autowired
    private IUserService iUserService;
    @RequestMapping(value = "login.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<User> login(String username, String password, HttpSession session){//登录
        ServiceResponse<User> response=iUserService.login(username,password);
        if (response.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }
        return response;
    }

    @RequestMapping(value = "logout.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<String> logout(HttpSession session){
        session.removeAttribute(Const.CURRENT_USER);
        return ServiceResponse.createBySuccess();
    }

    @RequestMapping(value = "register.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<String> register(User user){
        return iUserService.register(user);
    }

    @RequestMapping(value = "check_valid.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<String> checkValid(String str,String type){
        return iUserService.checkValid(str, type);
    }

    @RequestMapping(value = "get_user_info.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<User> getUserInfo(HttpSession session){
        User user=(User)session.getAttribute(Const.CURRENT_USER);
        if(user!=null){
            return ServiceResponse.createBySuccess(user);
        }
        return ServiceResponse.createByErrorMessage("用户未登录，无法获取当前用户的信息");
    }

    @RequestMapping(value = "forget_qet_question.do",method= RequestMethod.POST)
    @ResponseBody
    public  ServiceResponse<String> forgetGetQuestion(String username){

        return iUserService.selectQuestion(username);

    }

    @RequestMapping(value = "forget_check_answer.do",method= RequestMethod.POST)
    @ResponseBody
    public  ServiceResponse<String> forgetCheckAnswer(String username,String question,String answer){
        return iUserService.checkAnswer(username, question, answer);
    }
    @RequestMapping(value = "forget_reset_password.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<String> forgetResetPassword(String username,String passwordNew,String forgetToken){
        return iUserService.forgetResetPassword(username, passwordNew, forgetToken);
    }

    @RequestMapping(value = "reset_password.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<String> resetPassword(HttpSession session,String passwordOld,String passwordNew){
        User user= (User) session.getAttribute(Const.CURRENT_USER);
        if(user==null){
            return  ServiceResponse.createByErrorMessage("用户未登录");
        }
        return iUserService.resetPassword(user,passwordOld,passwordNew);
    }

    @RequestMapping(value = "update_information.do",method= RequestMethod.POST)
    @ResponseBody
    public  ServiceResponse<User> updateInformation(HttpSession session,User user){
        User currentUser= (User) session.getAttribute(Const.CURRENT_USER);
        if(currentUser==null){
            return  ServiceResponse.createByErrorMessage("用户未登录");
        }
        user.setId(currentUser.getId());
        user.setUsername(user.getUsername());
        ServiceResponse<User> response=iUserService.updateInformation(user);
        if(response.isSuccess()){
            response.getData().setUsername(currentUser.getUsername());
            session.setAttribute(Const.CURRENT_USER,user);
        }
        return response;
    }

    @RequestMapping(value = "get_information.do",method= RequestMethod.POST)
    @ResponseBody
    public ServiceResponse<User> getInformation(HttpSession session){
        User currentUser= (User) session.getAttribute(Const.CURRENT_USER);
        if(currentUser==null){
            return  ServiceResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，需强制登录status=10");
        }
        return iUserService.getInformation(currentUser.getId());
    }
}
