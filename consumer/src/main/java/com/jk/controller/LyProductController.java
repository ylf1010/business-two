/**
 * Copyright (C), 2015-2019, XXX有限公司
 * FileName: LyProductController
 * Author:   ly
 * Date:     2019/8/16 20:53
 * Description: LyProductController
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Classify;
import com.jk.model.Product;
import com.jk.service.LyProductService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

/**
 * 〈一句话功能简述〉<br> 
 * 〈LyProductController〉
 *
 * @author ly
 * @create 2019/8/16
 * @since 1.0.0
 */
@Controller
@RequestMapping("lyproduct")
public class LyProductController {
    @Reference
    private LyProductService productService;

    @RequestMapping("toaddpro")
    public String toaddpro() {
        return "ly/addproduct";
    }
    @RequestMapping("toshow")
    public String toshow() {
        return "ly/product";
    }
    @RequestMapping("toadd")
    public String toadd() {
        return "ly/addpro";
    }
    //@RequestMapping("queryProduct")

    @RequestMapping("querylyProduct")
    @ResponseBody
    public DataGridResult querylyProduct(@RequestBody ParameUtil parame){
        DataGridResult spr = new DataGridResult();
        PageUtil pageUtil = productService.querylyProduct(parame);
        spr.setRows(pageUtil.getList());
        spr.setTotal(pageUtil.getSumSize());
        return spr;
    }
    //分类
    @RequestMapping("queryClassify")
    @ResponseBody
    public List<Classify> queryClassify(){
        List<Classify> clist=productService.queryClassify();
        return clist;
    }
  //下架/上架
  @RequestMapping("updateproductzt")
  @ResponseBody
  public  String  updateproductzt(int productid,int zt){
      //System.out.println(productid);
      productService.updateproductzt(productid,zt);
      return  "ly/product";

  }
    @RequestMapping("addProduct")
    @ResponseBody
    public String addProduct(Product product){
        productService.addProduct(product);
        return "123";
    }
    //上传图片
    @RequestMapping("uploadPhotoFile")
    @ResponseBody
    public String upImg(MultipartFile artImg, HttpServletRequest req) throws
            Exception{
//获取原文件名称
        String fileName = artImg.getOriginalFilename();
        String folderPath =
                req.getSession().getServletContext().getRealPath("/")+
                        "upload/";
                File file = new File(folderPath);
// 该目录是否已经存在
        if(!file.exists()){
// 创建文件夹
            file.mkdir();
        }
        String onlyFileName = UUID.randomUUID().toString()+fileName.substring(fileName.lastIndexOf('.'));
        FileOutputStream fos = new FileOutputStream(folderPath+onlyFileName);
        fos.write(artImg.getBytes());
        fos.flush();
        fos.close();
        return "/upload/"+onlyFileName;
    }

    //批量删除
    @RequestMapping("delProduct")
    @ResponseBody
    public  String delProduct(String dids){
        productService.delProduct(dids);
        return "ly/product";
    }
    //修改
    @RequestMapping("queryProductPage")
    public String queryProductPage(String productid, Model model){
        Product product=productService.queryProductPage(productid);
        model.addAttribute("product",product);
        return "ly/updpro";
    }
    //updateUser
    @RequestMapping("updateProduct")
    @ResponseBody
    public void updateProduct(Product product){
        productService.updateProduct(product);
    }


}
