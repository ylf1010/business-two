package com.jk.serviceimpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.dao.AddressDao;
import com.jk.model.Addressysq;
import com.jk.model.Product;
import com.jk.model.Shopping_xu;
import com.jk.model.YsqJiaoYi;
import com.jk.service.AddressService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class AddressServiceImpl implements AddressService {
    public static final Query QUERY = new Query();
    @Autowired
    private AddressDao addressDao;
    @Resource
    private MongoTemplate mongoTemplate;
    @Resource
    private RedisTemplate<String,YsqJiaoYi> redisTemplate;

    @Override
    public List<Product> addJiaoYi(Integer productid) {

        return addressDao.addJiaoYi(productid);
    }

    @Override
    public List<Addressysq> chaAddress(Integer id) {
        return addressDao.chaAddress(id);
    }

    @Override
    public void updateJiaoYiState(Integer ordernumber) {

        addressDao.updateJiaoYiState(ordernumber);
    }

    @Override
    public List<YsqJiaoYi> chaJiaoYi(Long ordernumber) {

        return addressDao.chaJiaoYi(ordernumber);
    }

    @Override
    public void addressDiZhi(Addressysq addressysq) {

        if(addressysq.getId()!=null && !"".equals(addressysq.getId())){
            addressDao.addressDiZhiXiuGai(addressysq);
            return;
        }
        addressDao.addressDiZhi(addressysq);
    }

    @Override
    public void deleteAddress(Integer id) {

        addressDao.deleteAddress(id);
    }

    @Override
    public String addDingDan(Shopping_xu shopping,Integer id) {
        Product p = addressDao.queryProductById(shopping.getId());
        YsqJiaoYi jiaoYi = new YsqJiaoYi();
        Date date = new Date();
        StringBuffer buffer = new StringBuffer();
        buffer.append(date.getTime()).append(id);
        jiaoYi.setOrdernumber(buffer.toString());
        jiaoYi.setAmount(shopping.getProductcount());
        jiaoYi.setMoney(Integer.toString((int) (p.getProductprice()*shopping.getProductcount())));
        jiaoYi.setState(1);
        jiaoYi.setUnitprice(p.getProductprice().intValue());
        jiaoYi.setProductname(p.getProductname());
        jiaoYi.setXu_userid(id);
        addressDao.addDingDan(jiaoYi);
        return buffer.toString();
    }

    @Override
    public List<Shopping_xu> chaShopping(int[] productid,Integer userid) {
        /*Criteria c = new Criteria();
        c.and("productid").in(productid);
        Query query = new Query();
        query.addCriteria(c);
        List<Product> list = mongoTemplate.find(query,Product.class,"shopping");
        return list;*/
        List<Shopping_xu> list = new ArrayList<>();
        for(int i=0;i<productid.length;i++){
            Criteria c = new Criteria();
            c.and("productid").is(productid[i]);
            Query query = new Query();
            query.addCriteria(c);
            Shopping_xu p = mongoTemplate.findOne(query,Shopping_xu.class,"shopping"+userid);
            if(p!=null){


                list.add(p);
            }
        }
        return list;
        //return addressDao.chaShopping(productid);
    }

    @Override
    public String addDingDanAll(int[] id, String count,Integer userid) {
        /*List<Product> list = addressDao.queryProductByIdAll(id);
        YsqJiaoYi jiaoYi = new YsqJiaoYi();
        Date date = new Date();*/
       // List<Product> list = new ArrayList<>();
        StringBuffer buffer = new StringBuffer();
        Date date = new Date();
        buffer.append(date.getTime()).append(userid);
        for(int i=0;i<id.length;i++){
            Criteria c = new Criteria();
            c.and("productid").is(id[i]);
            Query query = new Query();
            query.addCriteria(c);
            Shopping_xu shopping = mongoTemplate.findOne(query,Shopping_xu.class,"shopping"+userid);
            if(shopping!=null){
                //list.add(shopping);
                YsqJiaoYi jiaoYi = new YsqJiaoYi();
                jiaoYi.setId(shopping.getProductid());
                jiaoYi.setOrdernumber(buffer.toString());
                jiaoYi.setAmount(shopping.getProductcount());
                jiaoYi.setMoney(Integer.toString((int) (shopping.getProductprice()*shopping.getProductcount())));
                jiaoYi.setState(1);
                jiaoYi.setOrdertime(new Date());
                jiaoYi.setUnitprice(shopping.getProductprice().intValue());
                jiaoYi.setProductname(shopping.getProductname());
                jiaoYi.setXu_userid(userid);
                jiaoYi.setImg(shopping.getProductphoto());
               // mongoTemplate.insert(jiaoYi,"shopping"+userid);
                redisTemplate.opsForList().rightPush("shopping"+userid,jiaoYi);
                redisTemplate.expire("shopping"+userid,3, TimeUnit.MINUTES);
                mongoTemplate.remove(query,"shopping"+userid);
               // addressDao.addDingDan(jiaoYi);
            }
        }
        return buffer.toString();

    }

    @Override
    public void addDingDan1(Integer id) {
        List<YsqJiaoYi> range = redisTemplate.opsForList().range("shopping" + id, 0, -1);
        addressDao.addDingDan1(range);
        System.err.println("111111111119999999999999999999999999999999999999999");
        for (int i=0;i<range.size();i++){

            addressDao.updateProduct(range.get(i).getProductid(),range.get(i).getAmount());
        }
        redisTemplate.opsForList().remove("shopping"+id,0,-1);
    }

    @RabbitListener(queues = "test")
    public void hello(String a){
        System.out.println(a);
    }
}
