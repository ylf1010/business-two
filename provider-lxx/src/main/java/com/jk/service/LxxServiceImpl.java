package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.LxxMapper;
import com.jk.model.AreaBeanLxx;
import com.jk.model.Product;
import com.jk.model.RenZhengBean;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Service
public class LxxServiceImpl implements  LxxService{
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

        PageUtil pageUtil = new PageUtil((int)pageInfo.getTotal(),parame.getPageNumber(), parame.getPageSize());

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

        PageUtil pageUtil = new PageUtil((int)pageInfo.getTotal(),parame.getPageNumber(), parame.getPageSize());

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


}
