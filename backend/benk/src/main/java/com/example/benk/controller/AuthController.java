package com.example.benk.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.benk.utils.JwtUtil;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;

import java.util.Map;

@RestController
@RequestMapping(value = "/jwt")
@AllArgsConstructor
public class AuthController {
    
        private final JwtUtil jwtUtil;

    @PostMapping
    public String generate(@RequestBody Map<String, Object> claims) {
        return jwtUtil.createJwt(claims);
    }

    @GetMapping(value = "/{token}")
    public Claims parse(@PathVariable String token) {
        return jwtUtil.parseJwt(token);
    }
}
