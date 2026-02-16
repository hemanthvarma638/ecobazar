package com.ecobazar.Ecobazar.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecobazar.Ecobazar.entity.Product;
import com.ecobazar.Ecobazar.entity.ProductStatus;
import com.ecobazar.Ecobazar.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }


    // Eco Rating
    private String calculateEcoRating(double carbon) {
        if (carbon <= 20) return "GREEN";
        if (carbon <= 50) return "YELLOW";
        return "RED";
    }


    public Product addProduct(Product product) {
        product.setEcoRating(calculateEcoRating(product.getCarbonImpact()));
        product.setStatus(ProductStatus.PENDING);
        return repo.save(product);
    }


    public Product updateProduct(Product product) {
        product.setEcoRating(calculateEcoRating(product.getCarbonImpact()));
        product.setStatus(ProductStatus.PENDING);
        return repo.save(product);
    }

    //Get all Products
    public List<Product> getAllProducts() {

        String role = SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        if (role.equals("ROLE_USER")) {
            return repo.findByStatus(ProductStatus.APPROVED);
        }

        return repo.findAll();
    }

    //Get By Id
    public Product getProductById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    //Admin Approval
    public Product approveProduct(int id) {
        Product product = getProductById(id);
        product.setStatus(ProductStatus.APPROVED);
        return repo.save(product);
    }

    //Delete Product
    public void deleteProduct(int id) {
        repo.deleteById(id);
    }


    public List<Product> searchByName(String name) {
        return repo.findByNameContainingIgnoreCaseAndStatus(
                name,
                ProductStatus.APPROVED
        );
    }

    public List<Product> filterByCategory(String category) {
        return repo.findByCategoryIgnoreCaseAndStatus(
                category,
                ProductStatus.APPROVED
        );
    }

    public List<Product> filterByEcoRating(String rating) {
        return repo.findByEcoRatingAndStatus(
                rating,
                ProductStatus.APPROVED
        );
    }

    public List<Product> filterByPrice(double min, double max) {
        return repo.findByPriceBetweenAndStatus(
                min,
                max,
                ProductStatus.APPROVED
        );
    }

    public List<Product> sortByPrice() {
        return repo.findAllByStatusOrderByPriceAsc(ProductStatus.APPROVED);
    }

    public List<Product> sortByCarbonImpact() {
        return repo.findAllByStatusOrderByCarbonImpactAsc(ProductStatus.APPROVED);
    }

    public List<Product> ecoFriendly() {
        return repo.findByEcoRatingAndStatus("GREEN", ProductStatus.APPROVED);
    }

    public List<Product> notEcoFriendly() {
        return repo.findByEcoRatingAndStatus("RED", ProductStatus.APPROVED);
    }

}