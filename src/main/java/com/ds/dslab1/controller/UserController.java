package com.ds.dslab1.controller;

import com.ds.dslab1.dto.LinkDTO;
import com.ds.dslab1.dto.UserDTO;
import com.ds.dslab1.model.User;
import com.ds.dslab1.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    UserService userService;
    @PutMapping("/map")
    public ResponseEntity<?> setMapping(@RequestBody LinkDTO linkDTO){
        userService.linkDevice(linkDTO);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/clients")
    public ResponseEntity<?> getAllClients() {
        List<User> clients = userService.getAllClients();
        List<UserDTO> clientDTOs = clients.stream().map(client -> modelMapper.map(client, UserDTO.class)).toList();
        return ResponseEntity.ok(clientDTOs);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<?> createUser() {
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> editUser(@RequestBody UserDTO userDTO) {
        userService.editUser(modelMapper.map(userDTO,User.class));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestParam Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

}
