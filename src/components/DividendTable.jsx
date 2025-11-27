import React from 'react';

const DividendTable = ({ data }) => {
    return (
        <div style={{
            width: '100%',
            overflowX: 'auto',
            marginTop: '20px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)'
        }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Date</th>
                        <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} style={{ borderBottom: index !== data.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                            <td style={{ padding: '16px', color: 'var(--text-primary)' }}>{item.date}</td>
                            <td style={{ padding: '16px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>${item.amount.toFixed(4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DividendTable;
