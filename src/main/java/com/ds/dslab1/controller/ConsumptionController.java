package com.ds.dslab1.controller;

import com.ds.dslab1.dto.ConsumptionDTO;
import com.ds.dslab1.model.EnergyConsumptionTimestamp;
import com.ds.dslab1.service.ConsumptionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/consumption")
public class ConsumptionController {
    private final ModelMapper modelMapper = new ModelMapper();
    @Autowired
    ConsumptionService consumptionService;
    @GetMapping
    public ResponseEntity<?> getConsumptionByDateAndId(@RequestParam String date, @RequestParam Long deviceId) {
        List<EnergyConsumptionTimestamp> consumptionList =
                consumptionService.getConsumptionByDateAndId(LocalDate.parse(date), deviceId);
        List<ConsumptionDTO> consumptionDTOS = consumptionList.stream().map(consumption -> {
            ConsumptionDTO consumptionDTO = modelMapper.map(consumption, ConsumptionDTO.class);
            consumptionDTO.setDeviceId(consumption.getDevice().getId());
            return consumptionDTO;
        }).toList();
        return ResponseEntity.ok(consumptionDTOS);
    }
}
