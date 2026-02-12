package com.stayease.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stayease.dto.PaymentRequestDto;
import com.stayease.entity.Payment;
import com.stayease.repository.PaymentRepository;
import com.stayease.service.PaymentService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private PaymentRepository paymentRepo;

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data)
            throws RazorpayException {

        Double amount = Double.valueOf(data.get("amount").toString());

        // 1. Save payment as PENDING
        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setStatus("PENDING");
        payment.setPaymentMode(data.get("paymentMode").toString());
        payment.setPaymentDate(LocalDateTime.now());

        payment = paymentRepo.save(payment);

        // 2. Create Razorpay Order
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int)(amount * 100)); // ₹ → paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "pg_" + payment.getId());

        Order order = razorpayClient.orders.create(orderRequest);

        // 3. Save orderId
        payment.setRazorpayOrderId(order.get("id"));
        paymentRepo.save(payment);

        // 4. Send to frontend
        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("paymentId", payment.getId());
        response.put("amount", order.get("amount"));

        return response;
    }
    
    
    @PostMapping("/success")
    public void paymentSuccess(@RequestBody Map<String, String> data) {

        Long paymentId = Long.valueOf(data.get("paymentId"));

        Payment payment = paymentRepo.findById(paymentId).orElseThrow();

        payment.setStatus("SUCCESS");
        payment.setRazorpayPaymentId(data.get("razorpayPaymentId"));
        payment.setPaymentDate(LocalDateTime.now());

        paymentRepo.save(payment);
    }


}