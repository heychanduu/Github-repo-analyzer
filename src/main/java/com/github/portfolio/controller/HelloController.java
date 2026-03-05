package com.github.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from GitHub Portfolio Analyzer!";
    }

    @GetMapping("/api/demo")
    public String demo() {
        return "This is a protected endpoint!";
    }
}
