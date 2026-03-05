package com.github.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GitHubConfig {

    @Value("${github.api.url:https://api.github.com}")
    private String githubApiUrl;

    @Bean
    public WebClient webClient() {
        WebClient.Builder builder = WebClient.builder()
                .baseUrl(githubApiUrl)
                .defaultHeader("Accept", "application/vnd.github.v3+json")
                .defaultHeader("User-Agent", "GitHubPortfolioAnalyzer");

        return builder.build();
    }
}
