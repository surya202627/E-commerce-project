package com.example.e_commerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.e_commerce.dto.AuthRequest;
import com.example.e_commerce.entity.User;
import com.example.e_commerce.repository.UserRepository;
import com.example.e_commerce.security.JwtUtil;

@RestController
public class AuthController {

    BCryptPasswordEncoder encoder;
    UserRepository repo;
    AuthenticationManager authenticationManager;
    JwtUtil jwtUtil;

    AuthController(BCryptPasswordEncoder encoder, UserRepository repo, AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {
        this.encoder = encoder;
        this.repo = repo;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String getRegister(@RequestBody AuthRequest request) {

        if (repo.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }

        String hashPassword = encoder.encode(request.getPassword());

        User user = new User(request.getUsername(), hashPassword, "ROLE_USER");
        repo.save(user);

        return "Registration successful";
    }

    @PostMapping("/login")
    public ResponseEntity<String> getLogin(@RequestBody AuthRequest request) {

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (BadCredentialsException e) {

            return ResponseEntity.status(403).body("Invalid username or password");

        }

        String token = jwtUtil.generateToken(request.getUsername());

        return ResponseEntity.status(200).body(token);
    }

}
