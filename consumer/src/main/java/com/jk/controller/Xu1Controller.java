package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.Shopping_xu;
import com.jk.model.User_xu;
import com.jk.model.Youhiu_xu;
import com.jk.service.Xu1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
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
        User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
         if(us == null){
             return  "1";  //判断 跳登录页
         }else{
              xu1.addshopping(sho,us.getKeid());
         }


         return  "2";
    }

    //购物车查询
   @RequestMapping("listshopping")
   @ResponseBody
    public Map  listshopping(HttpServletRequest request){
       User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
       List<Shopping_xu>  list=new ArrayList<Shopping_xu>();
       if(us==null){
            return null;
       }else{
           list= xu1.listshopping(us.getKeid());
       }
       Map map=new HashMap();
       map.put("rows",list);
       return map;
   }

   //删除购物车物品
    @RequestMapping("deleteshopping")
    @ResponseBody
    public void deleteshopping(Integer id,HttpServletRequest request){
        User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
         xu1.deleteshopping(id,us.getKeid());
    }

    //结算改数量
    @RequestMapping("updatecount")
    @ResponseBody
    public Integer updatecount(Integer[] productid,Integer[] count,double[] productprice,HttpServletRequest request){
        User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
       if(us==null){
           return 2;
       }else{
           xu1.updatecount(productid,count,productprice,us.getKeid());
       }

       return  1;
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
        User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
     xu1.addshoucang(sho,us.getKeid());

    }


    //查收藏夹
    @RequestMapping("listshoucang")
    @ResponseBody
    public Map listshoucang(HttpServletRequest request){
        User_xu us= (User_xu) request.getSession().getAttribute("user_xu");
       List<Shopping_xu> list= xu1.listshoucang(us.getKeid());
        Map map=new HashMap();
        map.put("rows",list);
        return map;
    }



    //跳转优惠页面
    @RequestMapping("youhiujuan1")
    public String youhiujuan1(){
        return "xu1/youhiujuan";
    }

    //优惠劵 查询展示1
    @RequestMapping("listyouhiujuan1")
    @ResponseBody
    public Map listyouhiujuan1(){
          List<Youhiu_xu>  list=xu1.listyouhiujuan();
        Map map=new HashMap();
        map.put("rows",list);
        return map;
    }

    //优惠劵 查询展示2
    @RequestMapping("listyouhiujuan2")
    @ResponseBody
    public Map listyouhiujuan2(){
        List<Youhiu_xu>  list=xu1.listyouhiujuan2();
        Map map=new HashMap();
        map.put("rows",list);
        return map;
    }
}
