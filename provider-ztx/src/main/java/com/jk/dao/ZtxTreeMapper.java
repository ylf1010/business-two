package com.jk.dao;

import com.jk.model.ZtxTree;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ZtxTreeMapper {

    List<ZtxTree> querytree(@Param("id") Integer id);

    List<ZtxTree> querytreeall();

    List<ZtxTree> queryOrgAll2(@Param("id") int id, @Param("pid") int pid);

    List<ZtxTree> queryOrgAll3(@Param("pid") int pid);
}