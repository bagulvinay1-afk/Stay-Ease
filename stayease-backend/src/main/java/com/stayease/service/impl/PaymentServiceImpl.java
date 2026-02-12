package com.stayease.service.impl;


import com.stayease.entity.Payment;
import com.stayease.repository.PaymentRepository;
import com.stayease.service.PaymentService;

import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repo;

    public PaymentServiceImpl(PaymentRepository repo) {
        this.repo = repo;
    }

    @Override
    public Payment makePayment(Payment payment) {
        payment.setStatus("PAID");
        return repo.save(payment);
    }
}
