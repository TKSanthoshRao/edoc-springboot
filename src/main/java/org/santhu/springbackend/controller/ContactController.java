package org.santhu.springbackend.controller;

import org.santhu.springbackend.entity.ContactMessage;
import org.santhu.springbackend.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // This endpoint will handle the contact form submission
    @PostMapping("/contact")
    public String handleContactForm(@RequestBody ContactMessage contactMessage) {
        try {
            contactMessageRepository.save(contactMessage);
            return "Message received successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save the message.";
        }
    }
}
