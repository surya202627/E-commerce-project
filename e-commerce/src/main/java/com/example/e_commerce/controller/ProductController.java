package com.example.e_commerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.dto.ProductResponse;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService service;

    private ProductRepository repo;

    ProductController(ProductRepository repo, ProductService service) {

        this.repo = repo;
        this.service = service;

    }


    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String keyword){

        return ResponseEntity.ok(service.searchProducts(keyword));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getProducts() {

        List<ProductResponse> products = repo.findAll()
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getPrice(),
                        p.getImageUrl()))
                .toList();

        return ResponseEntity.ok(products);
    }

    // @GetMapping
    // public ResponseEntity<?> products(){

    //     return ResponseEntity.ok(repo.findAll());
    // }


// @GetMapping
// public String start(){
//     return "server is running";
// }

}

