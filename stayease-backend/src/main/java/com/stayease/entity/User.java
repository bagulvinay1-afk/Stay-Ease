package com.stayease.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;   // Integer instead of int ✅

    @JsonProperty("fullName")
    @Column(nullable = false)
    private String fullname;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private Long phone;   // Long instead of long ✅

    private String address;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
    @Column(nullable = false)
    private Boolean active = true;


    public User() {
    }

    

    public User(Integer id, String fullname, String email, String password, Long phone, String address, Role role,
			Boolean active) {
		super();
		this.id = id;
		this.fullname = fullname;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.address = address;
		this.role = role;
		this.active = active;
	}



	// getters & setters …

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }
 
    public void setAddress(String address) {
        this.address = address;
    }

    public Role getRole() {
        return role;
    }
 
    public void setRole(Role role) {
        this.role = role;
    }



	public Boolean isActive() {
		return active;
	}



	public void setActive(Boolean active) {
		this.active = active;
	}
    
    
}
