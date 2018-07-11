package com.eshop.pojo;

import lombok.*;

import java.util.Date;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private Integer id;

    private Integer userId;

    private Integer productId;

    private String comment;

    private Date createTime;

    private Date updateTime;


}