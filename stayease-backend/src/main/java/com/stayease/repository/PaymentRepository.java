package com.stayease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.stayease.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // ❌ NO custom methods for now
}
