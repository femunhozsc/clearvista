import React, { useState, useEffect } from 'react';
import { LineChart as LineChartIcon, TrendingUp, TrendingDown, Info, Percent, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mockIndexData } from '@/data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const IndexSummaryCard = ({ name, value, changePercent, unit, Icon, iconColor, isPositive }) => (
  <div className="p-3 bg-card-foreground/5 rounded-md">
    <div className="flex items-center mb-1">
      <Icon size={16} className={`mr-2 ${iconColor}`} />
      <p className={`text-sm font-medium ${iconColor}`}>{name}</p>
    </div>
    <p className="text-lg font-semibold text-foreground">
      {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {unit}
    </p>
    <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? <TrendingUp size={12} className="inline mr-1"/> : <TrendingDown size={12} className="inline mr-1"/>}
      {changePercent.toFixed(2)}%
    </p>
  </div>
);

const GenericMarketChart = ({ title, indices, colors, yAxisId, yAxisUnit }) => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const rawData = indices.map(key => mockIndexData[key]);
      if (rawData.some(d => !d || !d.historicalData)) {
        throw new Error(`Dados históricos para ${title} não encontrados.`);
      }

      const combined = rawData[0].historicalData.map((point, index) => {
        const dataPoint = {
          date: new Date(point.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }),
        };
        rawData.forEach(d => {
          dataPoint[d.name] = parseFloat(d.historicalData[index].price);
        });
        return dataPoint;
      });

      setChartData(combined);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [indices, title]);

  if (loading) return <div className="glassmorphic-card p-6 rounded-xl shadow-lg flex items-center justify-center h-96"><LineChartIcon className="w-10 h-10 text-primary animate-pulse" /></div>;
  if (error) return <div className="glassmorphic-card p-6 rounded-xl shadow-lg flex items-center justify-center h-96"><TrendingDown className="w-10 h-10 text-destructive" /><p className="ml-2 text-destructive">{error}</p></div>;

  return (
    <motion.div 
      className="glassmorphic-card p-6 rounded-xl shadow-lg interactive-card flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {indices.map(key => {
          const data = mockIndexData[key];
          const isPositive = data.changePercent >= 0;
          return <IndexSummaryCard key={key} name={data.name} value={data.price} changePercent={data.changePercent} unit={data.unit} Icon={yAxisUnit === '%' ? Percent : Landmark} iconColor={colors[data.name]} isPositive={isPositive} />;
        })}
      </div>
      <div className="flex-grow h-72 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis 
              yAxisId={yAxisId}
              tickFormatter={(value) => yAxisUnit === '%' ? `${value.toFixed(1)}%` : value.toLocaleString('pt-BR', {notation: 'compact'})}
              domain={['auto', 'auto']}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
              formatter={(value, name) => [`${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${yAxisUnit}`, name]}
            />
            <Legend verticalAlign="top" height={36} iconSize={10}/>
            {indices.map(key => {
              const data = mockIndexData[key];
              return <Line key={key} yAxisId={yAxisId} type="monotone" dataKey={data.name} stroke={colors[data.name]} strokeWidth={2} dot={false} name={data.name} />;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const MarketCharts = () => {
  return (
    <div>
      <h2 className="section-title flex items-center">
        <Info className="w-6 h-6 mr-2 text-primary"/>
        Mercados em Foco
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GenericMarketChart 
          title="Índices de Ações"
          indices={['IBOVESPA', 'SP500']}
          colors={{ 'IBOVESPA': 'hsl(var(--primary))', 'S&P 500': 'hsl(var(--accent))' }}
          yAxisId="points"
          yAxisUnit="pts"
        />
        <GenericMarketChart 
          title="Indicadores Econômicos"
          indices={['SELIC', 'IPCA']}
          colors={{ 'SELIC (anual)': '#22C55E', 'IPCA (mensal)': '#FFA500' }}
          yAxisId="percentage"
          yAxisUnit="%"
        />
      </div>
    </div>
  );
};

export default MarketCharts;