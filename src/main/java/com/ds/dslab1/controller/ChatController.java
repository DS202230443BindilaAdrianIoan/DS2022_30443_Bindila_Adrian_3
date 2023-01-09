package com.ds.dslab1.controller;

import com.ds.dslab1.dto.ChatMessageDTO;
import com.ds.dslab1.service.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ModelMapper modelMapper = new ModelMapper();
    @Autowired
    ChatService chatService;

    @PostMapping
    public ResponseEntity<?> receive(@RequestBody ChatMessageDTO msg) {
        chatService.sendToUser(msg);
        return ResponseEntity.ok().build();
    }
}
