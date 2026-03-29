package com.example.e_commerce.cart;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.cart.dto.CartItemDTO;
import com.example.e_commerce.cart.dto.CartResponseDTO;
import com.example.e_commerce.entity.Product;
import com.example.e_commerce.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ProductRepository productRepo;

    // ✅ Get or Create Cart
    public Cart getCart(String username) {
        return cartRepo.findByUsername(username)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUsername(username);
                    return cartRepo.save(cart);
                });
    }

    // ✅ Add to Cart
    public Cart addToCart(String username, Long productId) {

        Cart cart = getCart(username);

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(
                    existing.get().getQuantity() + 1);
        } else {
            CartItem item = new CartItem();
            item.setProduct(product);
            item.setQuantity(1);
            item.setCart(cart);

            cart.getItems().add(item);
        }

        return cartRepo.save(cart);
    }

    // ✅ Remove Item
    public Cart removeItem(String username, Long productId) {

        Cart cart = getCart(username);

        cart.getItems().removeIf(
                i -> i.getProduct().getId().equals(productId));

        return cartRepo.save(cart);
    }

    // ✅ Update Quantity
    public Cart updateQty(String username, Long productId, int qty) {

        Cart cart = getCart(username);

        cart.getItems().forEach(item -> {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(qty);
            }
        });

        return cartRepo.save(cart);
    }

    // ✅ View Cart
    public CartResponseDTO viewCart(String username) {
        Cart cart = getCart(username);

        return mapToDTO(cart);
    }

    public CartResponseDTO mapToDTO(Cart cart) {

        CartResponseDTO dto = new CartResponseDTO();
        dto.setId(cart.getId());
        dto.setUsername(cart.getUsername());

        List<CartItemDTO> items = cart.getItems().stream().map(item -> {
            CartItemDTO i = new CartItemDTO();
            i.setId(item.getId());
            i.setProduct(item.getProduct());
            i.setQuantity(item.getQuantity());
            return i;
        }).toList();

        dto.setItems(items);

        return dto;
    }

}
