package com.dao;

import java.util.List;

import com.entity.Garbage;

public interface GarbageDao {
     
	public List<Garbage> queryByName(String name);
	public List<Garbage> queryHotItems();
	public void addCount(Integer id);
}
