package com.example.demo.repositories;
import com.example.demo.models.Scores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoresRepository extends JpaRepository<Scores, Long> {
    List<Scores> findByGameContaining(String nameFragment);
}
