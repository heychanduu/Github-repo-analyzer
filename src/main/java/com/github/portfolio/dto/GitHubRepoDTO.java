package com.github.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GitHubRepoDTO {
    private String name;

    @JsonProperty("stargazers_count")
    private int stargazersCount;

    @JsonProperty("forks_count")
    private int forksCount;

    private String language;

    @JsonProperty("html_url")
    private String htmlUrl;

    private String description;
    private List<String> topics;
    private int size;

    @JsonProperty("open_issues_count")
    private int openIssuesCount;

    @JsonProperty("updated_at")
    private String updatedAt;

    @JsonProperty("created_at")
    private String createdAt;

    private boolean fork;

    public GitHubRepoDTO() {
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getStargazersCount() { return stargazersCount; }
    public void setStargazersCount(int stargazersCount) { this.stargazersCount = stargazersCount; }

    public int getForksCount() { return forksCount; }
    public void setForksCount(int forksCount) { this.forksCount = forksCount; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getHtmlUrl() { return htmlUrl; }
    public void setHtmlUrl(String htmlUrl) { this.htmlUrl = htmlUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTopics() { return topics; }
    public void setTopics(List<String> topics) { this.topics = topics; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public int getOpenIssuesCount() { return openIssuesCount; }
    public void setOpenIssuesCount(int openIssuesCount) { this.openIssuesCount = openIssuesCount; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public boolean isFork() { return fork; }
    public void setFork(boolean fork) { this.fork = fork; }
}
