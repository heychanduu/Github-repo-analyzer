package com.github.portfolio.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tracked_profile")
public class TrackedProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String githubUsername;

    private LocalDateTime lastUpdated;

    @OneToMany(mappedBy = "trackedProfile", cascade = CascadeType.ALL)
    private List<RepositoryStats> repositoryStats;

    public TrackedProfile() {
    }

    public TrackedProfile(Long id, String githubUsername, LocalDateTime lastUpdated,
            List<RepositoryStats> repositoryStats) {
        this.id = id;
        this.githubUsername = githubUsername;
        this.lastUpdated = lastUpdated;
        this.repositoryStats = repositoryStats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public List<RepositoryStats> getRepositoryStats() {
        return repositoryStats;
    }

    public void setRepositoryStats(List<RepositoryStats> repositoryStats) {
        this.repositoryStats = repositoryStats;
    }
}
