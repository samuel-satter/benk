package com.example.benk.utils;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // private final JwtConfig jwtConfig;

    // public JwtUtil(JwtConfig jwtConfig) {
    //     this.jwtConfig = jwtConfig;
    // }

    // public String createJwt(Map<String, Object> claims) {

    //     long nowInMillis = System.currentTimeMillis();
    //     Date now = new Date(nowInMillis);

    //     byte[] secret = Base64.getEncoder().encode(jwtConfig.getHmacSecret().getBytes());

    //     Key signingKey = new SecretKeySpec(secret, Jwts.SIG.HS256.toString());

    //     JwtBuilder jwtBuilder = Jwts.builder()
    //             .id(jwtConfig.getId())
    //             .issuedAt(now)
    //             .subject(jwtConfig.getSubject())
    //             .issuer(jwtConfig.getIssuer())
    //             .claims(claims)
    //             .signWith(signingKey);

    //     if (jwtConfig.getTimeToLive() > 0) {
    //         jwtBuilder.expiration(new Date(nowInMillis + jwtConfig.getTimeToLive()));
    //     }

    //     return jwtBuilder.compact();
    // }

    // public Claims parseJwt(String jwt) {
    //     return Jwts.parser()
    //             .setSigningKey(Base64.getEncoder().encode(jwtConfig.getHmacSecret().getBytes()))
    //             .build()
    //             .parseSignedClaims(jwt)
    //             .getPayload();
    // }

}
