package com.example.benk.service;

import org.springframework.stereotype.Service;

@Service
public interface VerificationCodeService {
    void saveVerificationCode(String email, String code);
    boolean verifyCode(String email, String submittedCode);
}
