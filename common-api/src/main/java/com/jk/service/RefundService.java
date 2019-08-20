package com.jk.service;


import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;


public interface RefundService {
    PageUtil cha(ParameUtil parameUtil);

    void xiu(Integer id, Integer num);

    void xiuAll(String[] id, Integer num);
}
