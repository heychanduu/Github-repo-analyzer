import React from 'react';

const RepoInsights = ({ repos }) => {
    if (!repos || repos.length === 0) return null;

    const originalRepos = repos.filter(r => !r.fork);
    const forkedRepos = repos.filter(r => r.fork);

    // Health Score: weighted formula based on stars, forks, recency, issues
    const calculateHealth = (repo) => {
        const starScore = Math.min(repo.stargazers_count * 10, 40);
        const forkScore = Math.min(repo.forks_count * 5, 20);
        const now = new Date();
        const updated = new Date(repo.updated_at);
        const daysSinceUpdate = (now - updated) / (1000 * 60 * 60 * 24);
        const recencyScore = daysSinceUpdate < 30 ? 25 : daysSinceUpdate < 90 ? 15 : daysSinceUpdate < 365 ? 8 : 2;
        const issueScore = repo.open_issues_count > 10 ? 0 : repo.open_issues_count > 5 ? 5 : 15;
        return Math.min(Math.round(starScore + forkScore + recencyScore + issueScore), 100);
    };

    const avgHealth = Math.round(originalRepos.reduce((acc, r) => acc + calculateHealth(r), 0) / (originalRepos.length || 1));
    const avgSizeMB = (repos.reduce((acc, r) => acc + (r.size || 0), 0) / repos.length / 1024).toFixed(1);

    // Most active month
    const monthCounts = {};
    repos.forEach(r => {
        if (r.updated_at) {
            const month = new Date(r.updated_at).toLocaleString('default', { month: 'short', year: 'numeric' });
            monthCounts[month] = (monthCounts[month] || 0) + 1;
        }
    });
    const mostActiveMonth = Object.entries(monthCounts).sort(([, a], [, b]) => b - a)[0];

    // Health color
    const getHealthColor = (score) => {
        if (score >= 70) return '#10b981';
        if (score >= 40) return '#f59e0b';
        return '#ef4444';
    };

    const insightCards = [
        {
            label: 'Avg Health Score',
            value: `${avgHealth}%`,
            color: getHealthColor(avgHealth),
            icon: '💪'
        },
        {
            label: 'Original Repos',
            value: originalRepos.length,
            sub: `${forkedRepos.length} forked`,
            icon: '📦'
        },
        {
            label: 'Avg Repo Size',
            value: `${avgSizeMB} MB`,
            icon: '📊'
        },
        {
            label: 'Most Active',
            value: mostActiveMonth ? mostActiveMonth[0] : 'N/A',
            sub: mostActiveMonth ? `${mostActiveMonth[1]} repos` : '',
            icon: '🔥'
        }
    ];

    return (
        <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🔍 Repository Insights
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {insightCards.map((card, i) => (
                    <div
                        key={card.label}
                        className="glass-card"
                        style={{
                            padding: '1.25rem',
                            animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
                        <div style={{
                            fontSize: '1.75rem',
                            fontWeight: '800',
                            color: card.color || 'var(--text-primary)',
                            marginBottom: '0.25rem',
                            fontFamily: 'var(--font-mono)'
                        }}>
                            {card.value}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {card.label}
                        </div>
                        {card.sub && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', opacity: 0.7 }}>
                                {card.sub}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Fork Ratio Bar */}
            <div className="glass-card" style={{ padding: '1.25rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '500' }}>Original vs Forked</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {originalRepos.length} / {forkedRepos.length}
                    </span>
                </div>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{
                        width: `${(originalRepos.length / repos.length) * 100}%`,
                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                        borderRadius: '5px 0 0 5px',
                        transition: 'width 1s ease',
                        animation: 'growWidth 1s ease'
                    }}></div>
                    <div style={{
                        width: `${(forkedRepos.length / repos.length) * 100}%`,
                        background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                        borderRadius: '0 5px 5px 0',
                        transition: 'width 1s ease',
                        animation: 'growWidth 1s ease'
                    }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                        Original
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }}></span>
                        Forked
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RepoInsights;
