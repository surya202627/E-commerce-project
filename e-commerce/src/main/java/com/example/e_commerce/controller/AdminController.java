package com.example.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.dto.AuthRequest;
import com.example.e_commerce.entity.User;
import com.example.e_commerce.repository.UserRepository;


@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    UserRepository repo;

    @Autowired
    BCryptPasswordEncoder encoder;


    @GetMapping

    public String startServer(){
        return "welcome admin";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id){

       repo.findById(id).orElseThrow(()-> new RuntimeException("User not found9999"));

       repo.deleteById(id);

       return ResponseEntity.status(200).body("user deleted successfully "+id);
    }


  @PostMapping()
  public ResponseEntity<String> addUser(@RequestBody AuthRequest newUser ){

    if(repo.findByUsername(newUser.getUsername()).isPresent()){

        return ResponseEntity.status(403).body("The username already exists");
    }

    String password = encoder.encode(newUser.getPassword());
    User user = new User(newUser.getUsername(),password,"ROLE_USER");

    repo.save(user);

    return ResponseEntity.status(200).body("User added successfully");
  
 }    
}
