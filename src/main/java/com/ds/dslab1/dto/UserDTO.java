package com.ds.dslab1.dto;

import com.ds.dslab1.model.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private UserRole role;
}
