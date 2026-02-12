package com.stayease.service;

import com.stayease.entity.Booking;
import java.util.List;

public interface BookingService {

    Booking createBooking(Booking booking);

    Booking updateStatus(Long bookingId, String status);

    List<Booking> tenantHistory(Long tenantId);
}
