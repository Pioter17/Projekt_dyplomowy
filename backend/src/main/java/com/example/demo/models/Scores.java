package com.example.demo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "scores")
public class Scores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer userId;
    private String game;
    private Integer score;


    public Scores(Long id, Integer userId, String game, Integer score) {
        this.id = id;
        this.userId = userId;
        this.game = game;
        this.score = score;
    }

    public Scores(Integer userId, String game, Integer score) {
        this.userId = userId;
        this.game = game;
        this.score = score;
    }

    public Scores() {
        // Konstruktor bezargumentowy
    }

//    public Long getId() {
//        return id;
//    }
//    public void setId(Long id) {
//        this.id = id;
//    }
//    public Integer getUserId() {
//        return userId;
//    }
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }
//    public String getGame() {
//        return game;
//    }
//    public void setGame(String game) {
//        this.game = game;
//    }
//    public Integer getScore() {
//        return score;
//    }
//    public void setScore(Integer score) {
//        this.score = score;
//    }
}
