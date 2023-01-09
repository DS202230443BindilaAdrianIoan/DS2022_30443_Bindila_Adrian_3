package com.ds.dslab1.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChatMessageDTO {
    Long senderId;
    Long receiverId;
    String text;
}
