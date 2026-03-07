import React, { useState } from 'react';
import api from '../api/axiosConfig';
import AnalysisSection from '../components/AnalysisSection';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [githubUser, setGithubUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('Stars'); // 'Stars', 'Updated', 'Size'
    const [filterLang, setFilterLang] = useState('All');

    const handleSearch = async (e) => {
        e.preventDefault();

        const searchTarget = username.trim();
        if (!searchTarget) return;

        // GitHub username validation rules:
        // - Alphanumeric with single hyphens
        // - Cannot begin or end with a hyphen
        // - Maximum 39 characters
        const githubUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

        if (!githubUsernameRegex.test(searchTarget)) {
            setError('Invalid GitHub username format. Usernames cannot contain spaces or special characters (other than hyphens).');
            return;
        }

        setLoading(true);
        setError('');
        setGithubUser(null);
        setRepos([]);

        try {
            // Fetch User
            const userRes = await api.get(`/github/users/${username}`);
            setGithubUser(userRes.data);

            // Fetch Repos
            const repoRes = await api.get(`/github/users/${searchTarget}/repos`);
            setRepos(repoRes.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                setError('GitHub User not found. Please double check the spelling.');
            } else if (err.response && (err.response.status === 403 || err.response.status === 429)) {
                setError('GitHub API rate limit exceeded. Please try again later.');
            } else {
                setError('An error occurred while fetching the profile data.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Sorting & Filtering Logic
    const availableLanguages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];

    const displayedRepos = repos
        .filter(r => filterLang === 'All' || r.language === filterLang)
        .sort((a, b) => {
            if (sortOrder === 'Stars') return b.stargazers_count - a.stargazers_count;
            if (sortOrder === 'Size') return b.size - a.size;
            if (sortOrder === 'Updated') return new Date(b.updated_at) - new Date(a.updated_at);
            return 0;
        });

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>GitHub Analyzer</h1>
            </header>

            {/* Search Section */}
            <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Analyze GitHub Profiles
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Enter a GitHub username to view stats and repositories.
                </p>

                <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Enter GitHub Username (e.g., octocat)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                        style={{ padding: '1rem', fontSize: '1.1rem' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 2rem', fontSize: '1.1rem' }}>
                        {loading ? 'Searching...' : 'Analyze'}
                    </button>
                </form>
                {error && <div style={{ color: 'var(--error-color)', marginTop: '1rem' }}>{error}</div>}
            </div>

            {/* Results Section */}
            {githubUser && (
                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    {/* User Card */}
                    <div style={{
                        background: 'var(--glass-bg)',
                        border: 'var(--glass-border)',
                        borderRadius: '1rem',
                        padding: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3rem',
                        marginBottom: '3rem',
                        flexWrap: 'wrap'
                    }}>
                        <img
                            src={githubUser.avatar_url}
                            alt={githubUser.login}
                            style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid var(--accent-color)' }}
                        />
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{githubUser.name || githubUser.login}</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>@{githubUser.login}</p>

                            {githubUser.bio && <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', fontSize: '1.1rem', maxWidth: '800px' }}>{githubUser.bio}</p>}

                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
                                {githubUser.location && <span>📍 {githubUser.location}</span>}
                                {githubUser.company && <span>💼 {githubUser.company}</span>}
                                {githubUser.blog && <span>🔗 <a href={githubUser.blog.startsWith('http') ? githubUser.blog : `https://${githubUser.blog}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>Website</a></span>}
                                {githubUser.twitter_username && <span>🐦 <a href={`https://twitter.com/${githubUser.twitter_username}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2', textDecoration: 'none' }}>@{githubUser.twitter_username}</a></span>}
                                {githubUser.created_at && <span>📅 Joined {formatDate(githubUser.created_at)}</span>}
                            </div>

                            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{githubUser.public_repos}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Repositories</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{githubUser.followers}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Followers</div>
                                </div>
                            </div>
                        </div>
                        <a href={githubUser.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', alignSelf: 'flex-start' }}>
                            View on GitHub
                        </a>
                    </div>

                    {/* Analysis Section */}
                    <AnalysisSection repos={repos} />

                    {/* Repos Grid Header with Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem' }}>Latest Repositories ({displayedRepos.length})</h3>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="input-field"
                                style={{ padding: '0.5rem', width: 'auto' }}
                            >
                                <option value="Stars">Sort by Stars</option>
                                <option value="Updated">Sort by Recently Updated</option>
                                <option value="Size">Sort by Size</option>
                            </select>

                            <select
                                value={filterLang}
                                onChange={(e) => setFilterLang(e.target.value)}
                                className="input-field"
                                style={{ padding: '0.5rem', width: 'auto' }}
                            >
                                {availableLanguages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Repos Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
                        {displayedRepos.map((repo) => (
                            <a
                                key={repo.name}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '0.5rem',
                                    padding: '1.5rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                                >
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--accent-color)', wordBreak: 'break-word' }}>{repo.name}</h4>

                                    {repo.description && (
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {repo.description}
                                        </p>
                                    )}

                                    {repo.topics && repo.topics.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                            {repo.topics.slice(0, 4).map(topic => (
                                                <span key={topic} style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem' }}>
                                                    {topic}
                                                </span>
                                            ))}
                                            {repo.topics.length > 4 && <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', alignSelf: 'center' }}>+{repo.topics.length - 4}</span>}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', color: 'var(--text-secondary)', fontSize: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            {repo.language && <span>{repo.language}</span>}
                                            <span title="Stars">⭐ {repo.stargazers_count}</span>
                                            {repo.open_issues_count > 0 && <span title="Open Issues">⚠️ {repo.open_issues_count}</span>}
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div>{(repo.size / 1024).toFixed(1)} MB</div>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Upd: {formatDate(repo.updated_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
