import React, { useMemo, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { StaffMember } from '../types';

interface ChartsSectionProps {
  staffList: StaffMember[];
}

const COLORS = ['#FF69B4', '#00FFFF', '#FFD700', '#9400D3', '#FF4500', '#32CD32'];

export const ChartsSection: React.FC<ChartsSectionProps> = ({ staffList }) => {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    // Initial size
    setWindowWidth(window.innerWidth);
    
    // Resize handler
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const hobbyCategoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    staffList.forEach(member => {
      member.hobbies.forEach(hobby => {
        counts[hobby.category] = (counts[hobby.category] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [staffList]);

  const coffeeData = useMemo(() => {
    return staffList.map(s => ({
      name: s.name,
      value: s.coffeeConsumption
    })).sort((a, b) => b.value - a.value);
  }, [staffList]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 relative">
          <p className="font-display text-lg">{label || payload[0].name}</p>
          <p className="font-bold text-kawai-purple">
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-white border-y-4 border-black py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-kawai-yellow opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-kawai-pink opacity-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-display text-center mb-12 drop-shadow-[4px_4px_0px_#000]">
          <span className="text-kawai-cyan stroke-black stroke-2">GROUP</span> <span className="text-kawai-pink">STATS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Chart 1: Hobby Categories */}
          <div className="bg-white p-4 md:p-6 border-4 border-black shadow-funky">
            <h3 className="text-xl md:text-2xl font-display mb-6 text-center border-b-2 border-black pb-2">Hobby Categories</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hobbyCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 80 : 100}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={!isMobile}
                    // Hide complex labels on mobile to avoid overlapping
                    label={isMobile ? undefined : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    style={{ fontWeight: 'bold', fontFamily: 'Fredoka' }}
                  >
                    {hobbyCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#000" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: isMobile ? '12px' : '16px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Caffeine Addiction */}
          <div className="bg-white p-4 md:p-6 border-4 border-black shadow-funky">
            <h3 className="text-xl md:text-2xl font-display mb-6 text-center border-b-2 border-black pb-2">Daily Caffeine Intake</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coffeeData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{fontFamily: 'Fredoka', fontSize: isMobile ? 10 : 12}} 
                    interval={0} 
                    angle={-45} 
                    textAnchor="end" 
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#8884d8">
                    {coffeeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#000" strokeWidth={2} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};