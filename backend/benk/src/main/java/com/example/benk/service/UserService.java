package com.example.benk.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.benk.dto.LoginDTO;
import com.example.benk.dto.ResponseDTO;
import com.example.benk.dto.UserRequestDTO;
import com.example.benk.entity.User;

@Service
public interface UserService {
    ResponseDTO createAccount(UserRequestDTO userRequestDTO);
    boolean checkIfUserIsAdmin(String email);
    boolean authenticateUser(LoginDTO loginDTO);
    String generateToken(String email);
    Long getUserIdByEmail(String email);
    User saveUser(User user);
    User changeUserPassword(Long id, String newPwd);
    User withdrawFromBalance(Long userId, BigDecimal amoumt);
    User addFunds(Long userId, BigDecimal amount);
    List<User> findTopByBalance();
}
