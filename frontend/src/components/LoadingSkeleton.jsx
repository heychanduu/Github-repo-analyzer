import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Profile Skeleton */}
            <div className="glass-card" style={{ padding: '3rem', display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <div className="skeleton skeleton-circle" style={{ width: '150px', height: '150px', flexShrink: 0 }}></div>
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <div className="skeleton skeleton-text" style={{ width: '60%', height: '2rem', marginBottom: '0.75rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '30%', height: '1rem', marginBottom: '1.5rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '90%', height: '1rem', marginBottom: '0.5rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '70%', height: '1rem', marginBottom: '2rem' }}></div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i}>
                                <div className="skeleton skeleton-text" style={{ width: '50px', height: '2rem', marginBottom: '0.25rem' }}></div>
                                <div className="skeleton skeleton-text" style={{ width: '70px', height: '0.75rem' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Skeleton */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                        <div className="skeleton skeleton-text" style={{ width: '60%', height: '0.75rem', marginBottom: '0.75rem' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '50%', height: '2rem' }}></div>
                    </div>
                ))}
            </div>

            {/* Repo Grid Skeleton */}
            <div className="skeleton skeleton-text" style={{ width: '200px', height: '1.5rem', marginBottom: '1.5rem' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                        <div className="skeleton skeleton-text" style={{ width: '70%', height: '1.25rem', marginBottom: '0.75rem' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '100%', height: '0.875rem', marginBottom: '0.35rem' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '85%', height: '0.875rem', marginBottom: '1rem' }}></div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            {[1, 2, 3].map(j => (
                                <div key={j} className="skeleton" style={{ width: '60px', height: '1.5rem', borderRadius: '1rem' }}></div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="skeleton skeleton-text" style={{ width: '30%', height: '0.875rem' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '25%', height: '0.875rem' }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;
