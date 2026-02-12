package com.stayease.service;

import java.util.List;

import com.stayease.entity.User;

public interface UserService {

    User registerUser(User user, String roleName);

    User login(String email, String password);

    List<User> getAllOwners();

    List<User> getAllTenants();

    void blockUser(Integer id);

    void unblockUser(Integer id);
}
