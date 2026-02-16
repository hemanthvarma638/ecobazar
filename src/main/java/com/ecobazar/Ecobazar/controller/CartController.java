
package com.ecobazar.Ecobazar.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.infosys.ecobazar.Ecobazar.entity.Cart;
//import com.infosys.ecobazar.Ecobazar.repository.CartRepository;



//import java.util.List;

//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;

import com.ecobazar.Ecobazar.entity.CartItem;
import com.ecobazar.Ecobazar.service.CartService;

@RestController
@RequestMapping("/cart")
@PreAuthorize("hasRole('USER')")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{productId}")
    public void addToCart(@PathVariable int productId) {
        cartService.add(productId);
    }

    @GetMapping
    public List<CartItem> getCart() {
        return cartService.getItems();
    }

    @PutMapping("/{itemId}/{qty}")
    public void updateQty(@PathVariable int itemId, @PathVariable int qty) {
        cartService.updateQuantity(itemId, qty);
    }

    @DeleteMapping("/{itemId}")
    public void remove(@PathVariable int itemId) {
        cartService.remove(itemId);
    }
}