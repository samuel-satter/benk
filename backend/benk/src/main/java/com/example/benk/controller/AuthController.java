package com.example.benk.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.benk.dto.LoginDTO;
import com.example.benk.service.UserService;

@RestController
@RequestMapping(value = "/jwt")
public class AuthController {

private final UserService userService;

public AuthController(UserService userService) {
    this.userService = userService;
}

@PostMapping("/authenticate")
public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDTO) {
    boolean isAuthenticated = userService.authenticateUser(loginDTO);
    
    if (isAuthenticated) {
        String token = userService.generateToken(loginDTO.getEmail());
        return new ResponseEntity<>(token, HttpStatus.OK);
    } else {
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
}

    
//    private final JwtUtil jwtUtil;

    // private final AuthenticationManager authenticationManager;

    // @Autowired
    // public AuthController(AuthenticationManager authenticationManager) {
    //     this.authenticationManager = authenticationManager;
    // }

    // @PostMapping("/authenticate")
    // public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDTO) {
    //     Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
    //             loginDTO.getEmail(), loginDTO.getPassword()
    //     ));

    //     SecurityContextHolder.getContext().setAuthentication(authentication);

    //     return new ResponseEntity<>("user signed in successfully", HttpStatus.OK);
    // }

//    @PostMapping
//    public String generate(@RequestBody Map<String, Object> claims) {
//        return jwtUtil.createJwt(claims);
//    }
//
//    @GetMapping(value = "/{token}")
//    public Claims parse(@PathVariable String token) {
//        return jwtUtil.parseJwt(token);
//    }
}
