package com.stayease.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.stayease.entity.Pg;
@Entity
@Table(
    name = "room",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"room_number", "pg_id"})
    }
)
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(nullable = false)
    private int sharing;   // 1,2,3

    @Column(nullable = false)
    private double rent;

    private int totalBeds;
    private int availableBeds;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pg_id")
    @JsonBackReference
    private Pg pg;

	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Room(Long id, String roomNumber, int sharing, double rent, int totalBeds, int availableBeds, Pg pg) {
		super();
		this.id = id;
		this.roomNumber = roomNumber;
		this.sharing = sharing;
		this.rent = rent;
		this.totalBeds = totalBeds;
		this.availableBeds = availableBeds;
		this.pg = pg;
	}
	
	 // getters & setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public int getSharing() {
		return sharing;
	}

	public void setSharing(int sharing) {
		this.sharing = sharing;
	}

	public double getRent() {
		return rent;
	}

	public void setRent(double rent) {
		this.rent = rent;
	}

	public int getTotalBeds() {
		return totalBeds;
	}

	public void setTotalBeds(int totalBeds) {
		this.totalBeds = totalBeds;
	}

	public int getAvailableBeds() {
		return availableBeds;
	}

	public void setAvailableBeds(int availableBeds) {
		this.availableBeds = availableBeds;
	}

	public Pg getPg() {
		return pg;
	}

	public void setPg(Pg pg) {
		this.pg = pg;
	}

    
   
	
}
