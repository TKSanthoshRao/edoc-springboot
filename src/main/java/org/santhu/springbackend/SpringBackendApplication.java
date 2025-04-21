package org.santhu.springbackend;

import org.santhu.springbackend.entity.Doctor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.santhu.springbackend.repository.DoctorRepository;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner loadDoctors(DoctorRepository doctorRepository) {
		return args -> {
			if (doctorRepository.count() == 0) { // Avoid duplicate inserts
				doctorRepository.save(new Doctor(null, "Dr. Arjun Sharma", "Cardiologist", 15, 4.9, 1500));
				doctorRepository.save(new Doctor(null, "Dr. Priya Patel", "Dermatologist", 8, 4.7, 1200));
				doctorRepository.save(new Doctor(null, "Dr. Vikram Singh", "Neurologist", 12, 4.8, 950));
				doctorRepository.save(new Doctor(null, "Dr. Neha Verma", "Pediatrician", 10, 4.9, 2000));
			}
		};
	}
}
