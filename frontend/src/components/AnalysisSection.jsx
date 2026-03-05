import React from 'react';

const AnalysisSection = ({ repos }) => {
    if (!repos || repos.length === 0) return null;

    // 1. Calculate Aggregate Stats
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    // 2. Language Breakdown
    const languageCounts = {};
    let totalLanguages = 0;

    repos.forEach(repo => {
        if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            totalLanguages++;
        }
    });

    const languageStats = Object.entries(languageCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([lang, count]) => ({
            lang,
            count,
            percentage: ((count / totalLanguages) * 100).toFixed(1)
        }));

    // 3. Top Repository
    const topRepo = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

    return (
        <div className="animate-fade-in" style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Portfolio Analysis</h3>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={cardStyle}>
                    <div style={labelStyle}>Total Stars</div>
                    <div style={valueStyle}>⭐ {totalStars}</div>
                </div>
                <div style={cardStyle}>
                    <div style={labelStyle}>Total Forks</div>
                    <div style={valueStyle}>🍴 {totalForks}</div>
                </div>
                <div style={cardStyle}>
                    <div style={labelStyle}>Top Language</div>
                    <div style={valueStyle}>{languageStats[0]?.lang || 'N/A'}</div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Language Breakdown Chart */}
                <div style={{ ...cardStyle, flex: '1 1 300px' }}>
                    <h4 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Language Breakdown</h4>
                    {languageStats.map((stat) => (
                        <div key={stat.lang} style={{ marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                <span>{stat.lang}</span>
                                <span>{stat.percentage}%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${stat.percentage}%`, height: '100%', background: 'var(--accent-color)', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Crown Jewel Repo */}
                {topRepo && (
                    <div style={{ ...cardStyle, flex: '1 1 300px', borderColor: 'var(--accent-color)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}>
                        <h4 style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>👑 Crown Jewel</h4>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{topRepo.name}</div>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <span>⭐ {topRepo.stargazers_count}</span>
                            <span>🍴 {topRepo.forks_count}</span>
                        </div>
                        <a href={topRepo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                            View Project
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

const cardStyle = {
    background: 'var(--glass-bg)',
    border: 'var(--glass-border)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: 'var(--glass-shadow)',
};

const labelStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
};

const valueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
};

export default AnalysisSection;
