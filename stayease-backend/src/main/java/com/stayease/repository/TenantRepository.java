package com.stayease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stayease.entity.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, Long> {}

