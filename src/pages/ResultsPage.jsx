import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompanyDetails } from '../api';
import DividendGraph from '../components/DividendGraph';
import DividendTable from '../components/DividendTable';

const ResultsPage = () => {
    const { ticker } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [timeRange, setTimeRange] = useState('10y');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCompanyDetails(ticker);
                setCompany(data);
            } catch (err) {
                setError('Failed to fetch company data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ticker]);

    const getFilteredDividends = () => {
        if (!company || !company.dividends) return [];
        if (timeRange === 'max') return company.dividends;

        const now = new Date();
        const cutoff = new Date();
        if (timeRange === '1y') cutoff.setFullYear(now.getFullYear() - 1);
        if (timeRange === '5y') cutoff.setFullYear(now.getFullYear() - 5);
        if (timeRange === '10y') cutoff.setFullYear(now.getFullYear() - 10);

        return company.dividends.filter(d => new Date(d.date) >= cutoff);
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>
                Loading...
            </div>
        );
    }

    if (error || !company) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>{error || 'Company not found'}</h2>
                <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Back to Search</Link>
            </div>
        );
    }

    const filteredDividends = getFilteredDividends();

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '40px 20px',
            minHeight: '100vh'
        }}>
            <header style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: 'var(--text-secondary)',
                        marginBottom: '10px',
                        fontSize: '14px'
                    }}>
                        ← Back to Search
                    </Link>
                    <h1 style={{ fontSize: '3rem', margin: '0', lineHeight: 1 }}>{company.ticker}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '5px 0 0 0' }}>{company.name}</p>
                </div>
            </header>

            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '24px',
                padding: '30px',
                marginBottom: '30px',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Dividend History</h2>
                    <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                        {['1y', '5y', '10y', 'max'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    backgroundColor: timeRange === range ? 'var(--accent-primary)' : 'transparent',
                                    color: timeRange === range ? '#fff' : 'var(--text-secondary)',
                                    fontWeight: timeRange === range ? '600' : '400',
                                    fontSize: '14px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {range.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <DividendGraph data={filteredDividends} />
            </div>

            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '24px',
                padding: '30px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.5rem' }}>Payment Details</h2>
                <DividendTable data={filteredDividends} />
            </div>
        </div>
    );
};

export default ResultsPage;
