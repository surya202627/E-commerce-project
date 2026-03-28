package com.example.e_commerce.order;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.cart.Cart;
import com.example.e_commerce.cart.CartItem;
import com.example.e_commerce.cart.CartRepository;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    public String placeOrder(Long cartId) {

        // 1. Get Cart
        Cart cart = cartRepository.findById(cartId).orElseThrow();

        // 2. Create Order
        Order order = new Order();
        order.setUserId(cart.getId());
        order.setStatus("PLACED");

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        // 3. Convert CartItems → OrderItems
        for (CartItem ci : cart.getItems()) {

            OrderItem oi = new OrderItem();
            oi.setProductName(ci.getProduct().getName());
            oi.setQuantity(ci.getQuantity());

            oi.setOrder(order);   // link

            orderItems.add(oi);

            // calculate total (example)
            total += ci.getQuantity() * 1000; // dummy price
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        // 4. Save Order
        orderRepository.save(order);

        // 5. Clear Cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return "Order Placed Successfully";
    }
}