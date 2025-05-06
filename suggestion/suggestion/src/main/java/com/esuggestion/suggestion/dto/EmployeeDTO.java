package com.esuggestion.suggestion.dto;

import java.util.UUID;

import com.esuggestion.suggestion.model.Role;

public class EmployeeDTO {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private Role role;
    private String otp;
    
    public EmployeeDTO() {
    }
    public EmployeeDTO(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    } 

    
}
