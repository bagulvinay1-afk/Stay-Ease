package com.stayease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stayease.entity.User;
import com.stayease.repository.PgRepository;
import com.stayease.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PgRepository pgRepo;

    // all owners
    public List<User> getAllOwners() {
        return userRepo.findByRole_Id(2);
    }

    // block/unblock
    public User changeStatus(int id, boolean status) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(status);
        return userRepo.save(user);
    }

    // delete owner
    public void deleteOwner(int id) {
        userRepo.deleteById(id);
    }
    
    public long getTotalOwners() {
        return userRepo.countByRole_Name("OWNER");
    }

    public long getTotalTenants() {
        return userRepo.countByRole_Name("TENANT");
    }

    public long getPendingOwners() {
        return userRepo.countByRole_NameAndActiveFalse("OWNER");
    }

    public long getTotalPGs() {
        return pgRepo.count();
    }
}

