package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
//        List<User> findByNameContaining(String nameFragment);

    Optional<User> findById(Integer id);
    Optional<User> findByName(String name);
}
