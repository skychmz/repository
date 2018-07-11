package com.eshop.common;

import com.eshop.pojo.User;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by ed on 2018/7/11.
 */
public class SessionExpireFilter implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest=(HttpServletRequest) servletRequest;
        String loginToken =CookieUtil.readLoginToken(httpServletRequest);
        if(StringUtils.isNoneEmpty(loginToken)){
            String userJsonStr=RedisPoolUtil.get(loginToken);
            User user=JsonUtil.string2Obj(userJsonStr,User.class);
            if(user!=null){
                RedisPoolUtil.expire(loginToken,Const.RedisCacheExtime.REDIS_SESSION_EXTIME);
            }
        }
        filterChain.doFilter(servletRequest,servletResponse);

    }

    @Override
    public void destroy() {

    }
}
