package com.algomaginix.backend.controller;

import com.algomaginix.backend.model.AppUser;
import com.algomaginix.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    @PostMapping("/register")
    public AppUser registerUser(@RequestBody AppUser user) {
        return userRepository.save(user);
    }

    // Get all registered users
    @GetMapping
    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }
}
