package com.clinic.dentalclinicbackend.service;

import com.clinic.dentalclinicbackend.dto.ContactRequest;

public interface EmailService {
    public void sendContactEmail(ContactRequest contactRequest);
}
