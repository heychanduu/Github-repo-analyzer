package com.github.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GitHubRepoDTO {
    private String name;

    @JsonProperty("stargazers_count")
    private int stargazersCount;

    @JsonProperty("forks_count")
    private int forksCount;

    private String language;

    @JsonProperty("html_url")
    private String htmlUrl;

    public GitHubRepoDTO() {
    }

    public GitHubRepoDTO(String name, int stargazersCount, int forksCount, String language, String htmlUrl) {
        this.name = name;
        this.stargazersCount = stargazersCount;
        this.forksCount = forksCount;
        this.language = language;
        this.htmlUrl = htmlUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStargazersCount() {
        return stargazersCount;
    }

    public void setStargazersCount(int stargazersCount) {
        this.stargazersCount = stargazersCount;
    }

    public int getForksCount() {
        return forksCount;
    }

    public void setForksCount(int forksCount) {
        this.forksCount = forksCount;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getHtmlUrl() {
        return htmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }
}
