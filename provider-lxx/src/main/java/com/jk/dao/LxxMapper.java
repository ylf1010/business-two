package com.jk.dao;

import com.jk.model.AreaBeanLxx;
import com.jk.model.RenZhengBean;
import com.jk.util.ParameUtil;

import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface LxxMapper {


    //新增店铺
    int addShop(RenZhengBean renZhengBean);


   /* int addEnterprise(RenZhengBean renZhengBean);*/


    

    @Select("select * from area_lxx where pid = #{value}")
    List<AreaBeanLxx> findArea(Integer id);

    @Select(" select * from dianpu_lxx ")
    List<RenZhengBean> queryDp(ParameUtil parame);

    
    @Select(" select * from dianpu_lxx where id = #{value} ")
    RenZhengBean findById(Integer id);


    void addEnterprise(RenZhengBean renZhengBean);

    void addIndividual(RenZhengBean renZhengBean);
}
