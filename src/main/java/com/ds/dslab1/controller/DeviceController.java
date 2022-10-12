package com.ds.dslab1.controller;

import com.ds.dslab1.dto.DeviceDTO;
import com.ds.dslab1.model.Device;
import com.ds.dslab1.service.DeviceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {
    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    DeviceService deviceService;

    @GetMapping
    public ResponseEntity<?> getAllDevices() {
        List<Device> devices = deviceService.getAllDevices();
        List<DeviceDTO> deviceDTOs = devices.stream().map(device -> {
            DeviceDTO dto = modelMapper.map(device, DeviceDTO.class);
            if (device.getUser() != null) {
                dto.setOwner(device.getUser().getUsername());
            }
            return dto;
        }).toList();
        return ResponseEntity.ok(deviceDTOs);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserDevices(@RequestParam Long userId) {
        List<Device> devices = deviceService.getUserDevices(userId);
        List<DeviceDTO> deviceDTOS = devices.stream().map(device -> {
            DeviceDTO dto=modelMapper.map(device, DeviceDTO.class);
            if (device.getUser() != null) {
                dto.setOwner(device.getUser().getUsername());
            }
            return dto;
        }).toList();
        return ResponseEntity.ok(deviceDTOS);
    }

    @PostMapping
    public ResponseEntity<?> addDevice(@RequestBody DeviceDTO deviceDTO) {
        deviceService.addDevice(modelMapper.map(deviceDTO, Device.class));
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> editDevice(@RequestBody DeviceDTO deviceDTO) {
        deviceService.editDevice(modelMapper.map(deviceDTO, Device.class));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteDevice(@RequestParam Long deviceId) {
        deviceService.deleteDevice(deviceId);
        return ResponseEntity.ok().build();
    }
}
