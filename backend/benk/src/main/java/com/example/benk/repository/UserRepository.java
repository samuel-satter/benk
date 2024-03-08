package com.example.benk.repository;

import com.example.benk.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    @SuppressWarnings("null")
    List<User> findAll();
    
    Boolean existsByEmail(String email);
    
    @Query(value = "SELECT DISTINCT * FROM users ORDER BY BALANCE DESC LIMIT 7", nativeQuery = true)
    List<User> findTopByBalance();

    @Query(value = "SELECT COUNT(*) FROM users WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())", nativeQuery = true)
    Integer countUsersThisMonth();

    @Query(value = "SELECT COUNT(*) FROM users WHERE MONTH(created_at) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(created_at) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)", nativeQuery = true)
    Integer countUsersLastMonth();

}