'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

export function AdminSalesChart({ orders }: { orders: any[] }) {
  // Aggregate orders by date
  const salesByDate = orders.reduce((acc: any, order) => {
    // Format to short date like "Oct 12"
    const dateObj = new Date(order.created_at);
    const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += order.total;
    return acc;
  }, {});

  const data = Object.keys(salesByDate).map(date => ({
    name: date,
    total: salesByDate[date]
  }));

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-xl bg-secondary/20">
        <p className="text-muted-foreground text-sm font-medium">No sales data available yet.</p>
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full pt-4 pb-2 pr-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`} 
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              color: 'hsl(var(--foreground))'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
            labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="hsl(var(--foreground))" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }} 
            activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
