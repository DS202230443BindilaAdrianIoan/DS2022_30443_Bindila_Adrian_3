package com.ds.dslab1.service;

import com.ds.dslab1.dto.ChatMessageDTO;
import com.ds.dslab1.model.NotificationMessage;
import com.ds.dslab1.model.User;
import com.ds.dslab1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendToUser(ChatMessageDTO msg) {
        User receiver = userRepository.findById(msg.getReceiverId()).orElseThrow();
        simpMessagingTemplate.convertAndSendToUser(receiver.getUsername(), "/chat", msg);
    }
}
