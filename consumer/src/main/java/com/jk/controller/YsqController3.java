package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.*;
import com.jk.service.AddressService;
import com.jk.util.DataGridResult;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("ysqthree")
public class YsqController3 {
    @Reference
    private AddressService addressService;
    @Autowired
    private AmqpTemplate amqpTemplate;

    @RequestMapping("tiao")
    public ModelAndView tiao(Product product){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("cha4");
        modelAndView.addObject("ordernumber",product);
        return modelAndView;
    }
    /*@RequestMapping("tiao2")
    public ModelAndView tiao2(Product product){

       // List<Product> products = addressService.addJiaoYi(product.getProductid());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("ordernumber",product);
        modelAndView.setViewName("cha4");
        return modelAndView;
    }*/
    @RequestMapping("addjiaoyi")
    @ResponseBody
    public DataGridResult addJiaoYi(Integer productid){
        List<Product> list = addressService.addJiaoYi(productid);
        DataGridResult result = new DataGridResult();
        result.setRows(list);
        return result;
    }
@RequestMapping("chaaddress")
    @ResponseBody
    public DataGridResult chaAddress(HttpServletRequest request){
    //User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
    List<Addressysq> row = addressService.chaAddress(1);
    DataGridResult result = new DataGridResult();
    result.setRows(row);
    return result;
}
@RequestMapping("updatejiaoyistate")
    @ResponseBody
    public void updateJiaoYiState(Integer ordernumber){

        addressService.updateJiaoYiState(ordernumber);
}
@RequestMapping("chajiaoyi")
    @ResponseBody
    public DataGridResult chaJiaoYi(Long ordernumber){
        List<YsqJiaoYi> row = addressService.chaJiaoYi(ordernumber);
    DataGridResult result = new DataGridResult();
    result.setRows(row);
    return result;
}
@RequestMapping("addressdizhi")
    @ResponseBody
    public void addressDiZhi(Addressysq addressysq){

        addressService.addressDiZhi(addressysq);
}
@RequestMapping("deleteaddress")
    @ResponseBody
    public void deleteAddress(Integer id){

        addressService.deleteAddress(id);
}
@RequestMapping("adddingdan")
    @ResponseBody
    public String addDingDan(Shopping_xu shopping,HttpServletRequest request){
    User_xu user = (User_xu)request.getSession().getAttribute("user");
    String s = addressService.addDingDan(shopping, 2);
    return s;
}
@RequestMapping("chashopping")
    @ResponseBody
    public DataGridResult chaShopping(int[] productid,HttpServletRequest request){
        User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
        List<Shopping_xu> list = addressService.chaShopping(productid,2);
        /*for (int i=0;i<list.size();i++){
            list.get(i).setProductkucun(3);
        }*/
    DataGridResult result = new DataGridResult();
    result.setRows(list);
    return result;
}
@RequestMapping("tiao3")
    public ModelAndView tiao3(String ids){
    System.out.println(new Date());
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("ids",ids);
    modelAndView.setViewName("cha5");
    return modelAndView;
}
@RequestMapping("adddingdanall")
    @ResponseBody
    public String addDingDanAll(int[] id, String count,HttpServletRequest request){
        User_xu user = (User_xu) request.getSession().getAttribute("user");
    String s = addressService.addDingDanAll(id, count, 2);
    return s;
}
@RequestMapping("tiao4")
    @ResponseBody
    public void tiao4(){
        amqpTemplate.convertAndSend("test","第一次");
}
@RequestMapping("adddingdan1")
    public ModelAndView addDingDan1(HttpServletRequest request){
    ModelAndView view = new ModelAndView();
    view.setViewName("cha5");
    User_xu user = (User_xu) request.getSession().getAttribute("user_xu");
    addressService.addDingDan1(2);
    return view;
}
}
