package com.example.e_commerce.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key (must be at least 256 bits for HS256)
    private final String SECRET_KEY = "myverystrongsecretkeythatneedstobelong123!";

    // Convert secret string to SecretKey
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    // Generate JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)                                                   
                .issuedAt(new Date())                                                
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  
                .signWith(key)                                                       
                .compact();
    }

    // Extract all claims from token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()                    
                .verifyWith(key)               
                .build()
                .parseSignedClaims(token)       
                .getPayload();                  
    }

    // Extract username from JWT token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Check if token is expired
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Validate token for username
    public boolean validateToken(String token, String username) {
        String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }
}

