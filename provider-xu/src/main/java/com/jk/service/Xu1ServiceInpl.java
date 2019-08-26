package com.jk.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.Xu1Dao;
import com.jk.model.Shopping_xu;
import com.jk.model.Youhiu_xu;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service

public class Xu1ServiceInpl implements Xu1Service{
              //客户端
    @Autowired
    private Xu1Dao xu1;
    @Autowired
    private MongoTemplate  mongoTemplate;
    @Autowired
    private RedisTemplate   redisTemplate;

    //加入购物车
    @Override
    public void addshopping(Shopping_xu sho,Integer id) {
       Criteria c=new  Criteria();    //设置条件
        c.and("productid").is(sho.getProductid());
        Query query =new  Query();   //使条件生效
        query.addCriteria( c );
           //查询  商品是否已加入购物车
        Shopping_xu one = mongoTemplate.findOne(query, Shopping_xu.class, "shopping" + id);
        if(one != null){
            //如果购物车有这个商品则  修改数量加一
            Update up=new Update();  //赋值要修改的字段
            up.set("producount",one.getProducount()+1);
            mongoTemplate.updateFirst(query,up,"shopping"+id);
        }else{
            //如果购物车没有这个商品则 新增
            mongoTemplate.insert(sho,"shopping"+id);
        }


    }


    //查询个人购物车
    @Override
    public List<Shopping_xu> listshopping(Integer id) {
        return mongoTemplate.findAll(Shopping_xu.class,"shopping"+id);
    }

    //删除购物车
    @Override
    public void deleteshopping(Integer id,Integer uid) {
        Criteria c=new Criteria();   //设置条件
        c.and("productid").is(id);  //删除数组里in包含的所有( is 等于)
        Query query=new Query();     //条件生效
        query.addCriteria(c);  //放入条件
        mongoTemplate.remove(query,"shopping"+uid);
    }

    //结算改数量
    @Override
    public Integer updatecount(Integer[] productid, Integer[] count, Integer uid) {
        for (int i=0;i < productid.length;i++){
            Criteria c=new  Criteria();    //设置条件
            c.and("productid").is(productid[i]);
            Query query =new  Query();   //使条件生效
            query.addCriteria( c );
            Update up=new Update();  //赋值要修改的字段
            up.set("producount",count[i]);
             mongoTemplate.updateFirst(query, up, "shopping"+uid);
        }
        return 1;
    }



    //加收藏夹   删除购物车
    @Override
    public void addshoucang(Shopping_xu sho,Integer uid) {
         //存redis
          String  key="shopping"+uid;
        redisTemplate.opsForList().rightPush(key,sho);
        redisTemplate.expire(key,60, TimeUnit.MINUTES);
         //删mogo
        Criteria c=new Criteria();   //设置条件
        c.and("productid").is(sho.getProductid());  //删除数组里in包含的所有( is 等于)
        Query query=new Query();     //条件生效
        query.addCriteria(c);  //放入条件
        mongoTemplate.remove(query,key);

    }

    //查收藏夹
    @Override
    public List<Shopping_xu> listshoucang(Integer id) {
        String  key="shopping"+id;
        List<Shopping_xu> list = redisTemplate.opsForList().range(key, 0, -1);
        return list;
    }




    //优惠劵查询1
    @Override
    public List<Youhiu_xu> listyouhiujuan() {
        return xu1.listyouhiujuan();
    }

    //优惠劵查询2
    @Override
    public List<Youhiu_xu> listyouhiujuan2() {
        return xu1.listyouhiujuan2();
    }


}
