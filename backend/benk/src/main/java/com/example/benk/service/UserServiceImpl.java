package com.example.benk.service;

import com.example.benk.dto.AccountInfoDTO;
import com.example.benk.dto.LoginDTO;
import com.example.benk.dto.ResponseDTO;
import com.example.benk.dto.UserRequestDTO;
import com.example.benk.entity.User;
import com.example.benk.exception.UserNotFoundException;
import com.example.benk.repository.UserRepository;
import com.example.benk.utils.AccountUtils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    public static final String SECRET_KEY = "jwt";

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


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found" + username));

        Set<GrantedAuthority> authoritySet = user
                .getRoles()
                .stream()
                .map((role -> new SimpleGrantedAuthority(role.getEmail()))).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPwd(),
                authoritySet);
    }

//    public UserDetails loadByUsername(String email) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() ->
//                        new UsernameNotFoundException("User not found " + email));
//
//        Set<GrantedAuthority> authoritySet = user
//                .getRoles()
//                .stream()
//                .map((role) -> new SimpleGrantedAuthority(role.getEmail())).collect(Collectors.toSet());
//
//        return new org.springframework.security.core.userdetails.User(user.getEmail(),
//                user.getPassword(),
//                authoritySet);
//    }

    public ResponseDTO createAccount(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
         return ResponseDTO.builder()
                  .responseCode(ACCOUNT_EXISTS_CODE)
                  .responseMessage(ACCOUNT_EXISTS_MESSAGE)
                    .accountInfoDTO(null)
                  .build();
        }
        User newUser = User.builder()
                .is_admin(userRequestDTO.getIsAdmin())
                .first_name(userRequestDTO.getFirstName())
                .last_name(userRequestDTO.getLastName())
                .origin(userRequestDTO.getOrigin())
                .phone_number(userRequestDTO.getPhoneNumber())
                .email(userRequestDTO.getEmail())
                .account_number(AccountUtils.generateAccountNumber(RANGE))
                .status(userRequestDTO.getStatus())
                .build();
        User savedUser = userRepository.save(newUser);
        return ResponseDTO.builder()
                .responseCode(OK_CODE)
                .responseMessage(ACCOUNT_CREATED_MESSAGE)
                .accountInfoDTO(AccountInfoDTO.builder()
                        .isAdmin(savedUser.getIs_admin())
                        .accountFirstName(savedUser.getFirst_name())
                        .accountLastName(savedUser.getLast_name())
                        .accountBalance(savedUser.getBalance())
                        .accountNumber(savedUser.getAccount_number())
                        .build())
                .build();
    }

    public boolean authenticateUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail()).get();
        if (user.getEmail().equals(loginDTO.getEmail()) && user.getPwd().equals(loginDTO.getPwd())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean checkIfUserIsAdmin(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getIs_admin();
    }

    @Override
    public Long getUserIdByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getId();
        }
        return null;
    }


    @Override
    public String generateToken(String email) {
        String secretKey = System.getenv("SECRET_KEY");
        if (secretKey == null || secretKey.isEmpty()) {
            System.out.println("SECRET_KEY environment variable is not set or is empty.");
            throw new IllegalStateException("Secret key not found in environment variables");
        }
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        long expMillis = nowMillis + 3600000;
        Date exp = new Date(expMillis);
        
        String jwt = Jwts.builder()
        .setSubject(email)
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(key)
        .compact();

        return jwt;
    }


    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }


    @Override
    public User changeUserPassword(Long id, String newPwd) {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException("User with id " + id + "not found in database"));

        user.setPwd(newPwd);
        userRepository.save(user);

        return user;
    }


    @Override
    public User withdrawFromBalance(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " cannot be found in database"));
        if (user.getBalance().compareTo(amount) <= 0) {
            throw new IllegalArgumentException("insufficient balance");
        }
        user.setBalance(user.getBalance().subtract(amount));
        return userRepository.save(user);
    }


    @Override
    public User addFunds(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " cannot be found in database"));
        user.setBalance(user.getBalance().add(amount));
        return userRepository.save(user);
    }

    @Override
    public List<User> findTopByBalance() {
        logger.info("Fetching the top 7 users by balance");
        List<User> topUsers = userRepository.findTopByBalance();
        logger.info("Fetched {} users", topUsers.size());
        return topUsers;  
    }

}