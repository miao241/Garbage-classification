package com.controller;



import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Garbage;
import com.service.GarbageService;

@Controller
@RequestMapping("/control")
public class GarbageController {
    @Autowired
	private GarbageService service;
	
    private Set<String> data=new HashSet<String>();//未查找到的名称

    @ResponseBody
    @RequestMapping("/byname")
	public  List<Garbage> queryByName( String name) {

    	List<Garbage> byname = service.queryByName(name);
    	if(byname.isEmpty()) {
    		data.add(name);
    		System.out.println("未查询到的有："+data);
    	}else {
    	    System.out.println(byname);
    	}
        return byname;
	}
 
    @ResponseBody
    @RequestMapping("/hot")
    public List<Garbage> queryHotItems() {
    	List<Garbage> hot = service.queryHotItems();
    	System.out.println(hot);
    	return hot;
    }
    
    @ResponseBody
    @RequestMapping("/count")
    public void addCount(Integer id) {
    	System.out.println(id);
    	service.addCount(id);
    }
    
}
