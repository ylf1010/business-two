package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Product implements Serializable {
    private Integer productid;

    private String productphoto;

    private String productname;

    private Integer productpid;

    private String productprice;

    private Integer productkucun;

    private Integer productzxl;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")// 处理从	后端到前端的时间
    private Date productdate;

    private String productdescribe;

    private  Integer productsxj;

    public Integer getProductsxj() {
        return productsxj;
    }

    public void setProductsxj(Integer productsxj) {
        this.productsxj = productsxj;
    }

    public Integer getProductid() {
        return productid;
    }

    public void setProductid(Integer productid) {
        this.productid = productid;
    }

    public String getProductphoto() {
        return productphoto;
    }

    public void setProductphoto(String productphoto) {
        this.productphoto = productphoto == null ? null : productphoto.trim();
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname == null ? null : productname.trim();
    }

    public Integer getProductpid() {
        return productpid;
    }

    public void setProductpid(Integer productpid) {
        this.productpid = productpid;
    }

    public String getProductprice() {
        return productprice;
    }

    public void setProductprice(String productprice) {
        this.productprice = productprice == null ? null : productprice.trim();
    }

    public Integer getProductkucun() {
        return productkucun;
    }

    public void setProductkucun(Integer productkucun) {
        this.productkucun = productkucun;
    }

    public Integer getProductzxl() {
        return productzxl;
    }

    public void setProductzxl(Integer productzxl) {
        this.productzxl = productzxl;
    }

    public Date getProductdate() {
        return productdate;
    }

    public void setProductdate(Date productdate) {
        this.productdate = productdate;
    }

    public String getProductdescribe() {
        return productdescribe;
    }

    public void setProductdescribe(String productdescribe) {
        this.productdescribe = productdescribe == null ? null : productdescribe.trim();
    }
}