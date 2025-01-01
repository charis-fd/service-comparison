import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ServiceComparisonChart = () => {
  const preService = {
    period: 'Pre-Service (Oct)',
    consumption: 2.59,
    distance: 887,
    oilAdded: 2.3,
    dailyConsumption: (2300 / 887).toFixed(1),
    daysMonitored: 22,
    efficiency: (887 / 2.3).toFixed(0)
  };

  const postService = {
    period: 'Post-Service (Nov-Dec)',
    consumption: 1.37,
    distance: 2013,
    oilAdded: 2.75,
    dailyConsumption: (2750 / 2013).toFixed(1),
    daysMonitored: 45,
    efficiency: (2013 / 2.75).toFixed(0)
  };

  const comparisonData = [
    { metric: 'Oil Consumption', before: preService.consumption, after: postService.consumption, unit: 'L/1000km' },
    { metric: 'Efficiency', before: parseInt(preService.efficiency), after: parseInt(postService.efficiency), unit: 'km/L' },
    { metric: 'Daily Distance', 
      before: (preService.distance/preService.daysMonitored), 
      after: (postService.distance/postService.daysMonitored),
      unit: 'km/day'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Service Impact Analysis</h1>
      
      {/* Analysis Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {[preService, postService].map((period) => (
          <div key={period.period} style={{ 
            flex: 1, 
            padding: '20px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px' 
          }}>
            <h3 style={{ marginBottom: '10px' }}>{period.period}</h3>
            <div>
              <p>Monitoring Period: {period.daysMonitored} days</p>
              <p>Distance Driven: {period.distance} km</p>
              <p>Total Oil Added: {period.oilAdded}L</p>
              <p>Daily Distance: {(period.distance/period.daysMonitored).toFixed(1)} km/day</p>
              <p>Oil Consumption: {period.consumption} L/1000km</p>
              <p style={{ color: 'green' }}>Efficiency: {period.efficiency} km/L</p>
            </div>
          </div>
        ))}
      </div>

      {/* Improvement Stats */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Service Improvement</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <p>Consumption Improvement</p>
            <p style={{ color: 'green', fontSize: '1.25rem' }}>
              {((preService.consumption - postService.consumption)/preService.consumption * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p>Efficiency Improvement</p>
            <p style={{ color: 'green', fontSize: '1.25rem' }}>
              {((postService.efficiency - preService.efficiency)/preService.efficiency * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={comparisonData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="metric" width={100} />
            <Tooltip 
              formatter={(value, name) => [
                `${value.toFixed(1)} ${comparisonData.find(d => d.metric === name)?.unit || ''}`,
                name
              ]}
            />
            <Legend />
            <Bar dataKey="before" name="Pre-Service" fill="#ff7043" />
            <Bar dataKey="after" name="Post-Service" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ServiceComparisonChart;