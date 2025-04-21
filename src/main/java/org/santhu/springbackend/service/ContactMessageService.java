package org.santhu.springbackend.service;

import org.santhu.springbackend.entity.ContactMessage;
import java.util.List;

public interface ContactMessageService {
    List<ContactMessage> getAllMessages();
    ContactMessage saveMessage(ContactMessage message);
}
