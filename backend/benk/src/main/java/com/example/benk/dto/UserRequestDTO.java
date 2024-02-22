package com.example.benk.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {
    private Long id;
    private Boolean isAdmin;
    private String firstName;
    private String lastName;
    private String pwd;
    private String email;
    private String phoneNumber;
    private String origin;
    private String accountNumber;
    private BigDecimal balance;
    private Boolean status;
}
