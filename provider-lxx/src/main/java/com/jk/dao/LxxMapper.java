package com.jk.dao;

import com.jk.model.AreaBeanLxx;
import com.jk.model.RenZhengBean;
import com.jk.util.ParameUtil;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface LxxMapper {


    //新增店铺
    int addShop(RenZhengBean renZhengBean);

    //地区三级联动
    @Select("select * from area_lxx where pid = #{value}")
    List<AreaBeanLxx> findArea(Integer id);

    //查询店铺列表
    @Select(" select * from dianpu_lxx ")
    List<RenZhengBean> queryDp(ParameUtil parame);

    //根据id查询
    @Select(" select * from dianpu_lxx where id = #{value} ")
    RenZhengBean findById(Integer id);

    //个人进行认证
    void addEnterprise(RenZhengBean renZhengBean);

    //企业进行认证
    void addIndividual(RenZhengBean renZhengBean);

    //审核店铺列表查询
    @Select(" select * from dianpu_lxx where shzt = 1 ")
    List<RenZhengBean> Audit(ParameUtil parame);

    //审核通过
    @Update(" update dianpu_lxx set shzt = 2 where id = #{id} ")
    void Pass(RenZhengBean renZhengBean);

    //审核不通过
    @Update(" update dianpu_lxx set shzt = 3 where id = #{id} ")
    void Not(RenZhengBean renZhengBean);
}
