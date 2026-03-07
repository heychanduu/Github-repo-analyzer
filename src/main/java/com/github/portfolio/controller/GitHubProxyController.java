package com.github.portfolio.controller;

import com.github.portfolio.dto.GitHubRepoDTO;
import com.github.portfolio.dto.GitHubUserDTO;
import com.github.portfolio.service.GitHubService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/github")
public class GitHubProxyController {

    private final GitHubService gitHubService;

    // Simple In-Memory Caches to avoid GitHub API rate limits (60 req/hr
    // unauthenticated)
    private final Map<String, GitHubUserDTO> userCache = new ConcurrentHashMap<>();
    private final Map<String, List<GitHubRepoDTO>> repoCache = new ConcurrentHashMap<>();

    public GitHubProxyController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/users/{username}")
    public GitHubUserDTO getUser(@PathVariable String username) {
        String key = username.toLowerCase();
        if (userCache.containsKey(key)) {
            return userCache.get(key);
        }
        GitHubUserDTO user = gitHubService.getUser(username).block();
        if (user != null) {
            userCache.put(key, user);
        }
        return user;
    }

    @GetMapping("/users/{username}/repos")
    public List<GitHubRepoDTO> getRepos(@PathVariable String username) {
        String key = username.toLowerCase();
        if (repoCache.containsKey(key)) {
            return repoCache.get(key);
        }
        List<GitHubRepoDTO> repos = gitHubService.getRepos(username).collectList().block();
        if (repos != null) {
            repoCache.put(key, repos);
        }
        return repos;
    }

}
