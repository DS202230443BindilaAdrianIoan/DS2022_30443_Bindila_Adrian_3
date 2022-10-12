package com.ds.dslab1.controller;

import com.ds.dslab1.dto.LoginDTO;
import com.ds.dslab1.dto.RegisterDTO;
import com.ds.dslab1.dto.UserDTO;
import com.ds.dslab1.model.User;
import com.ds.dslab1.service.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
public class AuthController {
    private final ModelMapper modelMapper = new ModelMapper();
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            User user = authService.login(loginDTO);
            return ResponseEntity.ok(modelMapper.map(user, UserDTO.class));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO registerDTO) {
        authService.register(modelMapper.map(registerDTO, User.class));
        return ResponseEntity.ok().build();
    }

}
