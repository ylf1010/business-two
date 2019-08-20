package com.jk.dao;

import com.jk.model.Refundysq;
import com.jk.util.ParameUtil;

import java.util.List;

public interface RefundysqMapper {

    List<Refundysq> cha(ParameUtil parameUtil);

    void xiu(Integer id, Integer num);

    void xiuAll(String[] id);

    void xiuAll2(String[] id);
}