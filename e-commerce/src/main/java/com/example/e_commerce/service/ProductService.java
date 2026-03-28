package com.example.e_commerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.repository.ProductRepository;

import com.example.e_commerce.entity.Product;

@Service
public class ProductService {
    
    @Autowired
    ProductRepository repo;

    public List<Product> searchProducts(String keyword){

        return repo.findByNameContainingIgnoreCase(keyword);
    }
}
