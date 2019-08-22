package com.jk.service;

import com.jk.model.*;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

import javax.servlet.http.HttpServletRequest;
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

    PageUtil queryPaymentOnBehalfOfOthers(ParameUtil parame);

    PageUtil DropShipping(ParameUtil parame);

    PageUtil Shipped(ParameUtil parame);

    PageUtil OffTheStocks(ParameUtil parame);

    PageUtil queryClose(ParameUtil parame);

    PageUtil queryRefund(ParameUtil parame);
}
