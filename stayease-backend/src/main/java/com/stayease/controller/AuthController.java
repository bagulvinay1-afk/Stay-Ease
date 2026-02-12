package com.stayease.controller;

import org.springframework.web.bind.annotation.*;

import com.stayease.dto.LoginRequest;
import com.stayease.entity.User;
import com.stayease.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register/{role}")
    public User register(@RequestBody User user, @PathVariable String role) {
        return userService.registerUser(user, role.toUpperCase());
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getEmail(), request.getPassword());
            if (user == null) return "Invalid email or password";
            return user;
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
