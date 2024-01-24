package com.example.benk.controller;

import com.example.benk.entity.User;
import com.example.benk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/findAll")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
