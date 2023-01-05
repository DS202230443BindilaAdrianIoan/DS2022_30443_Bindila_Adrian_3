package com.ds.dslab1.service;

import org.springframework.stereotype.Component;

//@Component
//@RepositoryEventHandler(EnergyConsumptionTimestamp.class)
//public class ConsumptionEventHandler {
//    private final SimpMessagingTemplate websocket;
//    private final EntityLinks entityLinks;
//
//    @Autowired
//    public ConsumptionEventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
//        this.websocket = websocket;
//        this.entityLinks = entityLinks;
//    }
//
//    @HandleAfterSave
//    public void notifyConsumption(EnergyConsumptionTimestamp ect) {
//        this.websocket.convertAndSend("/notifyConsumption", getPath(ect));
//    }
//
//    private String getPath(EnergyConsumptionTimestamp energyConsumptionTimestamp){
//        return this.entityLinks.linkForItemResource(energyConsumptionTimestamp.getClass(),energyConsumptionTimestamp.getId()).toUri().getPath();
//    }
//}
