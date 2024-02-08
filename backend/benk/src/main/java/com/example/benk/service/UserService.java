package com.example.benk.service;

import com.example.benk.dto.ResponseDTO;
import com.example.benk.dto.UserRequestDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    ResponseDTO createAccount(UserRequestDTO userRequestDTO);
    boolean checkIfUserIsAdmin(long id);
}
