package com.example.demo.controllers;

import com.example.demo.dtos.ScoresDTO;
import com.example.demo.models.Scores;
import com.example.demo.other.ServiceResponse;
import com.example.demo.repositories.ScoresRepository;
import com.example.demo.services.ScoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/scores")
@CrossOrigin(origins = "http://localhost:4200")
public class ScoresController {
    private final ScoresRepository scoresRepository;

    private final ScoresService scoresService;

    @Autowired
    public ScoresController(ScoresRepository scoresRepository, ScoresService scoresService){
        this.scoresRepository = scoresRepository;
        this.scoresService = scoresService;
    }

    // Endpoint do pobierania wszystkich wyników
    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Scores> getAllScores() {
        return scoresRepository.findAll();
    }

    // Endpoint do pobierania wyników z danej gry
    @GetMapping("/best")
    public ResponseEntity<List<Scores>> searchScores(@RequestParam("game") String gameName) {
        List<Scores> allScores = scoresRepository.findAll();

        List<Scores> matchingScores = allScores
          .stream()
          .filter(score -> score.getGame().equalsIgnoreCase(gameName))
          .sorted(Comparator.comparing(Scores::getScore).reversed())
          .collect(Collectors.toList());

        if (matchingScores.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        } else {
            return ResponseEntity.ok(matchingScores);
        }
    }

  @GetMapping("/personal")
  public ResponseEntity<List<Scores>> searchPlayerScores(
    @RequestParam("game") String gameName,
    @RequestParam("userId") Integer userId
  ) {
    List<Scores> allScores = scoresRepository.findAll();

    List<Scores> matchingScores = allScores
      .stream()
      .filter(score -> score.getGame().equalsIgnoreCase(gameName) && score.getUserId().equals(userId))
      .sorted(Comparator.comparing(Scores::getScore).reversed())
      .collect(Collectors.toList());

    if (matchingScores.isEmpty()) {
      return ResponseEntity.ok(Collections.emptyList());
    } else {
      return ResponseEntity.ok(matchingScores);
    }
  }

    // Endpoint do dodawania nowego wyniku
    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ServiceResponse<Scores> addScore(@RequestBody ScoresDTO ScoresDTO) {
        Scores scoreToAdd;
        try{
            scoreToAdd = new Scores(ScoresDTO.getUserId(), ScoresDTO.getGame(), ScoresDTO.getScore());
        } catch (Exception e) {
            return new ServiceResponse<Scores>(null,false,"Cannot parse item");
        }
        if (scoreToAdd.getUserId() == null || scoreToAdd.getGame() == null || scoreToAdd.getScore() == null) {
            return new ServiceResponse<>(null, false, "Body is missing");
        }
        return scoresService.addScore(scoreToAdd);
    }

    // Endpoint do usuwania wyniku po ID
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> deleteScores(@PathVariable Long id) {
        Optional<Scores> optionalScores = scoresRepository.findById(id);
        if (optionalScores.isPresent()) {
            scoresRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
