import React from 'react';

const getLanguageColor = (lang) => {
    const colors = {
        JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
        Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d',
        C: '#555555', 'C#': '#178600', PHP: '#4F5D95', Ruby: '#701516',
        Go: '#00ADD8', Rust: '#dea584', Swift: '#F05138', Kotlin: '#A97BFF',
        Dart: '#00B4AB', Shell: '#89e051', Vue: '#41b883', Jupyter: '#DA5B0B'
    };
    return colors[lang] || '#6366f1';
};

const timeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
};

const ActivityTimeline = ({ repos }) => {
    if (!repos || repos.length === 0) return null;

    const recentRepos = [...repos]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 8);

    return (
        <div className="glass-card animate-fade-in-up" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚡ Recent Activity
            </h3>
            <div>
                {recentRepos.map((repo, index) => (
                    <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-item"
                        style={{
                            textDecoration: 'none', color: 'inherit',
                            animation: `fadeIn 0.4s ease ${index * 0.05}s both`
                        }}
                    >
                        <div
                            className="timeline-dot"
                            style={{
                                backgroundColor: getLanguageColor(repo.language),
                                color: getLanguageColor(repo.language)
                            }}
                        ></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--accent-color)' }}>{repo.name}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                    {timeAgo(repo.updated_at)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {repo.language && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLanguageColor(repo.language), display: 'inline-block' }}></span>
                                        {repo.language}
                                    </span>
                                )}
                                <span>⭐ {repo.stargazers_count}</span>
                                {repo.fork && <span style={{ color: 'var(--warning-color)', fontSize: '0.7rem' }}>fork</span>}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimeline;
