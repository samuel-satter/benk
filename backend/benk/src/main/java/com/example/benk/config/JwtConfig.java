package com.example.benk.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@ConfigurationProperties(prefix = "jwt")
@Configuration
@Data
public class JwtConfig {
    private String hmacSecret;
    private String subject;
    private String id;
    private String issuer;
    private int timeToLive;
}
