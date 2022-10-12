package com.ds.dslab1.repository;

import com.ds.dslab1.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findDevicesByUser_Id(Long userId);
}
