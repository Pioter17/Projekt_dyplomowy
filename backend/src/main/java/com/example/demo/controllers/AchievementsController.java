package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.other.ServiceResponse;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/achievements")
@CrossOrigin(origins = "http://localhost:4200")
public class AchievementsController {
  private final UserRepository userRepository;
  private final JwtService jwtService;

  @Autowired
  public AchievementsController(UserRepository userRepository, JwtService jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  // Endpoint do pobierania wszystkich osiągnięć
  @GetMapping
  @CrossOrigin(origins = "http://localhost:4200")
  public ServiceResponse<List<Integer>> getAllAchievements(
    HttpServletRequest request) {
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String userName;
    jwt = authHeader.substring(7);
    userName = jwtService.extractUsername(jwt);
    Integer userId;
    if (userRepository.findByName(userName).isPresent()) {
      userId = userRepository.findByName(userName).get().getId();
    } else {
      return new ServiceResponse<>(Collections.emptyList(), false, "No achievements found");
    }

    User user = userRepository.findById(userId).get();

    List<Integer> matchingAchievements = user.getAchievements();
    return new ServiceResponse<>(matchingAchievements, true, "Achievements found");
  }

  // Endpoint do dodawania nowego osiągnięcia
  @PostMapping("/add/{achievementId}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ServiceResponse<Integer> addAchievements(
    HttpServletRequest request
  ) {
    Integer achievementId = Integer.parseInt(request.getRequestURI().split("/")[3]);
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String userName;
    if (Objects.equals(authHeader, "Bearer")) {
      return new ServiceResponse<>(null, false, "Cannot parse item");
    }
    jwt = authHeader.substring(7);
    userName = jwtService.extractUsername(jwt);
    Integer userId;
    if (userRepository.findByName(userName).isPresent()) {
      userId = userRepository.findByName(userName).get().getId();
    } else {
      return new ServiceResponse<>(null, false, "Cannot parse item");
    }

    User user = userRepository.findById(userId)
      .orElseThrow(() -> new IllegalArgumentException("User not found"));

    if (!user.getAchievements().contains(achievementId)) {
      user.getAchievements().add(achievementId);
      userRepository.save(user);
      return new ServiceResponse<>(achievementId, true, "Achievement added");
    }

    return new ServiceResponse<>(null, false, "Cannot parse item");
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
