package com.stayease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stayease.entity.Pg;

public interface PgRepository extends JpaRepository<Pg, Long> {
    List<Pg> findByCity(String city);
    List<Pg> findByStatus(String status);
}
