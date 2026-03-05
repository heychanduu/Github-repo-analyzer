package com.github.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GitHubConfig {

    @Value("${github.api.url:https://api.github.com}")
    private String githubApiUrl;

    @Value("${github.api.token:#{null}}")
    private String githubApiToken;

    @Bean
    public WebClient webClient() {
        WebClient.Builder builder = WebClient.builder()
                .baseUrl(githubApiUrl)
                .defaultHeader("Accept", "application/vnd.github.v3+json")
                .defaultHeader("User-Agent", "GitHubPortfolioAnalyzer");

        String maskedToken = (githubApiToken != null && githubApiToken.length() > 4)
                ? githubApiToken.substring(0, 4) + "****"
                : "null";
        System.out.println("GitHubConfig: githubApiToken = '" + maskedToken + "'");
        if (githubApiToken != null && !githubApiToken.trim().isEmpty() && !"null".equals(githubApiToken)) {
            System.out.println("GitHubConfig: Adding Authorization header");
            builder.defaultHeader("Authorization", "Bearer " + githubApiToken);
        } else {
            System.out.println("GitHubConfig: Skipping Authorization header");
        }

        return builder.build();
    }
}
