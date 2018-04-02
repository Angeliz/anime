package com.dajiu.dao;
import com.dajiu.bean.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {
    List<User> getAll();
    User getLogin(@Param("name") String name, @Param("password") String password);
}
