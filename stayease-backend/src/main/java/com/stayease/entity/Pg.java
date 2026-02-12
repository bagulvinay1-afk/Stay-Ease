package com.stayease.entity;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "pg")
public class Pg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String city;
    private double deposit;
    private String pgType;   // Boys / Girls / Both
    private String food;
    @Column(nullable = false)
    private String status = "PENDING";
    @Column(length = 1000)
    private String amenities;

    @Column(length = 1000)
    private String rules;

    private String contact;

    @OneToMany(
            mappedBy = "pg",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
        )
        @JsonManagedReference
        private List<Room> rooms = new ArrayList<>();

    
    public Pg() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Pg(Long id, String name, String address, String city, double deposit, String pgType, String food,
			String amenities, String rules, String contact, List<Room> rooms) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.city = city;
		this.deposit = deposit;
		this.pgType = pgType;
		this.food = food;
		this.amenities = amenities;
		this.rules = rules;
		this.contact = contact;
		this.rooms = rooms;
	}

	// getters & setters
    public void addRoom(Room room) {
        rooms.add(room);
        room.setPg(this);
    }

    public void removeRoom(Room room) {
        rooms.remove(room);
        room.setPg(null);
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public double getDeposit() {
		return deposit;
	}

	public void setDeposit(double deposit) {
		this.deposit = deposit;
	}

	public String getPgType() {
		return pgType;
	}

	public void setPgType(String pgType) {
		this.pgType = pgType;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	
	public String getAmenities() {
		return amenities;
	}

	public void setAmenities(String amenities) {
		this.amenities = amenities;
	}

	public String getRules() {
		return rules;
	}

	public void setRules(String rules) {
		this.rules = rules;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

   
    
}
