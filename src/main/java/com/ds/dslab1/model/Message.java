package com.ds.dslab1.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    //Energy consumption exceeded at hour %d for device %d
    private String username;
    private String deviceName;
    private int hour;
}
