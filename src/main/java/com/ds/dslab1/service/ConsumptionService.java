package com.ds.dslab1.service;

import com.ds.dslab1.model.EnergyConsumptionTimestamp;
import com.ds.dslab1.repository.ConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ConsumptionService {
    @Autowired
    ConsumptionRepository consumptionRepository;

    public List<EnergyConsumptionTimestamp> getConsumptionByDateAndId(LocalDate date, Long deviceId) {
        return consumptionRepository.getByTimestampBetweenAndDevice_Id(date.atStartOfDay(), date.atTime(23, 59), deviceId);
    }
}
