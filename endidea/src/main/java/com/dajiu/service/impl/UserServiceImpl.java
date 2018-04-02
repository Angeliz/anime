package com.dajiu.service.impl;
import com.dajiu.bean.User;
import com.dajiu.dao.UserDao;
import com.dajiu.service.UserService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service("UserService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;
    public List<User> getAll() {
        return userDao.getAll();
    }

    public User getLogin(String name, String password) {
        return userDao.getLogin(name,password);
    }
}
