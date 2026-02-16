package com.ecobazar.Ecobazar.entity;

import com.ecobazar.Ecobazar.entity.ProductStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String category;
    private double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status ;

    private double carbonImpact;
    private boolean ecoCertified;
    private Long sellerId;
    private String ecoRating;
    private String imageUrl;

    private double rating; // 1.0 to 5.0

    // getters & setters

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }




    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }

    public double getCarbonImpact() { return carbonImpact; }
    public void setCarbonImpact(double carbonImpact) { this.carbonImpact = carbonImpact; }

    public boolean isEcoCertified() { return ecoCertified; }
    public void setEcoCertified(boolean ecoCertified) { this.ecoCertified = ecoCertified; }

    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }

    public String getEcoRating() { return ecoRating; }
    public void setEcoRating(String ecoRating) { this.ecoRating = ecoRating; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}