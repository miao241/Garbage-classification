package test;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.dao.GarbageDao;
import com.entity.Garbage;
import com.service.GarbageService;


public class TestMain extends BasicTest{
	
	@Autowired
	private GarbageDao dao;
	
	@Autowired
	private GarbageService service;
	
	@Test
	public void test1(){
		List<Garbage> list = dao.queryByName(" È");
		for (Garbage gar : list) {
			System.out.println(gar);
		}
	}
}

