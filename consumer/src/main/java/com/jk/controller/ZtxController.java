package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.*;
import com.jk.service.ZtxService;
import com.jk.util.ParameUtil;
import com.jk.util.TreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("ztx")
public class ZtxController {

    @Reference
    private ZtxService zs;

    @RequestMapping("tomain")
    public String tomain(){
        return "ztx/main";
    }

    @RequestMapping("toshowrole")
    public String toshowrole(){
        return "ztx/showrole";
    }
    @RequestMapping("toaddrole")
    public String toaddrole(){
        return "ztx/addrole";
    }
    @RequestMapping("toshowuser")
    public String toshowuser(){
        return "ztx/showuser";
    }
    @RequestMapping("toadduser")
    public String toadduser(){
        return "ztx/adduser";
    }
    @RequestMapping("todsh")
    public String todsh(){
        return "ztx/showpro";
    }
    @RequestMapping("toytg")
    public String toytg(){
        return "ztx/showytg";
    }
    //注销
    @RequestMapping("zx")
    public String zx(HttpServletRequest request){
        request.removeAttribute("user");
        return "loginUser";
    }
    //查询角色
    @RequestMapping("querytype")
    @ResponseBody
    public List<ZtxRole> querytype(){
        List<ZtxRole> list = zs.querytype();
        return list;
    }
    //五表查权限
    @RequestMapping("querytree")
    @ResponseBody
    public List<ZtxTree> querytree(HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        List<ZtxTree> list = zs.querytree(1);
        list = TreeUtil.getFatherNode(list);
        return list;
    }

    //查角色
    @RequestMapping("queryrole")
    @ResponseBody
    public   Map  queryrole(@RequestBody ParameUtil param ){
        List list=zs.queryrole(param);
        Long l=zs.queryrolecount(param);
        Map map=new HashMap();
        map.put("rows", list);
        map.put("total", l);
        return map;
    }
    //查用户
    @RequestMapping("queryuser")
    @ResponseBody
    public   Map  queryuser(@RequestBody ParameUtil param ){
        List list=zs.queryuser(param);
        Long l=zs.queryusercount(param);
        Map map=new HashMap();
        map.put("rows", list);
        map.put("total", l);
        return map;
    }
    //根据 角色id查询对应权限
    @RequestMapping("edittree")
    @ResponseBody
    public  List<ZtxTree>  edittree(Integer roleid){
        List<ZtxTree> list = zs.edittree(roleid);
        list = TreeUtil.getFatherNode(list);
        return list;
    }
    //根据 角色id跳转到回显页面
    @RequestMapping("hxtree")
    public String  hxtree(Integer roleid, Model model){
        model.addAttribute("id",roleid);
        return "ztx/hxtree";
    }
    //根据 角色id查询对应权限
    @RequestMapping("cxbyridtree")
    @ResponseBody
    public List<ZtxTree> cxbyridtree(Integer id){
        return zs.querytreebyrid(id,0);
    }

    //根据 用户id查询对应角色
    @RequestMapping("editrole")
    @ResponseBody
    public  List<ZtxRole>  editrole(Integer id){
        List<ZtxRole> list = zs.editrole(id);
        return list;
    }
    //根据用户id查询对应角色
    @RequestMapping("hxrole")
    public String  hxrole(Integer id, Model model,HttpServletRequest request){
        List<ZtxRole> list = zs.editrole(id);
        List<String> list1 = zs.queryrolebyid(id);
        request.getSession().setAttribute("roleid",list1.get(0));
        model.addAttribute("id",id);
        model.addAttribute("list",list);
        return "ztx/hxrole";
    }
    //绑定权限
    @RequestMapping("updatetree")
    @ResponseBody
    public void updatetree(Integer[] ids,Integer roleid){
        zs.updatetree(ids,roleid);
    }
    //绑定角色
    @RequestMapping("updaterole")
    @ResponseBody
    public void updaterole(Integer[] ids,Integer id){
        zs.updaterole(ids,id);
    }
    //绑定角色
    @RequestMapping("updatero")
    @ResponseBody
    public void updatero(Integer ids,Integer id,HttpServletRequest request) {
        String roleid = (String)request.getSession().getAttribute("roleid");
        int i = Integer.parseInt(roleid);
        zs.updaterolecount(i,ids);
        zs.updatero(ids,id);
    }
    //新增角色
    @RequestMapping("addrole")
    @ResponseBody
    public void addrole(ZtxRole role){
        zs.addrole(role);
    }
    //删除角色
    @RequestMapping("deleterole")
    @ResponseBody
    public void deleterole(String ids){
        zs.deleterole(ids);
    }
    //删除用户
    @RequestMapping("deleteuser")
    @ResponseBody
    public void deleteuser(String ids){
        zs.deleteuser(ids);
    }
    //修改状态
    @RequestMapping("updatestatus")
    @ResponseBody
    public void updatestatus(Integer id,Integer status){
        zs.updatestatus(id,status);
    }
    //修改审核状态
    @RequestMapping("updateproduct")
    @ResponseBody
    public void updateproduct(Integer productid,Integer state){
        zs.updateproduct(productid,state);
    }
    //查待审核
    @RequestMapping("querydsh")
    @ResponseBody
    public   Map  querydsh(@RequestBody ParameUtil param ){
        List list=zs.querydsh(param);
        Long l=zs.querydshcount(param);
        Map map=new HashMap();
        map.put("rows", list);
        map.put("total", l);
        return map;
    }
    //查待审核
    @RequestMapping("queryytg")
    @ResponseBody
    public   Map  queryytg(@RequestBody ParameUtil param ){
        List list=zs.queryytg(param);
        Long l=zs.queryytgcount(param);
        Map map=new HashMap();
        map.put("rows", list);
        map.put("total", l);
        return map;
    }

    //回显用户
    @RequestMapping("upduser")
    public String upduser(Integer id,Model model){
        User user=zs.upduser(id);
        model.addAttribute("user",user);
        return "ztx/upduser";
    }
    @RequestMapping("updateuser")
    @ResponseBody
    public void updateuser(User user){
        zs.updateuser(user);
    }

    @RequestMapping("adduser")
    @ResponseBody
    public void adduser(User user){
        zs.adduser(user);
    }

    @RequestMapping("querybrand")
    @ResponseBody
    public List<ZtxBrand> querybrand(Integer typeid){
        List<ZtxBrand> list=zs.querybrand(typeid);
        return list;
    }
    @RequestMapping("querybrandall")
    @ResponseBody
    public List<ZtxBrand> querybrandall(){
        List<ZtxBrand> list=zs.querybrandall();
        return list;
    }
    @RequestMapping("queryshi")
    @ResponseBody
    public List<ZtxShi> queryshi(Integer orignshengid){
        List<ZtxShi> list=zs.queryshi(orignshengid);
        return list;
    }


}
