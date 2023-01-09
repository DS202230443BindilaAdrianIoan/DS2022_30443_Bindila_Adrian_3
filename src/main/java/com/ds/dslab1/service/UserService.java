package com.ds.dslab1.service;

import com.ds.dslab1.dto.LinkDTO;
import com.ds.dslab1.model.Device;
import com.ds.dslab1.model.User;
import com.ds.dslab1.model.UserRole;
import com.ds.dslab1.repository.DeviceRepository;
import com.ds.dslab1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    DeviceRepository deviceRepository;

    public List<User> getAllClients() {
        return userRepository.findAllByRole(UserRole.USER);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void editUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void linkDevice(LinkDTO linkDTO) {
        User user = userRepository.getReferenceById(linkDTO.getUserId());
        Device device = deviceRepository.getReferenceById(linkDTO.getDeviceId());
        user.getDevices().add(device);
        device.setUser(user);
        deviceRepository.save(device);
    }
}
