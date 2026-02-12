package com.stayease.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stayease.entity.User;
import com.stayease.service.AdminService;
import com.stayease.service.UserService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

	
    private final UserService userService;
    @Autowired
    private final AdminService adminService;


    public AdminController(UserService userService, AdminService adminService) {
		super();
		this.userService = userService;
		this.adminService = adminService;
	}

	// View owners
    @GetMapping("/owners")
    public List<User> getOwners() {
        return userService.getAllOwners();
    }

    // View tenants
    @GetMapping("/tenants")
    public List<User> getTenants() {
        return userService.getAllTenants();
    }

    // Block user
    @PutMapping("/block/{id}")
    public String block(@PathVariable Integer id) {
        userService.blockUser(id);
        return "User blocked successfully";
    }

    // Unblock user
    @PutMapping("/unblock/{id}")
    public String unblock(@PathVariable Integer id) {
        userService.unblockUser(id);
        return "User unblocked successfully";
    }
    
    // block/unblock
    @PutMapping("/owners/{id}/status/{status}")
    public User changeStatus(@PathVariable int id, @PathVariable boolean status) {
        return adminService.changeStatus(id, status);
    }

    // delete
    @DeleteMapping("/owners/{id}")
    public ResponseEntity<?> deleteOwner(@PathVariable int id) {
        adminService.deleteOwner(id);
        return ResponseEntity.ok("Owner deleted successfully");
    }
    
    @GetMapping("/dashboard-counts")
    public Map<String, Long> getDashboardCounts() {

        Map<String, Long> data = new HashMap<>();

        data.put("totalPGs", adminService.getTotalPGs());
        data.put("totalOwners", adminService.getTotalOwners());
        data.put("totalTenants", adminService.getTotalTenants());
        data.put("pendingApprovals", adminService.getPendingOwners());

        return data;
    }

}
