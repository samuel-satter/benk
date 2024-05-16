package com.example.benk;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BenkApplication {

    public static Dotenv dotenv;

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().load();
        System.out.println("environment loaded ------------------------------> " + dotenv);
        System.out.println("Loaded SECRET_KEY: " + dotenv.get("SECRET_KEY"));
        SpringApplication.run(BenkApplication.class, args);
    }

}
