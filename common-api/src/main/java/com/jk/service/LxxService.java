package com.jk.service;

import com.jk.model.*;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;


import java.util.List;

public interface LxxService {

    int addShop(RenZhengBean renZhengBean);

    List<AreaBeanLxx> findArea(Integer id);

    PageUtil queryDp(ParameUtil parame);

    RenZhengBean findById(Integer id);

    void addEnterprise(RenZhengBean renZhengBean);

    void addIndividual(RenZhengBean renZhengBean);

    PageUtil Audit(ParameUtil parame);

    void Pass(RenZhengBean renZhengBean);

    void Not(RenZhengBean renZhengBean);

    User_xu loginUser(User_xu user);

    void addregisUser(User_xu user);


    List<YsqJiaoYi> queryPaymentOnBehalfOfOthers();

    List<YsqJiaoYi> queryDropShipping();

    List<YsqJiaoYi> queryShippedOrder();

    List<YsqJiaoYi> queryOffTheStocks();

    List<YsqJiaoYi> queryClose();

    List<YsqJiaoYi> queryRefund();

    List<YsqJiaoYi> queryQuan();


    List<Object> queryIntegral();
}
