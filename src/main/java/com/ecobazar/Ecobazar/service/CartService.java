package com.ecobazar.Ecobazar.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecobazar.Ecobazar.entity.CartItem;
import com.ecobazar.Ecobazar.entity.Product;
import com.ecobazar.Ecobazar.entity.ProductStatus;
import com.ecobazar.Ecobazar.repository.CartRepository;
import com.ecobazar.Ecobazar.repository.ProductRepository;

@Service
public class CartService {

    private final CartRepository cartRepo;
    private final ProductRepository productRepo;

    public CartService(CartRepository cartRepo, ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    private String currentUser() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    // Add to cart
    public void add(int productId) {
        String username = currentUser();

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));


        if (product.getStatus() != ProductStatus.APPROVED) {
            throw new RuntimeException("Product pending admin approval");
        }

        CartItem item = cartRepo.findByUsername(username).stream()
                .filter(ci -> ci.getProduct().getId() == productId)
                .findFirst()
                .orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + 1);
            cartRepo.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setUsername(username);
            newItem.setProduct(product);
            newItem.setQuantity(1);
            cartRepo.save(newItem);
        }
    }

    public List<CartItem> getItems() {
        return cartRepo.findByUsername(currentUser());
    }

    public void updateQuantity(int itemId, int qty) {
        CartItem item = cartRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (qty <= 0) {
            cartRepo.delete(item);
        } else {
            item.setQuantity(qty);
            cartRepo.save(item);
        }
    }

    public void remove(int itemId) {
        cartRepo.deleteById(itemId);
    }
}