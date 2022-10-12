package com.ds.dslab1.repository;

import com.ds.dslab1.model.User;
import com.ds.dslab1.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    List<User> findAllByRole(UserRole role);
}
