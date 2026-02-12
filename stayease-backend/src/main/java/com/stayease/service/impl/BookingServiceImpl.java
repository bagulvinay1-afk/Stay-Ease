package com.stayease.service.impl;

import com.stayease.entity.Booking;
import com.stayease.repository.BookingRepository;
import com.stayease.service.BookingService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository repo;

    public BookingServiceImpl(BookingRepository repo) {
        this.repo = repo;
    }

    @Override
    public Booking createBooking(Booking booking) {
        booking.setStatus("REQUESTED");
        return repo.save(booking);
    }

    @Override
    public Booking updateStatus(Long id, String status) {
        Booking b = repo.findById(id).orElseThrow();
        b.setStatus(status);
        return repo.save(b);
    }

    @Override
    public List<Booking> tenantHistory(Long tenantId) {
        return repo.findByTenantId(tenantId);
    }
}
