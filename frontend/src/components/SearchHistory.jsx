import React from 'react';

const SearchHistory = ({ history, onSelect, onClear }) => {
    if (!history || history.length === 0) return null;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Recent:</span>
            {history.map((name) => (
                <button key={name} className="search-chip" onClick={() => onSelect(name)}>
                    @{name}
                </button>
            ))}
            <button
                onClick={onClear}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                    opacity: 0.6,
                    transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.6}
            >
                ✕ Clear
            </button>
        </div>
    );
};

export default SearchHistory;
