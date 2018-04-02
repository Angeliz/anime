package com.dajiu.controller;

import com.dajiu.bean.User;
import com.dajiu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangxing on 2017/4/7.
 */
@Controller
@RequestMapping("/blog")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping("/getUser")
    @ResponseBody
    public Map<String,Object> getUser(){
        Map map = new HashMap();
        List<User> list =   userService.getAll();
        map.put("user",list);
        map.put("status",1);
        map.put("success",true);
        return map;
    }

    @RequestMapping("getLogin")
    @ResponseBody
    public Map<String,Object> getLogin(String name,String password){
        Map map = new HashMap();
        User user = userService.getLogin(name,password);
        map.put("user",user);
        map.put("isLogin",true);
        map.put("status",1);
        return  map;
    }
}
