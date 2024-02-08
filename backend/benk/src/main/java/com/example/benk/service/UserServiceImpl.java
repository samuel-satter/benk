package com.example.benk.service;

import com.example.benk.dto.AccountInfoDTO;
import com.example.benk.dto.ResponseDTO;
import com.example.benk.dto.UserRequestDTO;
import com.example.benk.entity.User;
import com.example.benk.repository.UserRepository;
import com.example.benk.utils.AccountUtils;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    public static final String OK_CODE = "200";
    public static final String USER_IS_ADMIN_MESSAGE = "User is admin";
    public static final String ACCOUNT_CREATED_MESSAGE = "Account has successfully been created";
    
    public static final String ACCOUNT_EXISTS_MESSAGE = "Account already exists";
    public static final String USER_IS_NOT_ADMIN_MESSAGE = "User is not admin";
    
    public static final String ACCOUNT_EXISTS_CODE = "409";
    public static final String USER_IS_NOT_ADMIN_CODE = "401";
    
    public static final int RANGE = 8;


    private final UserRepository userRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadByEmail(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found " + email));

        Set<GrantedAuthority> authoritySet = user
                .getRoles()
                .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getEmail())).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                authoritySet);
    }

    public ResponseDTO createAccount(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
         return ResponseDTO.builder()
                  .responseCode(ACCOUNT_EXISTS_CODE)
                  .responseMessage(ACCOUNT_EXISTS_MESSAGE)
                    .accountInfoDTO(null)
                  .build();
        }
        User newUser = User.builder()
                .isAdmin(userRequestDTO.getIsAdmin())
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
                .responseCode(OK_CODE)
                .responseMessage(ACCOUNT_CREATED_MESSAGE)
                .accountInfoDTO(AccountInfoDTO.builder()
                        .isAdmin(savedUser.getIsAdmin())
                        .accountFirstName(savedUser.getFirstName())
                        .accountLastName(savedUser.getLastName())
                        .accountBalance(savedUser.getBalance())
                        .accountNumber(savedUser.getAccountNumber())
                        .build())
                .build();
    }

    public boolean checkIfUserIsAdmin(long id) {
        Optional<User> user = userRepository.findById(id);  
        if(user.isPresent() && user.get().getIsAdmin()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}