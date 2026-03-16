import React, { useEffect, useRef } from 'react';

const AnalysisSection = ({ repos }) => {
    if (!repos || repos.length === 0) return null;

    // 1. Aggregate Stats
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
    const totalIssues = repos.reduce((acc, r) => acc + (r.open_issues_count || 0), 0);
    const totalSizeMB = (repos.reduce((acc, r) => acc + (r.size || 0), 0) / 1024).toFixed(1);

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
            lang, count,
            percentage: ((count / totalLanguages) * 100).toFixed(1)
        }));

    // 3. Crown Jewel (excluding forks)
    const topRepo = [...repos].filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

    // 4. Donut chart segments
    const buildDonutGradient = () => {
        let accumulated = 0;
        const segments = languageStats.map(stat => {
            const start = accumulated;
            accumulated += parseFloat(stat.percentage);
            return `${getLanguageColor(stat.lang)} ${start}% ${accumulated}%`;
        });
        return `conic-gradient(${segments.join(', ')})`;
    };

    const stats = [
        { label: 'Total Stars', value: totalStars, icon: '⭐' },
        { label: 'Total Forks', value: totalForks, icon: '🍴' },
        { label: 'Open Issues', value: totalIssues, icon: '⚠️' },
        { label: 'Total Size', value: `${totalSizeMB} MB`, icon: '💾' },
        { label: 'Languages', value: languageStats.length, icon: '🌐' },
    ];

    return (
        <div className="animate-fade-in-up" style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                📊 Portfolio Analysis
            </h3>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="glass-card"
                        style={{
                            padding: '1.25rem',
                            textAlign: 'center',
                            animation: `fadeIn 0.4s ease ${i * 0.08}s both`
                        }}
                    >
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                            {stat.label}
                        </div>
                        <div style={{
                            fontSize: '1.75rem',
                            fontWeight: '800',
                            fontFamily: 'var(--font-mono)',
                            animation: 'countUp 0.5s ease both',
                            animationDelay: `${i * 0.1}s`
                        }}>
                            {stat.icon} {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Language Breakdown + Donut + Crown Jewel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                {/* Language Bars */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1.25rem', fontWeight: '700', fontSize: '1rem' }}>Language Breakdown</h4>
                    {languageStats.slice(0, 8).map((stat, i) => (
                        <div key={stat.lang} style={{ marginBottom: '0.875rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                                <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: getLanguageColor(stat.lang), display: 'inline-block', boxShadow: `0 0 6px ${getLanguageColor(stat.lang)}` }}></span>
                                    {stat.lang}
                                </span>
                                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{stat.percentage}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${stat.percentage}%`,
                                    height: '100%',
                                    background: `linear-gradient(90deg, ${getLanguageColor(stat.lang)}, ${getLanguageColor(stat.lang)}88)`,
                                    borderRadius: '3px',
                                    boxShadow: `0 0 8px ${getLanguageColor(stat.lang)}40`,
                                    animation: `growWidth 0.8s ease ${i * 0.1}s both`
                                }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Donut + Crown Jewel Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Donut Chart */}
                    {languageStats.length > 0 && (
                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div className="donut-chart" style={{ background: buildDonutGradient() }}>
                                <div className="donut-center">
                                    <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{languageStats.length}</div>
                                    <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Languages</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {languageStats.slice(0, 5).map(stat => (
                                    <div key={stat.lang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getLanguageColor(stat.lang), display: 'inline-block' }}></span>
                                        <span style={{ color: 'var(--text-secondary)' }}>{stat.lang}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginLeft: 'auto' }}>{stat.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Crown Jewel */}
                    {topRepo && (
                        <div className="glass-card" style={{
                            padding: '1.5rem',
                            animation: 'goldenShimmer 3s ease-in-out infinite',
                            borderColor: 'rgba(234, 179, 8, 0.4)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                            <h4 style={{ marginBottom: '0.75rem', fontWeight: '700', color: '#eab308', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                👑 Crown Jewel
                            </h4>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{topRepo.name}</div>
                            {topRepo.description && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {topRepo.description}
                                </p>
                            )}
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                <span>⭐ {topRepo.stargazers_count}</span>
                                <span>🍴 {topRepo.forks_count}</span>
                                {topRepo.language && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLanguageColor(topRepo.language), display: 'inline-block' }}></span>
                                    {topRepo.language}
                                </span>}
                            </div>
                            <a href={topRepo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                                View Project →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Language Color Map
const getLanguageColor = (lang) => {
    const colors = {
        JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
        Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d',
        C: '#555555', 'C#': '#178600', PHP: '#4F5D95', Ruby: '#701516',
        Go: '#00ADD8', Rust: '#dea584', Swift: '#F05138', Kotlin: '#A97BFF',
        Dart: '#00B4AB', Shell: '#89e051', Vue: '#41b883', Jupyter: '#DA5B0B',
        Lua: '#000080', R: '#198CE7', Scala: '#c22d40', Perl: '#0298c3',
        Haskell: '#5e5086', Elixir: '#6e4a7e'
    };
    return colors[lang] || '#6366f1';
};

export default AnalysisSection;
