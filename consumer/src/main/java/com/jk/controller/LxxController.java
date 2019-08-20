package com.jk.controller;


import com.alibaba.dubbo.config.annotation.Reference;


import com.jk.model.AreaBeanLxx;
import com.jk.model.Product;
import com.jk.model.RenZhengBean;
import com.jk.service.LxxService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;


@Controller
@RequestMapping("lxx")
public class LxxController {


    @Reference
    private LxxService lxxService;

    //店铺信息
    @RequestMapping("DianPu")
    public String DianPu() {
        return "lxx/DianPu";
    }

    //审核列表
    @RequestMapping("Audit")
    public String Audit() {
        return "lxx/AuditStore";
    }

    //新增店铺
    @RequestMapping("ShopMessage")
    public String dprz() {
        return "lxx/ShopMessageLxx";
    }

    //认证中转
    @RequestMapping("AuthenticationTransfer")
    public String rzzg() {
        return "lxx/AuthenticationTransferLxx";
    }

    //企业认证
    @RequestMapping("Enterprise")
    public String qyrz() {
        return "lxx/EnterpriseLxx";
    }

    //个人认证
    @RequestMapping("Individual")
    public String grrz() {
        return "lxx/IndividualLxx";
    }

    //新增//修改
    @RequestMapping("addShop")
    @ResponseBody
    public  String addShop(RenZhengBean renZhengBean){
        int i = lxxService.addShop(renZhengBean);

        return null;

    }

  //新增企业认证
  @RequestMapping("addEnterprise")
  @ResponseBody
  public  void addEnterprise(RenZhengBean renZhengBean){

      lxxService.addEnterprise(renZhengBean);

  }

    //新增个人认证
    @RequestMapping("addIndividual")
    @ResponseBody
    public  void addIndividual(RenZhengBean renZhengBean){

        lxxService.addIndividual(renZhengBean);

    }

    //三级联动
    @RequestMapping("findArea")
    @ResponseBody
    public List<AreaBeanLxx> findArea(Integer id){
        List<AreaBeanLxx> findArea = lxxService.findArea(id);
        return findArea;
    }

    //查询店铺
    @RequestMapping("queryDp")
    @ResponseBody
    public  DataGridResult queryDp(@RequestBody ParameUtil parame){
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.queryDp(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }

    //企业回显
    @RequestMapping("findById")
    @ResponseBody
    public RenZhengBean findById(Integer id){
        return lxxService.findById(id);
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

    //店铺审核列表
    @RequestMapping("QueryAudit")
    @ResponseBody
    public  DataGridResult Audit(@RequestBody ParameUtil parame){
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.Audit(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }

    //审核通过
    @RequestMapping("Pass")
    @ResponseBody
    public  void Pass(RenZhengBean renZhengBean){

        lxxService.Pass(renZhengBean);

    }

    //审核不通过
    @RequestMapping("Not")
    @ResponseBody
    public  void Not(RenZhengBean renZhengBean){

        lxxService.Not(renZhengBean);

    }



}
