package com.ds.dslab1.service;

import com.ds.dslab1.dto.LoginDTO;
import com.ds.dslab1.model.User;
import com.ds.dslab1.model.UserRole;
import com.ds.dslab1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    public void register(User user) {
        userRepository.save(user);
    }

    public User login(LoginDTO loginDTO) throws NoSuchElementException {
        return userRepository.findByUsername(loginDTO.getUsername()).orElseThrow();
    }
}
