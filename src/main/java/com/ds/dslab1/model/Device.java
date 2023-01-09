package com.ds.dslab1.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String address;
    private int consumptionLimit;
    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    private List<EnergyConsumptionTimestamp> energyConsumptionTimestamps;
    @ManyToOne
    @ToString.Exclude
    private User user;
}
