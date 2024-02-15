package com.example.benk.controller;

import com.example.benk.entity.User;
import com.example.benk.repository.UserRepository;
import com.example.benk.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    @GetMapping("/findAll")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/findByEmail")
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    @GetMapping("/isAdmin")
    public ResponseEntity<Boolean> isAdmin(@PathVariable Long id) {
        boolean isAdmin = userService.checkIfUserIsAdmin(id);
        return ResponseEntity.ok(isAdmin);
    }
}
