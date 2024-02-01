package com.example.benk.service;

import com.example.benk.dto.ResponseDTO;
import com.example.benk.dto.UserRequestDTO;

public interface UserService {
    ResponseDTO createAccount(UserRequestDTO userRequestDTO);
    boolean checkIfUserIsAdmin(long id);
}
