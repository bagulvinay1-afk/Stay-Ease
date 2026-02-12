package com.stayease.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tenant tenant;

    @ManyToOne
    private Room room;

    private LocalDate startDate;
    private LocalDate endDate;

    private String status;   // REQUESTED, APPROVED, ACTIVE, COMPLETED
    private double monthlyRent;
	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Booking(Long id, Tenant tenant, Room room, LocalDate startDate, LocalDate endDate, String status,
			double monthlyRent) {
		super();
		this.id = id;
		this.tenant = tenant;
		this.room = room;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
		this.monthlyRent = monthlyRent;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Tenant getTenant() {
		return tenant;
	}
	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}
	public Room getRoom() {
		return room;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public double getMonthlyRent() {
		return monthlyRent;
	}
	public void setMonthlyRent(double monthlyRent) {
		this.monthlyRent = monthlyRent;
	}

    // getters and setters
	
	
}
