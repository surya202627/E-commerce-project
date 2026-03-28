package com.example.e_commerce.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.cart.dto.CartResponseDTO;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService service;

    // ✅ Add
    @PostMapping("/add")
    public Cart add(@RequestParam Long productId,
                    Authentication auth) {

        String username = auth.getName();
        return service.addToCart(username, productId);
    }

    // ✅ Remove
    @DeleteMapping("/remove")
    public Cart remove(@RequestParam Long productId,
                       Authentication auth) {

        String username = auth.getName();
        return service.removeItem(username, productId);
    }

    // ✅ Update
    @PutMapping("/update")
    public Cart update(@RequestParam Long productId,
                       @RequestParam int qty,
                       Authentication auth) {

        String username = auth.getName();
        return service.updateQty(username, productId, qty);
    }

    // ✅ View Cart
    @GetMapping("/my")
    public CartResponseDTO view(Authentication auth) {

        String username = auth.getName();
        return service.viewCart(username);
    }


   
}
