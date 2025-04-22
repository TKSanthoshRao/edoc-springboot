package org.santhu.springbackend.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialty;
    private int experience;
    private double ratings;
    private int patients;

    // No-argument constructor (required by JPA)
    public Doctor() {
    }

    // All-argument constructor (excluding id for new entities)
    public Doctor(String name, String specialty, int experience, double ratings, int patients) {
        this.name = name;
        this.specialty = specialty;
        this.experience = experience;
        this.ratings = ratings;
        this.patients = patients;
    }

    // All-argument constructor (including id)
    public Doctor(Long id, String name, String specialty, int experience, double ratings, int patients) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.experience = experience;
        this.ratings = ratings;
        this.patients = patients;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public double getRatings() {
        return ratings;
    }

    public void setRatings(double ratings) {
        this.ratings = ratings;
    }

    public int getPatients() {
        return patients;
    }

    public void setPatients(int patients) {
        this.patients = patients;
    }

}

