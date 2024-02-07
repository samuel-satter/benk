package com.example.benk.utils;

import com.example.benk.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final JwtConfig jwtConfig;

    public JwtUtil(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String createJwt(Map<String, Object> claims) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowInMillis = System.currentTimeMillis();
        Date now = new Date(nowInMillis);

        byte[] secret = Base64.getEncoder().encode(jwtConfig.getHmacSecret().getBytes());

        Key signingKey = new SecretKeySpec(secret, signatureAlgorithm.getJcaName());

        JwtBuilder jwtBuilder = Jwts.builder()
                .setId(jwtConfig.getId())
                .setIssuedAt(now)
                .setSubject(jwtConfig.getSubject())
                .setIssuer(jwtConfig.getIssuer())
                .setClaims(claims)
                .signWith(signingKey, signatureAlgorithm);

        if (jwtConfig.getTimeToLive() > 0) {
            jwtBuilder.setExpiration(new Date(nowInMillis + jwtConfig.getTimeToLive()));
        }

        return jwtBuilder.compact();
    }

    public Claims parseJwt(String jwt) {
        return Jwts.parser()
                .setSigningKey(Base64.getEncoder().encode(jwtConfig.getHmacSecret().getBytes()))
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

}
