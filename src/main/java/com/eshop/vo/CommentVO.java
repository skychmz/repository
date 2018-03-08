package com.eshop.vo;

import java.util.Date;

public class CommentVO {

    private String userName;

    private String comment;

    private String createTime;

    public CommentVO(String userName, String comment, String createTime) {
        this.userName = userName;
        this.comment = comment;
        this.createTime = createTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}