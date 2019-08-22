package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.LxxMapper;
import com.jk.model.*;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class LxxServiceImpl implements  LxxService {
    @Autowired
    private LxxMapper lxxMapper;



    //新增店铺
    public int addShop(RenZhengBean renZhengBean) {

        int i = lxxMapper.addShop(renZhengBean);
        return i;

    }

    //三级联动
    public List<AreaBeanLxx> findArea(Integer id) {
        return lxxMapper.findArea(id);
    }

    //查询店铺
    public PageUtil queryDp(ParameUtil parame) {

        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<RenZhengBean> list = lxxMapper.queryDp(parame);

        PageInfo<RenZhengBean> pageInfo = new PageInfo<RenZhengBean>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }

    @Override
    public RenZhengBean findById(Integer id) {
        return lxxMapper.findById(id);
    }

    //新增企业认证
    @Override
    public void addEnterprise(RenZhengBean renZhengBean) {
        lxxMapper.addEnterprise(renZhengBean);
    }

    //新增个人认证
    @Override
    public void addIndividual(RenZhengBean renZhengBean) {
        lxxMapper.addIndividual(renZhengBean);
    }

    //店铺审核列表
    @Override
    public PageUtil Audit(ParameUtil parame) {

        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<RenZhengBean> list = lxxMapper.Audit(parame);

        PageInfo<RenZhengBean> pageInfo = new PageInfo<RenZhengBean>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }

    //审核通过
    @Override
    public void Pass(RenZhengBean renZhengBean) {
        lxxMapper.Pass(renZhengBean);
    }

    //审核不通过
    @Override
    public void Not(RenZhengBean renZhengBean) {
        lxxMapper.Not(renZhengBean);
    }


    @Override
    public User_xu loginUser(User_xu user) {
        return lxxMapper.loginUser(user);
    }



    @Override
    public void addregisUser(User_xu user) {
        //新增用户
        lxxMapper.addregisUser(user);
        //获取新增用户id
        int id = lxxMapper.findId(user);
        Jifen_xu jifenXu = new Jifen_xu();
        jifenXu.setUid(id);
        Integer uid = jifenXu.getUid();
        System.out.println(uid);
        //将得到的id与积分表id对应
        lxxMapper.addJf(uid);
        //获取积分表新增数据id
        int ids = lxxMapper.findJfId(jifenXu);
        User_xu userXu = new User_xu();
        userXu.setJfid(ids);
        Integer jfids = userXu.getJfid();
        System.out.println(jfids);
        lxxMapper.updateJfid(jfids,uid);
    }

    //查询代付款订单
    @Override
    public PageUtil queryPaymentOnBehalfOfOthers(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<YsqJiaoYi> list = lxxMapper.queryPaymentOnBehalfOfOthers(parame);

        PageInfo<YsqJiaoYi> pageInfo = new PageInfo<YsqJiaoYi>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }
    //查询代发货订单
    @Override
    public PageUtil DropShipping(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<YsqJiaoYi> list = lxxMapper.DropShipping(parame);

        PageInfo<YsqJiaoYi> pageInfo = new PageInfo<YsqJiaoYi>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }
    //查询已发货订单
    @Override
    public PageUtil Shipped(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<YsqJiaoYi> list = lxxMapper.Shipped(parame);

        PageInfo<YsqJiaoYi> pageInfo = new PageInfo<YsqJiaoYi>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }
    //查询已完成订单
    @Override
    public PageUtil OffTheStocks(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<YsqJiaoYi> list = lxxMapper.OffTheStocks(parame);

        PageInfo<YsqJiaoYi> pageInfo = new PageInfo<YsqJiaoYi>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }
    //查询已关闭订单
    @Override
    public PageUtil queryClose(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<YsqJiaoYi> list = lxxMapper.queryClose(parame);

        PageInfo<YsqJiaoYi> pageInfo = new PageInfo<YsqJiaoYi>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }
    //查询已退款订单
    @Override
    public PageUtil queryRefund(ParameUtil parame) {
        PageHelper.startPage(parame.getPageNumber(), parame.getPageSize());

        List<YsqJiaoYi> list = lxxMapper.queryRefund(parame);

        PageInfo<YsqJiaoYi> pageInfo = new PageInfo<YsqJiaoYi>(list);

        PageUtil pageUtil = new PageUtil((int) pageInfo.getTotal(), parame.getPageNumber(), parame.getPageSize());

        pageUtil.setList(list);

        return pageUtil;
    }


}
