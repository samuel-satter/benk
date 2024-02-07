package com.example.benk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {
    private Boolean isAdmin;
    private String firstName;
    private String lastName;
    private String origin;
    private String email;
    private String pw;
    private String accountNumber;
    private String phoneNumber;
    private String status;
}
