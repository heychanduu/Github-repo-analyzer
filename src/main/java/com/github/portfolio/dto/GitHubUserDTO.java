package com.github.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GitHubUserDTO {
    private String login;
    private String name;

    @JsonProperty("public_repos")
    private int publicRepos;

    private int followers;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    private String bio;
    private String location;
    private String company;
    private String blog;

    @JsonProperty("twitter_username")
    private String twitterUsername;

    @JsonProperty("created_at")
    private String createdAt;

    public GitHubUserDTO() {
    }

    public GitHubUserDTO(String login, String name, int publicRepos, int followers, String avatarUrl,
            String bio, String location, String company, String blog, String twitterUsername, String createdAt) {
        this.login = login;
        this.name = name;
        this.publicRepos = publicRepos;
        this.followers = followers;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.location = location;
        this.company = company;
        this.blog = blog;
        this.twitterUsername = twitterUsername;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPublicRepos() {
        return publicRepos;
    }

    public void setPublicRepos(int publicRepos) {
        this.publicRepos = publicRepos;
    }

    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getBlog() {
        return blog;
    }

    public void setBlog(String blog) {
        this.blog = blog;
    }

    public String getTwitterUsername() {
        return twitterUsername;
    }

    public void setTwitterUsername(String twitterUsername) {
        this.twitterUsername = twitterUsername;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
