package com.entity;

import java.io.Serializable;

public class Cate implements Serializable{

	private Integer cid;
	private String cname;
	
	public Cate() {
		super();
	}

	public Cate(Integer cid, String cname) {
		super();
		this.cid = cid;
		this.cname = cname;
	}

	@Override
	public String toString() {
		return "Cate [cid=" + cid + ", cname=" + cname + "]";
	}

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}
	
	
}
