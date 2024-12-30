package com.example.demo.config;

import com.example.demo.models.Scores;
import com.example.demo.models.User;
import com.example.demo.other.Role;
import com.example.demo.repositories.ScoresRepository;
import com.example.demo.repositories.UserRepository;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Locale;
import java.util.Random;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService(){
        return username -> userRepository.findByName(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner commandLineRunner(ScoresRepository scoresRepository) {
        return args -> {
            Random random = new Random(98765);
            Faker faker = new Faker(Locale.ENGLISH, random);
            for (int i = 0; i < 5; i++) {
                User user = User.builder()
                        .name(faker.name().firstName())
                        .password(passwordEncoder().encode("password"))
                        .role(Role.USER)
                        .build();
                userRepository.save(user);
            }
            List<User> users = userRepository.findAll();
            List<String> gamesNames = List.of("minesweeper", "whackamole", "memory", "mastermind", "combinations", "solitaire");
            gamesNames.forEach(game -> {
                users.forEach(user -> {
                  for (int i = 0; i < 3; i++) {
                    int score = faker.number().numberBetween(0, 1000000);
                    Scores newScore = new Scores(user.getId(), user.getName(), game, score);
                    scoresRepository.save(newScore);
                  }
                });
            });
        };
    }
}
