package com.jk.controller;


import com.alibaba.dubbo.config.annotation.Reference;


import com.alibaba.fastjson.JSONObject;
import com.jk.model.*;
import com.jk.service.LxxService;
import com.jk.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;
import java.util.concurrent.TimeUnit;


@Controller
@RequestMapping("lxx")
public class LxxController {


    @Reference
    private LxxService lxxService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;


    //登录信息
    @RequestMapping("LoginUser")
    public String LoginUser() {
        return "lxx/LoginLxx";
    }

    //前往注册页面
    @RequestMapping("Register")
    public String Register() {
        return "lxx/RegisterLxx";
    }

    //前往注册页面
    @RequestMapping("Enrollment")
    public String Enrollment() {
        return "lxx/EnrollmentLxx";
    }

    //前往关闭订单页面
    @RequestMapping("Close")
    public String Close() {
        return "lxx/Close";
    }

    //前往待发货订单页面
    @RequestMapping("DropShipping")
    public String DropShipping() {
        return "lxx/DropShipping";
    }

    //前往完成订单页面
    @RequestMapping("OffTheStocks")
    public String OffTheStocks() {
        return "lxx/OffTheStocks";
    }

    //前往待付款页面
    @RequestMapping("PaymentOnBehalfOfOthers")
    public String PaymentOnBehalfOfOthers() {
        return "lxx/PaymentOnBehalfOfOthers";
    }

    //前往退款订单页面
    @RequestMapping("Refund")
    public String Refund() {
        return "lxx/Refund";
    }

    //前往已发货页面
    @RequestMapping("Shipped")
    public String Shipped() {
        return "lxx/Shipped";
    }

    //店铺信息
    @RequestMapping("aa")
    public String aa() {
        return "lxx/index";
    }

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

    //测试
    @RequestMapping("bb")
    public String bb() {
        return "lxx/bb";
    }

    //登录信息
    @RequestMapping("Order")
    public String Order() {
        return "PaymentOnBehalfOfOthers";
    }

    //新增//修改
    @RequestMapping("addShop")
    @ResponseBody
    public String addShop(RenZhengBean renZhengBean) {
        int i = lxxService.addShop(renZhengBean);

        return null;

    }

    //新增企业认证
    @RequestMapping("addEnterprise")
    @ResponseBody
    public void addEnterprise(RenZhengBean renZhengBean) {

        lxxService.addEnterprise(renZhengBean);

    }

    //新增个人认证
    @RequestMapping("addIndividual")
    @ResponseBody
    public void addIndividual(RenZhengBean renZhengBean) {

        lxxService.addIndividual(renZhengBean);

    }

    //三级联动
    @RequestMapping("findArea")
    @ResponseBody
    public List<AreaBeanLxx> findArea(Integer id) {
        List<AreaBeanLxx> findArea = lxxService.findArea(id);
        return findArea;
    }

