package com.example.benk.controller;

import com.example.benk.entity.User;
import com.example.benk.repository.UserRepository;
import com.example.benk.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    @GetMapping("/{email}/isAdmin")
    public ResponseEntity<Boolean> isAdmin(@PathVariable String email) {
        Long userId = userService.getUserIdByEmail(email);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        boolean isAdmin = userService.checkIfUserIsAdmin(email);
        return ResponseEntity.ok(isAdmin);
    }
}
