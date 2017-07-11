package com.eshop.common;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;


/**
 * Created by ed on 2017/7/9.
 */
public class TokenCache {
        public static final String TOKEN_PREFIX="token_";
        private static Logger logger= LoggerFactory.getLogger(TokenCache.class);

        private static LoadingCache<String,String> localCache= CacheBuilder.newBuilder()
                .initialCapacity(1000).maximumSize(10000).expireAfterAccess(12, TimeUnit.HOURS)
                .build(new CacheLoader<String, String>() {//key没有命中，调用此方法加载
                    @Override
                    public String load(String s) throws Exception {
                        return "null";
                    }
                });

        public static void setKey(String key,String value){
            localCache.put(key,value);
        }
        public static String getKey(String key){
            String value=null;
            try {
                value=localCache.get(key);
                if("null".equals(value)){
                    return null;
                }
            }catch (Exception e){
                logger.error("localCache get error",e);
            }
            return value;
        }
}
