package com.github.portfolio.controller;

import com.github.portfolio.dto.GitHubRepoDTO;
import com.github.portfolio.dto.GitHubUserDTO;
import com.github.portfolio.service.GitHubService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/github")
public class GitHubProxyController {

    private final GitHubService gitHubService;

    public GitHubProxyController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/users/{username}")
    public GitHubUserDTO getUser(@PathVariable String username) {
        return gitHubService.getUser(username).block();
    }

    @GetMapping("/users/{username}/repos")
    public List<GitHubRepoDTO> getRepos(@PathVariable String username) {
        return gitHubService.getRepos(username).collectList().block();
    }

}
