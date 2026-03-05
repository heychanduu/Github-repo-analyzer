import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import AnalysisSection from '../components/AnalysisSection';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [githubUser, setGithubUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError('');
        setGithubUser(null);
        setRepos([]);

        try {
            // Fetch User
            const userRes = await api.get(`/github/users/${username}`);
            setGithubUser(userRes.data);

            // Fetch Repos
            const repoRes = await api.get(`/github/users/${username}/repos`);
            setRepos(repoRes.data);
        } catch (err) {
            console.error(err);
            setError('User not found or API limit reached.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>GitHub Analyzer</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span>
                    <button onClick={logout} className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        Logout
                    </button>
                </div>
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
                        padding: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <img
                            src={githubUser.avatar_url}
                            alt={githubUser.login}
                            style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid var(--accent-color)' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{githubUser.name || githubUser.login}</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>@{githubUser.login}</p>
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{githubUser.public_repos}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Repositories</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{githubUser.followers}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Followers</div>
                                </div>
                            </div>
                        </div>
                        <a href={githubUser.html_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'var(--bg-secondary)' }}>
                            View on GitHub
                        </a>
                    </div>

                    {/* Analysis Section */}
                    <AnalysisSection repos={repos} />

                    {/* Repos Grid */}
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Latest Repositories</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {repos.map((repo) => (
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
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                                >
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>{repo.name}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        <span>{repo.language || 'Unknown'}</span>
                                        <span>⭐ {repo.stargazers_count}</span>
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
