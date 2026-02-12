package com.stayease.controller;

import com.stayease.entity.Booking;
import com.stayease.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        return service.createBooking(booking);
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    @GetMapping("/tenant/{tenantId}")
    public List<Booking> history(@PathVariable Long tenantId) {
        return service.tenantHistory(tenantId);
    }
}
