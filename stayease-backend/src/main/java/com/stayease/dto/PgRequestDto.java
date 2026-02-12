package com.stayease.dto;

import java.util.List;

public class PgRequestDto {

    public String name;
    public String address;
    public String city;
    public double deposit;
    public String pgType;
    public String food;
    public String amenities;
    public String rules;
    public String contact;

    public List<RoomRequestDto> rooms;

	public PgRequestDto(String name, String address, String city, double deposit, String pgType, String food,
			String amenities, String rules, String contact, List<RoomRequestDto> rooms) {
		super();
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

	public List<RoomRequestDto> getRooms() {
		return rooms;
	}

	public void setRooms(List<RoomRequestDto> rooms) {
		this.rooms = rooms;
	}
    
    
}
