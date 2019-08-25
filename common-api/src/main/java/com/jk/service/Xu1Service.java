package com.jk.service;

import com.jk.model.Shopping_xu;
import com.jk.model.Youhiu_xu;

import java.util.List;
import java.util.Map;

public interface Xu1Service {
    void addshopping(Shopping_xu sho,Integer id);

    List<Shopping_xu> listshopping(Integer id);

    void deleteshopping(Integer id,Integer uid);

    void addshoucang(Shopping_xu sho,Integer uid);

    List<Shopping_xu> listshoucang(Integer id);

    Integer updatecount(Integer[] productid, Integer[] count, Integer uid);

    List<Youhiu_xu> listyouhiujuan();

    List<Youhiu_xu> listyouhiujuan2();
}
