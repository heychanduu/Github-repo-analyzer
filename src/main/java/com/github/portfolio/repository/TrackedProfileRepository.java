package com.github.portfolio.repository;

import com.github.portfolio.model.TrackedProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackedProfileRepository extends JpaRepository<TrackedProfile, Long> {
}
