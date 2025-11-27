import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const LandingPage = () => {
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(recent);
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
            position: 'relative'
        }}>
            {recentSearches.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Recent:</span>
                    {recentSearches.map(ticker => (
                        <Link
                            key={ticker}
                            to={`/results/${ticker}`}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                fontSize: '12px',
                                color: 'var(--text-primary)',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        >
                            {ticker}
                        </Link>
                    ))}
                </div>
            )}

            <h1 style={{
                fontSize: '4rem',
                fontWeight: '800',
                marginBottom: '40px',
                background: 'linear-gradient(to right, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-2px',
                animation: 'pulse 3s infinite ease-in-out'
            }}>
                DivLookup
            </h1>
            <SearchBar />
            <p style={{
                marginTop: '20px',
                color: 'var(--text-secondary)',
                fontSize: '14px'
            }}>
                Search for a company to view historical dividend data
            </p>
        </div>
    );
};

export default LandingPage;
