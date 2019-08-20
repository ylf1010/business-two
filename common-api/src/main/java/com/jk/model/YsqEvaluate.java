package com.jk.model;

import java.io.Serializable;
import java.util.Date;

public class YsqEvaluate implements Serializable {
    private Integer id;



    private String evaluate;

    private String content;

    private Date time;

    private String name;

    private Integer jiaoyiid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(String evaluate) {
        this.evaluate = evaluate == null ? null : evaluate.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getJiaoyiid() {
        return jiaoyiid;
    }

    public void setJiaoyiid(Integer jiaoyiid) {
        this.jiaoyiid = jiaoyiid;
    }
}