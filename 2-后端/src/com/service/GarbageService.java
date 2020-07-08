package com.service;

import java.util.List;

import com.dao.GarbageDao;
import com.entity.Garbage;

public interface GarbageService {
     
	public List<Garbage> queryByName(String name);
	
	public List<Garbage> queryHotItems();
	
	public void addCount(Integer id);
	
}
