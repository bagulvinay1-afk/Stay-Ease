package com.stayease.dto;

public class PaymentRequestDto {

    private Long pgId;
    private String roomType;
    private String duration;
    private Double rent;
    private Double deposit;
    private Double totalAmount;

    public PaymentRequestDto() {
    }

    public PaymentRequestDto(Long pgId, String roomType, String duration,
                             Double rent, Double deposit, Double totalAmount) {
        this.pgId = pgId;
        this.roomType = roomType;
        this.duration = duration;
        this.rent = rent;
        this.deposit = deposit;
        this.totalAmount = totalAmount;
    }

    public Long getPgId() {
        return pgId;
    }

    public void setPgId(Long pgId) {
        this.pgId = pgId;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Double getRent() {
        return rent;
    }

    public void setRent(Double rent) {
        this.rent = rent;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
