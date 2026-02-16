package com.ecobazar.Ecobazar.dto;
public class AuthResponse {
    public String token;
    public String role;
    public String username;

    public AuthResponse(String token, String role, String username) {
        this.token = token;
        this.role = role;
        this.username = username;
    }
}
