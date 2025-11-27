import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCompanies } from '../api';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 0) {
                const results = await searchCompanies(query);
                setSuggestions(results);
                setIsOpen(true);
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSelect = (ticker) => {
        setQuery(ticker);
        setIsOpen(false);

        // Save to recent searches
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updated = [ticker, ...recent.filter(t => t !== ticker)].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updated));

        navigate(`/results/${ticker}`);
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '24px',
                padding: '12px 20px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search ticker or company name..."
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        marginLeft: '12px',
                        outline: 'none'
                    }}
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    marginTop: '8px',
                    padding: '8px 0',
                    listStyle: 'none',
                    zIndex: 10,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}>
                    {suggestions.map((company) => (
                        <li
                            key={company.ticker}
                            onClick={() => handleSelect(company.ticker)}
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{company.ticker}</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{company.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
