package com.stayease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stayease.entity.Pg;
import com.stayease.repository.PgRepository;

@RestController
@RequestMapping("/api/admin/pgs")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminPgController {

    @Autowired
    private PgRepository pgRepo;

    // Get all PGs
    @GetMapping
    public List<Pg> getAllPgs() {
        return pgRepo.findAll();
    }

    // Approve PG
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approvePg(@PathVariable Long id) {
        Pg pg = pgRepo.findById(id).orElseThrow();
        pg.setStatus("APPROVED");
        pgRepo.save(pg);
        return ResponseEntity.ok("PG Approved");
    }

    // Reject PG
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectPg(@PathVariable Long id) {
        Pg pg = pgRepo.findById(id).orElseThrow();
        pg.setStatus("REJECTED");
        pgRepo.save(pg);
        return ResponseEntity.ok("PG Rejected");
    }

    // Delete PG
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePg(@PathVariable Long id) {
        pgRepo.deleteById(id);
        return ResponseEntity.ok("PG Deleted");
    }
}
