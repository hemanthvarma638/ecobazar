package com.ecobazar.Ecobazar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.ecobazar.Ecobazar.dto.AuthResponse;
import com.ecobazar.Ecobazar.dto.LoginRequest;
import com.ecobazar.Ecobazar.entity.User;
import com.ecobazar.Ecobazar.security.JwtUtil;
import com.ecobazar.Ecobazar.service.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public User register(@RequestBody User user) {

        if (userService.findByUsername(user.getUsername()) != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username already exists"
            );
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // default role
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        return userService.register(user);
    }

    //  Login
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User user = userService.findByUsername(request.getUsername());
        System.out.println("Raw password: " + request.getPassword());
        System.out.println("DB password: " + user.getPassword());
        System.out.println("Match: " +
                passwordEncoder.matches(request.getPassword(), user.getPassword()));


        if (user == null ||
                !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        String token = jwtUtil.generateToken(
                user.getUsername(),
                user.getRole()
        );

        return new AuthResponse(
                token,
                user.getRole(),
                user.getUsername()
        );
    }

}