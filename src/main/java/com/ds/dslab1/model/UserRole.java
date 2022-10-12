package com.ds.dslab1.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UserRole {
    USER("USER"),
    ADMIN("ADMIN");
    private final String label;
}
