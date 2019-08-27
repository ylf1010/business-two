package com.jk.dao;

import com.jk.model.Shopping_xu;
import com.jk.model.Youhiu_xu;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface Xu1Dao {
    @Select("select a.*,b.productphoto from xu_youhiu a,ly_product b where a.shangpinid=b.productid and enddate >= now() limit  0,1  ")
    List<Youhiu_xu> listyouhiujuan();

    @Select("select a.*,b.productphoto from xu_youhiu a,ly_product b where a.shangpinid=b.productid and enddate >= now() limit  1,2  ")
    List<Youhiu_xu> listyouhiujuan2();

    @Select(" select productid,productkucun,productphoto,productname,productprice,winejhl,winedushu  from ly_product  where productid=#{productid} ")
    Shopping_xu listshopping(Integer productid);
}
