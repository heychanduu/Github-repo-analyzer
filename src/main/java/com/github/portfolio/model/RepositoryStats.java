package com.github.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "repository_stats")
public class RepositoryStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String repoName;
    private int stars;
    private int forks;
    private String language;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tracked_profile_id")
    private TrackedProfile trackedProfile;

    public RepositoryStats() {
    }

    public RepositoryStats(Long id, String repoName, int stars, int forks, String language,
            TrackedProfile trackedProfile) {
        this.id = id;
        this.repoName = repoName;
        this.stars = stars;
        this.forks = forks;
        this.language = language;
        this.trackedProfile = trackedProfile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRepoName() {
        return repoName;
    }

    public void setRepoName(String repoName) {
        this.repoName = repoName;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public int getForks() {
        return forks;
    }

    public void setForks(int forks) {
        this.forks = forks;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public TrackedProfile getTrackedProfile() {
        return trackedProfile;
    }

    public void setTrackedProfile(TrackedProfile trackedProfile) {
        this.trackedProfile = trackedProfile;
    }
}
