package com.example.benk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountInfoDTO {
    private String accountFirstName;
    private String accountLastName;
    private BigDecimal accountBalance;
    private String accountNumber;

}
