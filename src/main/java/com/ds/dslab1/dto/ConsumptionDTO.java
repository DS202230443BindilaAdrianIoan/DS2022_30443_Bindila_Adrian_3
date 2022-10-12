package com.ds.dslab1.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ConsumptionDTO {
    private LocalDateTime timestamp;
    private int hourlyConsumption;
    private Long deviceId;
}
