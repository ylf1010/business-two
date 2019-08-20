package com.jk.service;

import com.jk.model.User;
import com.jk.model.ZtxRole;
import com.jk.model.ZtxTree;
import com.jk.util.ParameUtil;

import java.util.List;

public interface ZtxService {
    List<ZtxTree> querytree(Integer id);

    List queryrole(ParameUtil param);

    Long queryrolecount(ParameUtil param);

    List<ZtxTree> edittree(Integer roleid);

    void updatetree(Integer[] ids, Integer roleid);

    void addrole(ZtxRole role);

    void deleterole(String ids);

    List queryuser(ParameUtil param);

    Long queryusercount(ParameUtil param);

    List<ZtxRole> editrole(Integer id);

    void updaterole(Integer[] ids, Integer id);

    void deleteuser(String ids);

    void updatestatus(Integer id, Integer status);

    void updatero(Integer ids, Integer id);

    List<ZtxTree> querytreebyrid(Integer id, int pid);

    List<String> queryrolebyid(Integer id);

    void updaterolecount(int i, Integer ids);

    List<ZtxRole> querytype();

    User upduser(Integer id);

    void updateuser(User user);
}
