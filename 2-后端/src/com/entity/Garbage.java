package com.entity;

import java.io.Serializable;

public class Garbage implements Serializable{

	private Integer id;
	private String name;
	private Cate category;
	private Integer count;
	
	public Garbage() {
		super();
	}

	public Garbage(Integer id, String name, Cate category, Integer count) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
		this.count = count;
	}

	@Override
	public String toString() {
		return "Garbage [id=" + id + ", name=" + name + ", category=" + category + ", count=" + count + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Cate getCategory() {
		return category;
	}

	public void setCategory(Cate category) {
		this.category = category;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	
	
	
	
}
