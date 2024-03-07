package com.example.benk.controller;

import com.example.benk.dto.AddFundsRequestDTO;
import com.example.benk.dto.VerificationCodeRequest;
import com.example.benk.dto.WithdrawalRequestDTO;
import com.example.benk.entity.User;
import com.example.benk.exception.UserNotFoundException;
import com.example.benk.repository.UserRepository;
import com.example.benk.repository.VerificationRepository;
import com.example.benk.service.UserService;

import com.example.benk.service.VerificationCodeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final VerificationCodeServiceImpl verificationCodeService;

    @Autowired
    UserController(UserRepository userRepository,
    UserService userService,
    VerificationCodeServiceImpl verificationCodeService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.verificationCodeService = verificationCodeService;
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

    @PutMapping("/pwd/{userId}")
    public ResponseEntity<?> updatePwd(@PathVariable("userId") Long userId, @RequestBody String newPwd) {
        try {
            User updatedUser = userService.changeUserPassword(userId, newPwd);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body("Failed to change user password");
        }
    }

    @PostMapping("/request-verification-code")
    public ResponseEntity<?> requestVerificationCode(@RequestBody VerificationCodeRequest request) {
        String email = request.email();
        String code = request.email();
        verificationCodeService.saveVerificationCode(email, code);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody VerificationCodeRequest request) {
        boolean isValid = verificationCodeService.verifyCode(request.email(), request.code());
        if (isValid) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired code");
        }
    }
    
    @PostMapping("/withdraw-funds")
    public ResponseEntity<?> withdrawFunds(@RequestBody WithdrawalRequestDTO request) {
        User updatedUser = userService.withdrawFromBalance(request.getId(), request.getAmount());
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/add-funds")
    public ResponseEntity<?> addFunds(@RequestBody AddFundsRequestDTO request) {
        User updatedUser = userService.addFunds(request.getUserId(), request.getAmount());
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/get-top-users")
    public ResponseEntity<List<User>> getTopUsers() {
        List<User> topUsers = userService.findTopByBalance();
        return ResponseEntity.ok(topUsers);
    }
}
