package com.example.e_commerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.entity.Product;
import com.example.e_commerce.repository.ProductRepository;



@RestController()
@RequestMapping("/api/admin/product")
public class Products {
    

    private ProductRepository repo;

    Products(ProductRepository repo){
        this.repo = repo;
    }

    @PostMapping("/bulk")
    public ResponseEntity<String> insertProducts(@RequestBody List<Product> products){

        repo.saveAll(products);

        return ResponseEntity.status(200).body("Products inserted successfully");
    }

    @PostMapping()
    public ResponseEntity<String> insertProduct(@RequestBody Product product){

        
        repo.save(product);
        
        return ResponseEntity.status(200).body("product inserted successfully");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id){

        repo.deleteById(id);

        return ResponseEntity.status(200).body("Item deleted successfully");
    }
}
