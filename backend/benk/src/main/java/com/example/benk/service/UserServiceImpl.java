package com.example.benk.service;

import com.example.benk.dto.AccountInfoDTO;
import com.example.benk.dto.ResponseDTO;
import com.example.benk.dto.UserRequestDTO;
import com.example.benk.entity.User;
import com.example.benk.repository.UserRepository;
import com.example.benk.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    public static final String ACCOUNT_EXISTS_MESSAGE = "Account already exists";
    public static final String ACCOUNT_EXISTS_CODE = "409";
    public static final String ACCOUNT_CREATED_MESSAGE = "Account has successfully been exists";
    public static final String ACCOUNT_CREATED_CODE = "200";
    public static final int RANGE = 8;
    private final UserRepository userRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseDTO createAccount(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
         return ResponseDTO.builder()
                  .responseCode(ACCOUNT_EXISTS_CODE)
                  .responseMessage(ACCOUNT_EXISTS_MESSAGE)
                    .accountInfoDTO(null)
                  .build();
        }
        User newUser = User.builder()
                .firstName(userRequestDTO.getFirstName())
                .lastName(userRequestDTO.getLastName())
                .origin(userRequestDTO.getOrigin())
                .phoneNumber(userRequestDTO.getPhoneNumber())
                .email(userRequestDTO.getEmail())
                .accountNumber(AccountUtils.generateAccountNumber(RANGE))
                .status(userRequestDTO.getStatus())
                .build();
        User savedUser = userRepository.save(newUser);
        return ResponseDTO.builder()
                .responseCode(ACCOUNT_CREATED_CODE)
                .responseMessage(ACCOUNT_CREATED_MESSAGE)
                .accountInfoDTO(AccountInfoDTO.builder()
                        .accountFirstName(savedUser.getFirstName())
                        .accountLastName(savedUser.getLastName())
                        .accountBalance(savedUser.getBalance())
                        .accountNumber(savedUser.getAccountNumber())
                        .build())
                .build();
    }
}