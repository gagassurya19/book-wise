package com.tubesbookwise.controller;

import com.tubesbookwise.dto.UserRequestDTO;
import com.tubesbookwise.dto.UserResponseDTO;
import com.tubesbookwise.model.User;
import com.tubesbookwise.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Operation(summary = "Login user", description = "Authenticate the user with username and password")
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Parameter(description = "Username of the user to login", required = true) @RequestParam String username,
            @Parameter(description = "Password of the user to login", required = true) @RequestParam String password) {
        User user = userRepository.authenticate(username, password);
        return ResponseEntity.ok("Login successful for user: " + user.getUsername());
    }

    @Operation(summary = "Create a new user", description = "Create a new user with provided details")
    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setName(userRequestDTO.getName());
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(userRequestDTO.getPassword());
        user.setEmail(userRequestDTO.getEmail());
        user.setRole(User.Role.valueOf(userRequestDTO.getRole().toLowerCase()));

        userRepository.save(user);
        return ResponseEntity.status(201).body("User created successfully");
    }

    @Operation(summary = "Get user by ID", description = "Retrieve user details by ID")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(
            @Parameter(description = "ID of the user to retrieve", required = true) @PathVariable int id) {
        User user = userRepository.findById(id);
        UserResponseDTO response = new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().toString()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get all users", description = "Retrieve all users in the system")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponseDTO> responses = users.stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().toString()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "Update user", description = "Update an existing user by ID")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable int id,
            @Valid @RequestBody UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setId(id);
        user.setName(userRequestDTO.getName());
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(userRequestDTO.getPassword());
        user.setEmail(userRequestDTO.getEmail());
        user.setRole(User.Role.valueOf(userRequestDTO.getRole().toLowerCase()));

        userRepository.update(user);
        return ResponseEntity.ok("User updated successfully");
    }

    @Operation(summary = "Delete user", description = "Delete a user by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @Parameter(description = "ID of the user to delete", required = true) @PathVariable int id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
