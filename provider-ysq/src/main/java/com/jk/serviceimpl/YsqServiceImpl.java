package com.jk.serviceimpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.dao.YsqJiaoYiMapper;
import com.jk.model.YsqEvaluate;
import com.jk.model.YsqJiaoYi;
import com.jk.service.YsqService;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YsqServiceImpl implements YsqService {
            @Autowired
            private YsqJiaoYiMapper jiaoYiMapper;
    @Override
    public PageUtil cha(ParameUtil parame) {
        System.out.println(111);
        /*PageHelper.startPage(parameUtil.getPageNumber(),parameUtil.getPageSize());*/
        /*if(parameUtil.getStatus()==0){
            parameUtil.setStatus(null);
        }*/
        Map map = new HashMap();
        map.put("start",(parame.getPageNumber()-1)*parame.getPageSize());
        map.put("end",parame.getPageSize());
        map.put("state",parame.getState());
        Integer count = jiaoYiMapper.findjiaoyicount(map);
        List<YsqJiaoYi> list = jiaoYiMapper.cha(map);
        PageInfo<YsqJiaoYi> info = new PageInfo<>(list);
        PageUtil pageUtil = new PageUtil();
        pageUtil.setList(list);
        pageUtil.setSumSize(count);
        return pageUtil;
    }

    @Override
    public PageUtil cha2(ParameUtil parameUtil) {
        PageHelper.startPage(parameUtil.getPageNumber(),parameUtil.getPageSize());
        List<YsqEvaluate> list = jiaoYiMapper.cha2(parameUtil);
        PageInfo<YsqEvaluate> info = new PageInfo<>(list);
        PageUtil pageUtil = new PageUtil((int)info.getTotal(),parameUtil.getPageNumber(),parameUtil.getPageSize());
        pageUtil.setList(list);
        return pageUtil;
    }

    @Override
    public void beizhu(YsqJiaoYi ysqModel) {

        jiaoYiMapper.beizhu(ysqModel);
    }
}
