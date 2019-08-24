package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Shopping_xu;
import com.jk.model.User_xu;
import com.jk.service.Xu1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("xu1")
public class Xu1Controller {
            //客户前端
     @Reference
    private Xu1Service xu1;


    //跳购物车
     @RequestMapping("shopping1")
    public  String  shopping1(){
         return  "xu1/shopping";
     }

     //加入购物车
    @RequestMapping("addshopping")
    @ResponseBody
    public  String  addshopping(Shopping_xu sho, HttpServletRequest request){
      /*  User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
         if(us == null){
             return  "1";  //判断 跳登录页
         }else{
              xu1.addshopping(sho,us.getKeid());
         }
     */

        sho.setProductid(1);
        sho.setProducount(1);  //数量默认1
        sho.setProductphoto("123.jpg");
        sho.setProductname("二锅头");
        sho.setProductprice(150.00);
        sho.setWinejhl(500);
        sho.setWinedushu(36);
         xu1.addshopping(sho,1);

         return  "2";
    }

    //购物车查询
   @RequestMapping("listshopping")
   @ResponseBody
    public Map  listshopping(HttpServletRequest request){
       //User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
      // List<Shopping_xu>  list= xu1.listshopping(us.getKeid());
       List<Shopping_xu>  list= xu1.listshopping(1);
       Map map=new HashMap();
       map.put("rows",list);
       return map;
   }

   //删除购物车物品
    @RequestMapping("deleteshopping")
    @ResponseBody
    public void deleteshopping(Integer id,HttpServletRequest request){
        //User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
        // List<Shopping_xu>  list= xu1.deleteshopping(id,us.getKeid());
         xu1.deleteshopping(id,1);
    }

    //结算改数量
    @RequestMapping("updatecount")
    @ResponseBody
    public Integer updatecount(Integer[] productid,Integer[] count,HttpServletRequest request){
        //User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
        //  xu1.updatecount(productid,count,us.getKeid());
       Integer a= xu1.updatecount(productid,count,1);

       return  a;
    }

    //跳收藏
    @RequestMapping("shoucang1")
    public  String  shoucang1(){
         return  "xu1/shoucang";
    }


//移入收藏
    @RequestMapping("addshoucang")
    @ResponseBody
    public void addshoucang(Shopping_xu sho,HttpServletRequest request){
        //User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
        // List<Shopping_xu>  list= xu1.listshopping(sho,us.getKeid());
     xu1.addshoucang(sho,1);

    }

    //查收藏夹
    @RequestMapping("listshoucang")
    @ResponseBody
    public Map listshoucang(){
        //User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
        // List<Shopping_xu>  list= xu1.listshopping(us.getKeid());
       List<Shopping_xu> list= xu1.listshoucang(1);
        Map map=new HashMap();
        map.put("rows",list);
        return map;
    }

}