    //查询店铺
    @RequestMapping("queryDp")
    @ResponseBody
    public DataGridResult queryDp(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.queryDp(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }

    //企业回显
    @RequestMapping("findById")
    @ResponseBody
    public RenZhengBean findById(Integer id) {
        return lxxService.findById(id);
    }

    //上传图片
    @RequestMapping("uploadPhotoFile")
    @ResponseBody
    public String upImg(MultipartFile artImg, HttpServletRequest req) throws
            Exception {
        //获取原文件名称
        String fileName = artImg.getOriginalFilename();
        String folderPath =
                req.getSession().getServletContext().getRealPath("/") +
                        "upload/";
        File file = new File(folderPath);
        // 该目录是否已经存在
        if (!file.exists()) {
            // 创建文件夹
            file.mkdir();
        }
        String onlyFileName = UUID.randomUUID().toString() + fileName.substring(fileName.lastIndexOf('.'));
        FileOutputStream fos = new FileOutputStream(folderPath + onlyFileName);
        fos.write(artImg.getBytes());
        fos.flush();
        fos.close();
        return "/upload/" + onlyFileName;
    }

    //店铺审核列表
    @RequestMapping("QueryAudit")
    @ResponseBody
    public DataGridResult Audit(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.Audit(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }

    //审核通过
    @RequestMapping("Pass")
    @ResponseBody
    public void Pass(RenZhengBean renZhengBean) {

        lxxService.Pass(renZhengBean);

    }

    //审核不通过
    @RequestMapping("Not")
    @ResponseBody
    public void Not(RenZhengBean renZhengBean) {

        lxxService.Not(renZhengBean);

    }

    //登录
    @RequestMapping("loginUser")
    @ResponseBody
    public String loginUser(User_xu user, HttpServletRequest request, String code) {
        User_xu loginUser = lxxService.loginUser(user);

        String readCode = request.getSession().getAttribute("checkcode").toString();

        if (!readCode.toLowerCase().equals(code.toLowerCase())) {
            return "codeError";
        }
        if (loginUser == null) {
            return "usererror";
        }
        if (!user.getUserpass().equals(loginUser.getUserpass())) {
            return "passerror";
        }
        request.getSession().setAttribute("user_xu", loginUser);
        return "success";
    }

    //获取图片验证码
    @RequestMapping("getCode")

    public void getCode(HttpServletRequest request, HttpServletResponse response) {

        CheckImgUtil.buildCheckImg(request, response);

    }

    //注册
    @RequestMapping("register")
    @ResponseBody
    public String reisterUser(User_xu user) {
        User_xu regigUser = lxxService.loginUser(user);
        if (regigUser != null && !"".equals(regigUser)) {
            return "usernull";
        }

        lxxService.addregisUser(user);

        return "regissuccess";
    }

    @RequestMapping("check")
    @ResponseBody
    public void  checkCode(String mobile,HttpServletRequest request) {
        String url="https://api.netease.im/sms/sendcode.action";
        String appKey="678a2a34886dcef91ddf58a7ed05ca29";
        String nonce=UUID.randomUUID().toString().replace("-", "");
        String curTime=String.valueOf(Calendar.getInstance().getTimeInMillis()/1000);
        String checkSum=CheckSumBuilder.getCheckSum("726b41ce6b73", nonce, curTime);
        HashMap<String, Object> headers = new HashMap<>();
        headers.put("AppKey", appKey);
        headers.put("Nonce", nonce);
        headers.put("CurTime", curTime);
        headers.put("CheckSum", checkSum);
        HashMap<String, Object> params = new HashMap<>();
        params.put("mobile", mobile);
        System.err.println(mobile);
        params.put("templateid", "14799496");

        try {
            String str = HttpClientUtil.post(url, params, headers);
            JSONObject jsonObject = JSONObject.parseObject(str);

            String code = jsonObject.getString("code");
            String key = mobile;
            if (code.equals("200")) {
                String objcode = jsonObject.getString("obj");
                //request.getSession().setAttribute("obj", objcode);
                if (redisTemplate.hasKey(key)) {
                    objcode = redisTemplate.opsForValue().get(key);
                }
                if (!redisTemplate.hasKey(key)) {
                    redisTemplate.opsForValue().set(key, objcode);
                    redisTemplate.expire(key, 24, TimeUnit.HOURS);
                }
            }
            System.out.println(str);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
   /* //短信登录
    @RequestMapping("loginUserTwo")
    @ResponseBody
    public  Boolean loginUserTwo(String code,String mobile) {

        try{

        }catch(Exception e)

            e.

    }*/

    //查询代付款订单
    @RequestMapping("queryPaymentOnBehalfOfOthers")
    @ResponseBody
    public DataGridResult queryPaymentOnBehalfOfOthers(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.queryPaymentOnBehalfOfOthers(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }
    //查询代发货订单
    @RequestMapping("queryDropShipping")
    @ResponseBody
    public DataGridResult DropShipping(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.DropShipping(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }
    //查询已发货订单
    @RequestMapping("queryShippedOrder")
    @ResponseBody
    public DataGridResult queryShippedOrder(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.Shipped(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }
    //查询已完成订单
    @RequestMapping("queryOffTheStocks")
    @ResponseBody
    public DataGridResult OffTheStocks(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.OffTheStocks(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }
    //查询已关闭订单
    @RequestMapping("queryClose")
    @ResponseBody
    public DataGridResult queryClose(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.queryClose(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }
    //查询退款中订单
    @RequestMapping("queryRefund")
    @ResponseBody
    public DataGridResult queryOrder(@RequestBody ParameUtil parame) {
        DataGridResult dgr = new DataGridResult();
        PageUtil pageUtil = lxxService.queryRefund(parame);
        dgr.setRows(pageUtil.getList());
        dgr.setTotal(pageUtil.getSumSize());
        return dgr;
    }
}
