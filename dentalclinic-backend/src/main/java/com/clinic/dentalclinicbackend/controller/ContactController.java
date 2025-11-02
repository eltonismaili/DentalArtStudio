package com.clinic.dentalclinicbackend.controller;

import com.clinic.dentalclinicbackend.dto.ContactRequest;
import com.clinic.dentalclinicbackend.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendEmail(@Valid @RequestBody ContactRequest contactRequest) {
        emailService.sendContactEmail(contactRequest);
        return ResponseEntity.ok("Email sent successfully");
    }
}
