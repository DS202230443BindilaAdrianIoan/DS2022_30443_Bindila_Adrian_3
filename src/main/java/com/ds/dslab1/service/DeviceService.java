package com.ds.dslab1.service;

import com.ds.dslab1.model.Device;
import com.ds.dslab1.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {
    @Autowired
    DeviceRepository deviceRepository;
    public void addDevice(Device device){
        deviceRepository.save(device);
    }
    public List<Device> getUserDevices(Long userId){
        return deviceRepository.findDevicesByUser_Id(userId);
    }
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }
    public void editDevice(Device device){
        deviceRepository.save(device);
    }
    public void deleteDevice(Long deviceId){
        deviceRepository.deleteById(deviceId);
    }


}
