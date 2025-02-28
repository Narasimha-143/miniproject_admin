import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Layout } from './Layout';

const Dashboard = () => {
  const barData = [
    { name: 'CSE', viewed: 400, downloaded: 240 },
    { name: 'ECE', viewed: 300, downloaded: 139 },
    { name: 'IT', viewed: 200, downloaded: 980 },
    { name: 'MECH', viewed: 278, downloaded: 390 },
  ];

  const pieData = [
    { name: 'Accepted', value: 400 },
    { name: 'Rejected', value: 300 },
    { name: 'Pending', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Question Papers Statistics</h2>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="viewed" fill="#8884d8" />
              <Bar dataKey="downloaded" fill="#82ca9d" />
            </BarChart>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Question Papers Status</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
