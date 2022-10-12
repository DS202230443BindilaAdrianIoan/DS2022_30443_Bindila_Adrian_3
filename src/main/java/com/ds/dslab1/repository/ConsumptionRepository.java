package com.ds.dslab1.repository;

import com.ds.dslab1.model.EnergyConsumptionTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface ConsumptionRepository extends JpaRepository<EnergyConsumptionTimestamp, Long> {
    List<EnergyConsumptionTimestamp> getByTimestampBetweenAndDevice_Id(LocalDateTime timestamp, LocalDateTime timestamp2, Long device_id);
}
