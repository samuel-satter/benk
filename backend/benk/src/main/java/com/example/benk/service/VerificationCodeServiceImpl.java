package com.example.benk.service;

import com.example.benk.entity.VerificationCode;
import com.example.benk.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{

    private final VerificationRepository repository;

    @Autowired
    VerificationCodeServiceImpl(VerificationRepository verificationRepository) {
        this.repository = verificationRepository;
    }


    @Override
    public void saveVerificationCode(String email, String code) {
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpirationTime(LocalDateTime.now().plusMinutes(5));
        repository.save(verificationCode);
    }

    @Override
    public boolean verifyCode(String email, String submittedCode) {
        Optional<VerificationCode> verificationCode = repository.findByEmail(email);
        if (verificationCode.isPresent()) {
            if (LocalDateTime.now().isAfter(verificationCode.get().getExpirationTime())) {
                repository.delete(verificationCode.get());
                return false;
            }
            return verificationCode.get().getCode().equals(submittedCode);
        }
        return false;
    }
}
