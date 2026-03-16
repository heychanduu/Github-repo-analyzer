package com.github.portfolio.service;

import com.github.portfolio.dto.GitHubRepoDTO;
import com.github.portfolio.dto.GitHubUserDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GitHubService {

    private final WebClient webClient;

    public GitHubService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<GitHubUserDTO> getUser(String username) {
        return webClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .bodyToMono(GitHubUserDTO.class);
    }

    public Flux<GitHubRepoDTO> getRepos(String username) {
        return webClient.get()
                .uri("/users/{username}/repos?per_page=100&sort=updated", username)
                .retrieve()
                .bodyToFlux(GitHubRepoDTO.class);
    }
}
