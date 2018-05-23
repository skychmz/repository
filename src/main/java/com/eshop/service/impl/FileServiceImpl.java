package com.eshop.service.impl;

import com.eshop.service.IFileService;
import com.eshop.util.FTPUtil;
import com.google.common.collect.Lists;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.UUID;


@Service("iFileService")
public class FileServiceImpl implements IFileService {


    public String upload(MultipartFile file,String path){
        String fileName=file.getOriginalFilename();
        String fileExtensionName = fileName.substring(fileName.lastIndexOf(".")+1);
        String uploadFileName= UUID.randomUUID().toString()+"."+fileExtensionName;

        File fileDir=new File(path);
        if(!fileDir.exists()){
            fileDir.setWritable(true);
            fileDir.mkdirs();
        }
        File targetFile=new File(path,uploadFileName);

        try {
            file.transferTo(targetFile);
            FTPUtil.uploadFile(Lists.newArrayList(targetFile));
            targetFile.delete();
        } catch (IOException e) {
            return null;
        }
        return targetFile.getName();
    }
}
