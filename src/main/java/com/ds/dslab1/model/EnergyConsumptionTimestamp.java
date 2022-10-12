package com.ds.dslab1.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EnergyConsumptionTimestamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Basic
    private java.time.LocalDateTime timestamp;

    private int hourlyConsumption;
    @ManyToOne
    @ToString.Exclude
    private Device device;
}
