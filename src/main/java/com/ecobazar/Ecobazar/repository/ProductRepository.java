package com.ecobazar.Ecobazar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecobazar.Ecobazar.entity.Product;
import com.ecobazar.Ecobazar.entity.ProductStatus;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    // User view

    List<Product> findByStatus(ProductStatus status);

    //Search

    List<Product> findByNameContainingIgnoreCaseAndStatus(
            String name,
            ProductStatus status
    );

    // Filters

    List<Product> findByCategoryIgnoreCaseAndStatus(
            String category,
            ProductStatus status
    );

    List<Product> findByEcoRatingAndStatus(
            String ecoRating,
            ProductStatus status
    );

    List<Product> findByPriceBetweenAndStatus(
            double min,
            double max,
            ProductStatus status
    );

    // Sort

    List<Product> findAllByStatusOrderByPriceAsc(ProductStatus status);

    List<Product> findAllByStatusOrderByCarbonImpactAsc(ProductStatus status);




    @Query("""
           SELECT p FROM Product p
           WHERE p.ecoRating = :ecoRating
           AND p.status = :status
           """)
    List<Product> findByEcoRatingAndStatus1(
            @Param("ecoRating") String ecoRating,
            @Param("status") ProductStatus status
    );

    // Rating

    List<Product> findByRatingGreaterThanEqualAndStatus(
            double rating,
            ProductStatus status
    );
}