package com.ds.dslab1.service;

import com.ds.dslab1.model.ConsumptionMessage;
import com.ds.dslab1.model.Device;
import com.ds.dslab1.model.EnergyConsumptionTimestamp;
import com.ds.dslab1.model.NotificationMessage;
import com.ds.dslab1.repository.ConsumptionRepository;
import com.ds.dslab1.repository.DeviceRepository;
import com.ds.dslab1.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = "hello")
public class ListenerService {
    @Autowired
    ConsumptionRepository consumptionRepository;
    @Autowired
    DeviceRepository deviceRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private int hourlyConsumption = 0;
    private int currentHour = 0;

    @RabbitHandler
    public void receive(String in) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ConsumptionMessage message = mapper.readValue(in, ConsumptionMessage.class);

        EnergyConsumptionTimestamp ect = new EnergyConsumptionTimestamp();
        ect.setHourlyConsumption((int) message.getMeasurement());
        ect.setTimestamp(message.getTimestamp());
        Device device = deviceRepository.findById(message.getDeviceId()).orElse(null);
        ect.setDevice(device);
        consumptionRepository.save(ect);

        if (currentHour != ect.getTimestamp().getHour()) {
            hourlyConsumption = ect.getHourlyConsumption();
            currentHour = ect.getTimestamp().getHour();
        } else {
            hourlyConsumption += ect.getHourlyConsumption();
        }

        if (device != null && hourlyConsumption > device.getConsumptionLimit()) {
            simpMessagingTemplate.convertAndSendToUser(device.getUser().getUsername(), "/notify", new NotificationMessage(device.getUser().getUsername(), device.getDescription(), currentHour));
        }

    }

}
