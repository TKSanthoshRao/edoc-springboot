package org.santhu.springbackend.controller;

import org.santhu.springbackend.entity.Doctor;
import org.santhu.springbackend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/doctors")
//@CrossOrigin(origins = "*") // Update for security
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
}
