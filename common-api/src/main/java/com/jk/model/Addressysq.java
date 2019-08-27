package com.jk.model;

import java.io.Serializable;

public class Addressysq implements Serializable {
    private Integer id;

    private String address;

    private Integer pid;

    private Integer keid;

    private String consignee;

    private String phone;

    private String particular;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getKeid() {
        return keid;
    }

    public void setKeid(Integer keid) {
        this.keid = keid;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee == null ? null : consignee.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getParticular() {
        return particular;
    }

    public void setParticular(String particular) {
        this.particular = particular == null ? null : particular.trim();
    }
}