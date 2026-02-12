package com.stayease.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stayease.dto.PgRequestDto;
import com.stayease.entity.Pg;
import com.stayease.service.PgService;

@RestController
@RequestMapping("/api/pgs")
@CrossOrigin(origins = "http://localhost:3000")
public class PgController {

    @Autowired
    private PgService pgService;

//    @PostMapping
//    public Pg addPg(@RequestBody Pg pg){
//        return pgService.addPg(pg);
//    }
//    
    
    @PostMapping("/add")
    public ResponseEntity<Pg> addPg(@RequestBody PgRequestDto pgDto) {
    Pg savedPg = pgService.addPg(pgDto);
    return ResponseEntity.ok(savedPg);
    }

    @GetMapping
    public List<Pg> getAll(){
        return pgService.getAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pg> getPgById(@PathVariable Long id) {
    Pg pg = pgService.getPgById(id);
    return ResponseEntity.ok(pg);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Pg> updatePg(
            @PathVariable Long id,
            @RequestBody PgRequestDto pgDto) {

        Pg updatedPg = pgService.updatePg(id, pgDto);
        return ResponseEntity.ok(updatedPg);
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePg(@PathVariable Long id) {
        pgService.deletePg(id);
        return ResponseEntity.ok(
            Map.of("message", "PG deleted successfully")
        );
    }

}

