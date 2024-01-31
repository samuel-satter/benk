package com.example.benk.repository;

import com.example.benk.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByEmail(String email);
    Boolean isUserAdmin(Boolean isAdmin);
}
