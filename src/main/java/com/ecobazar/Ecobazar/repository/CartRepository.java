package com.ecobazar.Ecobazar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecobazar.Ecobazar.entity.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByUsername(String username);
}