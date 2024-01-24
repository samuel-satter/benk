package com.example.benk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseDTO {
    private String responseCode;
    private String responseMessage;
    private AccountInfoDTO accountInfoDTO;
}
