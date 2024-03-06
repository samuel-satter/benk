package com.example.benk.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class AddFundsRequestDTO {
    Long userId;
    BigDecimal amount;
}
