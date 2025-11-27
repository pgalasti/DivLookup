import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DividendGraph = ({ data }) => {
    // Sort data by date ascending for the graph
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    data={sortedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#f8fafc' }}
                        formatter={(value) => [`$${value}`, 'Amount']}
                    />
                    <Bar
                        dataKey="amount"
                        fill="#38bdf8"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DividendGraph;
