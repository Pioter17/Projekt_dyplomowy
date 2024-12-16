package com.example.demo.services;

import com.example.demo.models.Scores;
import com.example.demo.other.ServiceResponse;
import com.example.demo.repositories.ScoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScoresService {
    private final ScoresRepository scoresRepository;

    @Autowired
    public ScoresService(ScoresRepository scoresRepository) {
        this.scoresRepository = scoresRepository;
    }

    public ServiceResponse<Scores> addScore(Scores scores) {
        if (scores.getId() != null) {
            Optional<Scores> scoresById = scoresRepository.findById(scores.getId());
            if (scoresById.isPresent()) {
                return new ServiceResponse<>(null, false, "Scores is already in db");
            }
        }
        try {
            scoresRepository.save(scores);
            return new ServiceResponse<>(scores, true, "Scores added");
        } catch (Exception e) {
            System.out.println(e);
            return new ServiceResponse<>(null, false, "Error during adding scores");
        }
    }
}
