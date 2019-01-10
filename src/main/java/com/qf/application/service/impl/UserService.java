package com.qf.application.service.impl;

import com.qf.application.dao.IUserDao;
import com.qf.application.model.User;
import com.qf.application.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class UserService implements IUserService {

    @Autowired
    private IUserDao userDao;

    @Override
    public int addUser(User user) {
        return userDao.insertSelective(user);
    }

    @Override
    public int delectUser(Integer id) {
        return userDao.deleteByPrimaryKey(id);
    }

    @Override
    public int updateUser(User user) {
        return userDao.updateByPrimaryKeySelective(user);
    }

    @Override
    public Map<String, Object> queryUserList(Map<String, Object> paramMap) {
        //把传递的参数转成int类型，再放入集合中
//        Integer startIndex = Integer.parseInt(paramMap.get("startIndex").toString());
//        Integer pageSize = Integer.parseInt(paramMap.get("pageSize").toString());
        Integer startIndex = 0;
        Integer pageSize = 3;
        paramMap.put("startIndex", startIndex);
        paramMap.put("pageSize", pageSize);
        //查询到分页的集合数据
        List<User> userList = userDao.getListPage(paramMap);

        for (User user : userList) {
            System.out.println(user.getName());
        }

        int total = userDao.queryUserTotal(paramMap);
        //把数据装到map中返回到controller
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("userList", userList);
        resultMap.put("total", total);
        return resultMap;
    }


}
