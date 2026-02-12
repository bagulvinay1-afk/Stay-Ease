package com.stayease.dto;

public class RoomRequestDto {

    private String roomNumber;
    private int sharing;
    private double rent;
    private int totalBeds;
    private int availableBeds;

    public RoomRequestDto() {
        super();
    }

    public RoomRequestDto(String roomNumber, int sharing, double rent, int totalBeds, int availableBeds) {
        super();
        this.roomNumber = roomNumber;
        this.sharing = sharing;
        this.rent = rent;
        this.totalBeds = totalBeds;
        this.availableBeds = availableBeds;
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
}
