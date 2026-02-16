package com.ecobazar.Ecobazar.service;



import org.springframework.stereotype.Service;

@Service
public class CarbonCalculationService {

    public String calculateEcoRating(double carbonImpact) {

        if (carbonImpact <= 2.0) {
            return "GREEN";
        }
        else if (carbonImpact <= 5.0) {
            return "YELLOW";
        }
        else {
            return "RED";
        }
    }
}