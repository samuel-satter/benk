package com.example.benk.utils;

import java.util.Random;

public class AccountUtils {

    //TODO create separate field to insert fake iban :100:, potentially restructure UserObj
    public static String generateAccountNumber(int range) {
        return String.valueOf(range < 1 ? 0 : new Random()
                .nextInt((9 * (int) Math.pow(10, range - 1)) - 1)
                + (int) Math.pow(10, range - 1));
    }
}
