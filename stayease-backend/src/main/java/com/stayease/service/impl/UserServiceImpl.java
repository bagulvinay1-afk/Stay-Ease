package com.stayease.service.impl;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stayease.entity.Role;
import com.stayease.entity.User;
import com.stayease.repository.RoleRepository;
import com.stayease.repository.UserRepository;
import com.stayease.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ✅ Constructor injection (VERY IMPORTANT)
    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // ---------------- REGISTER ----------------
    @Override
    public User registerUser(User user, String roleName) {

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        user.setPassword(encoder.encode(user.getPassword()));
        user.setActive(true);

        return userRepository.save(user);
    }

    // ---------------- LOGIN ----------------
    @Override
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) return null;

        if (!user.isActive())
            throw new RuntimeException("Account is blocked by admin");

        if (!encoder.matches(password, user.getPassword()))
            return null;

        return user;
    }

    // ---------------- ADMIN ----------------
    @Override
    public List<User> getAllOwners() {
        return userRepository.findByRole_Name("OWNER");
    }

    @Override
    public List<User> getAllTenants() {
        return userRepository.findByRole_Name("TENANT");
    }

    @Override
    public void blockUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public void unblockUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(true);
        userRepository.save(user);
    }
}
