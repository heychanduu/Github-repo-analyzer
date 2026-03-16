package com.github.portfolio.controller;

import com.github.portfolio.dto.GitHubRepoDTO;
import com.github.portfolio.dto.GitHubUserDTO;
import com.github.portfolio.service.GitHubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping({"/api/github", "/github"})
public class GitHubProxyController {

    private final GitHubService gitHubService;

    // Simple In-Memory Caches to avoid GitHub API rate limits (60 req/hr unauthenticated)
    private final Map<String, GitHubUserDTO> userCache = new ConcurrentHashMap<>();
    private final Map<String, List<GitHubRepoDTO>> repoCache = new ConcurrentHashMap<>();

    public GitHubProxyController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        String key = username.toLowerCase();
        if (userCache.containsKey(key)) {
            return ResponseEntity.ok(userCache.get(key));
        }
        try {
            GitHubUserDTO user = gitHubService.getUser(username).block();
            if (user != null) {
                userCache.put(key, user);
            }
            return ResponseEntity.ok(user);
        } catch (WebClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    Map.of("error", e.getStatusText(), "status", e.getStatusCode().value()));
        } catch (Exception e) {
            // Check if the cause is a WebClientResponseException
            Throwable cause = e.getCause();
            if (cause instanceof WebClientResponseException wcre) {
                return ResponseEntity.status(wcre.getStatusCode()).body(
                        Map.of("error", wcre.getStatusText(), "status", wcre.getStatusCode().value()));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of("error", "Failed to fetch user data", "status", 500));
        }
    }

    @GetMapping("/users/{username}/repos")
    public ResponseEntity<?> getRepos(@PathVariable String username) {
        String key = username.toLowerCase();
        if (repoCache.containsKey(key)) {
            return ResponseEntity.ok(repoCache.get(key));
        }
        try {
            List<GitHubRepoDTO> repos = gitHubService.getRepos(username).collectList().block();
            if (repos != null) {
                repoCache.put(key, repos);
            }
            return ResponseEntity.ok(repos);
        } catch (WebClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    Map.of("error", e.getStatusText(), "status", e.getStatusCode().value()));
        } catch (Exception e) {
            Throwable cause = e.getCause();
            if (cause instanceof WebClientResponseException wcre) {
                return ResponseEntity.status(wcre.getStatusCode()).body(
                        Map.of("error", wcre.getStatusText(), "status", wcre.getStatusCode().value()));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of("error", "Failed to fetch repos", "status", 500));
        }
    }
}
