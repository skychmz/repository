package com.eshop.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by ed on 2017/7/16.
 */
public interface IFileService {
    String upload(MultipartFile file, String path);
}
