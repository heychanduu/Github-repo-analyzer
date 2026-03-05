package com.github.portfolio.repository;

import com.github.portfolio.model.RepositoryStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryStatsRepository extends JpaRepository<RepositoryStats, Long> {
}
