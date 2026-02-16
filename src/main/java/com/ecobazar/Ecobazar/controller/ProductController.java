package com.ecobazar.Ecobazar.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecobazar.Ecobazar.entity.Product;
import com.ecobazar.Ecobazar.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }


    // Crud

    @PostMapping
    public ResponseEntity<Product> add(@RequestBody Product product) {
        return ResponseEntity.ok(service.addProduct(product));
    }

    @PutMapping
    public ResponseEntity<Product> update(@RequestBody Product product) {
        return ResponseEntity.ok(service.updateProduct(product));
    }

    @GetMapping
    public List<Product> all() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Product> approve(@PathVariable int id) {
        return ResponseEntity.ok(service.approveProduct(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        service.deleteProduct(id);
        return ResponseEntity.ok("Deleted");
    }

    // Search and filter

    @GetMapping("/search")
    public List<Product> search(@RequestParam String name) {
        return service.searchByName(name);
    }

    @GetMapping("/category")
    public List<Product> byCategory(@RequestParam String value) {
        return service.filterByCategory(value);
    }

    @GetMapping("/eco")
    public List<Product> byEco(@RequestParam String rating) {
        return service.filterByEcoRating(rating);
    }

    @GetMapping("/price")
    public List<Product> byPrice(
            @RequestParam double min,
            @RequestParam double max) {
        return service.filterByPrice(min, max);
    }

    @GetMapping("/sort/price")
    public List<Product> sortPrice() {
        return service.sortByPrice();
    }

    @GetMapping("/sort/carbon")
    public List<Product> sortCarbon() {
        return service.sortByCarbonImpact();
    }

    @GetMapping("/eco/friendly")
    public List<Product> ecoFriendly() {
        return service.ecoFriendly();
    }

    @GetMapping("/eco/not-friendly")
    public List<Product> notEcoFriendly() {
        return service.notEcoFriendly();
    }

}