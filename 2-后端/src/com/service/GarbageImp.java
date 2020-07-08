package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.GarbageDao;
import com.entity.Garbage;

@Service("garbageService")
@Transactional
public class GarbageImp implements GarbageService{
	@Autowired
	private GarbageDao dao;

	@Override
	public List<Garbage> queryByName(String name) {
		List<Garbage> service =  dao.queryByName(name);
		return service;
	}
	
	@Override
     public List<Garbage> queryHotItems(){
    	 List<Garbage> list = dao.queryHotItems();
    	 
		return list;
    	 
     }

	@Override
	public void addCount(Integer id) {
		dao.addCount(id);
		
	}

	
}
