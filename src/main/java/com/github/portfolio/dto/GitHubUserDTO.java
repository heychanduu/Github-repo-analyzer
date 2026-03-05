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

    public GitHubUserDTO() {
    }

    public GitHubUserDTO(String login, String name, int publicRepos, int followers, String avatarUrl) {
        this.login = login;
        this.name = name;
        this.publicRepos = publicRepos;
        this.followers = followers;
        this.avatarUrl = avatarUrl;
    }

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
}
