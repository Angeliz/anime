package com.dajiu.service;

import com.dajiu.bean.User;

import java.util.List;

public interface UserService {
    List<User> getAll();
    User getLogin(String name,String password);
}