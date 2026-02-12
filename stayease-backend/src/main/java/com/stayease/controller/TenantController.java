package com.stayease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stayease.entity.Tenant;
import com.stayease.repository.TenantRepository;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin
public class TenantController {

    @Autowired
    private TenantRepository tenantRepo;

    @PostMapping
    public Tenant register(@RequestBody Tenant tenant){
        return tenantRepo.save(tenant);
    }
}

