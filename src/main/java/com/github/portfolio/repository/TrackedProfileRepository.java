package com.github.portfolio.repository;

import com.github.portfolio.model.TrackedProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrackedProfileRepository extends JpaRepository<TrackedProfile, Long> {
    List<TrackedProfile> findByUserId(Long userId);
}
