package com.jk.service;

import com.jk.model.YsqJiaoYi;
import com.jk.util.PageUtil;
import com.jk.util.ParameUtil;

public interface YsqService {
    PageUtil cha(ParameUtil parame);

    PageUtil cha2(ParameUtil parameUtil);

    void beizhu(YsqJiaoYi ysqModel);
}
