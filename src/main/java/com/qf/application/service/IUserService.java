package com.qf.application.service;

import com.qf.application.model.User;

import java.util.Map;

public interface IUserService {
    public int addUser(User user);

    public int delectUser(Integer id);

    public int updateUser(User user);

    public Map<String,Object> queryUserList(Map<String,Object> map);

}
