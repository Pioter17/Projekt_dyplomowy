// package com.example.demo.models;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import jakarta.persistence.*;

// import java.util.ArrayList;
// import java.util.List;

// @Entity
// @Table(name = "director")
// public class Director {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;

//     private String nationality;
//     @OneToMany(mappedBy = "director")
//     @JsonIgnore
//     private List<Movie> movies = new ArrayList<>();

//     private double age;

//     public Director(Long id, String name, String nationality, List<Movie> movies, double age) {
//         this.id = id;
//         this.name = name;
//         this.nationality = nationality;
//         this.movies = movies;
//         this.age = age;
//     }

//     public Director(String name, String nationality, List<Movie> movies, double age) {
//         this.name = name;
//         this.nationality = nationality;
//         this.movies = movies;
//         this.age = age;
//     }

//     public Director() {
//         // Konstruktor bezargumentowy
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getNationality() {
//         return nationality;
//     }

//     public void setNationality(String nationality) {
//         this.nationality = nationality;
//     }

//     public List<Movie> getMovies() {
//         return movies;
//     }

//     public void setMovies(List<Movie> movies) {
//         this.movies = movies;
//     }

//     public double getAge() {
//         return age;
//     }

//     public void setAge(double age) {
//         this.age = age;
//     }
// }
