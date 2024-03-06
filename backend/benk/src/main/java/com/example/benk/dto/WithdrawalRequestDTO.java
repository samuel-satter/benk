package com.example.benk.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class WithdrawalRequestDTO {
    Long id;
    BigDecimal amount;
}
