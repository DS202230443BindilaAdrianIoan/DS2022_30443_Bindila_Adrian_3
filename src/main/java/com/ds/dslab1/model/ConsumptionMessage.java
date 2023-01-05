package com.ds.dslab1.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsumptionMessage {
    private LocalDateTime timestamp;
    private Long deviceId;
    private double measurement;

    public void setTimestamp(String timestamp) {
        this.timestamp = LocalDateTime.parse(timestamp);
    }
}
