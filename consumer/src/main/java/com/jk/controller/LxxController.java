package com.jk.controller;


import com.alibaba.dubbo.config.annotation.Reference;


import com.jk.model.AreaBeanLxx;
import com.jk.model.RenZhengBean;
import com.jk.service.LxxService;
import com.jk.util.DataGridResult;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;



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

    //店铺信息
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




    /*  //新增企业认证
      @RequestMapping("addEnterprise")
      @ResponseBody
      public  String addEnterprise(RenZhengBean renZhengBean){
          int i = lxxService.addEnterprise(renZhengBean);
          return null;

      }*/
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


}
