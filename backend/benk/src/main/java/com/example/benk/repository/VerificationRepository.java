package com.example.benk.repository;

import com.example.benk.entity.VerificationCode;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmail(String email);
}
