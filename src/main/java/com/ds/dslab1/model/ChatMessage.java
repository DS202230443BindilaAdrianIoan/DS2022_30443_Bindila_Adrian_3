package com.ds.dslab1.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChatMessage {
    User sender;
    User receiver;
    String message;

}
