package com.jk.dao;

import com.jk.model.ZtxRoleTree;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;

import java.util.List;

public interface ZtxRoleTreeMapper {

    List<String> querytreebyid(Integer roleid);

    @Delete("delete from y_role_tree where roleid=#{roleid}")
    int deletetree(Integer roleid);
    @Insert("insert into y_role_tree(roleid,treeid) values (#{roleid},#{treeid})")
    int addrtm(ZtxRoleTree rpm);
}