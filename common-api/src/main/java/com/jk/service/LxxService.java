package com.jk.service;

import com.jk.model.AreaBeanLxx;
import com.jk.model.RenZhengBean;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

import java.util.List;

public interface LxxService {

    int addShop(RenZhengBean renZhengBean);


    /*int addEnterprise(RenZhengBean renZhengBean);*/





    List<AreaBeanLxx> findArea(Integer id);


    PageUtil queryDp(ParameUtil parame);



    RenZhengBean findById(Integer id);


    void addEnterprise(RenZhengBean renZhengBean);

    void addIndividual(RenZhengBean renZhengBean);
}
