import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, X, ChevronsUpDown, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockStockDataDetails } from '@/data';
import { cn } from '@/lib/utils';

const allStocks = mockStockDataDetails.map(s => ({ value: s.ticker, label: `${s.ticker} - ${s.name}` }));
const lineColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

const StockSelector = ({ selectedStocks, onSelectStock }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={selectedStocks.length >= 4}
        >
          {selectedStocks.length >= 4 ? "Máximo de 4 ativos" : "Selecione um ativo..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisar ativo..." />
          <CommandEmpty>Nenhum ativo encontrado.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {allStocks.map((stock) => (
              <CommandItem
                key={stock.value}
                value={stock.value}
                onSelect={(currentValue) => {
                  if (selectedStocks.length < 4 && !selectedStocks.find(s => s.ticker === currentValue.toUpperCase())) {
                    onSelectStock(currentValue.toUpperCase());
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedStocks.find(s => s.ticker === stock.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {stock.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ComparadorPage = () => {
  const [selectedTickers, setSelectedTickers] = useState(['PETR4', 'VALE3']);

  const selectedStocks = useMemo(() => {
    return selectedTickers
      .map(ticker => mockStockDataDetails.find(s => s.ticker === ticker))
      .filter(Boolean);
  }, [selectedTickers]);

  const handleSelectStock = (ticker) => {
    if (selectedTickers.length < 4 && !selectedTickers.includes(ticker)) {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const handleRemoveStock = (tickerToRemove) => {
    setSelectedTickers(selectedTickers.filter(ticker => ticker !== tickerToRemove));
  };
  
  const comparisonData = useMemo(() => {
    const metrics = [
      { key: 'price', label: 'Preço Atual' },
      { key: 'changePercent', label: 'Variação (Dia)' },
      { key: 'marketCap', label: 'Valor de Mercado' },
      { key: 'dividendYield', label: 'Dividend Yield' },
      { key: 'peRatio', label: 'P/L' },
      { key: 'roe', label: 'ROE' },
    ];

    return metrics.map(metric => ({
      metric: metric.label,
      ...selectedStocks.reduce((acc, stock) => {
        let value = stock[metric.key];
        if (typeof value === 'number' && metric.key !== 'peRatio' && metric.key !== 'roe') {
           value = (metric.key.includes('Percent') || metric.key.includes('Yield')) 
            ? `${value.toFixed(2)}%` 
            : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        if(metric.key === 'marketCap' && typeof stock[metric.key] === 'number') {
           value = `R$ ${(stock[metric.key] / 1e9).toFixed(2)} B`;
        }
        if(metric.key === 'peRatio' || metric.key === 'roe') {
            value = value?.toFixed(2);
        }

        acc[stock.ticker] = value;
        return acc;
      }, {})
    }));
  }, [selectedStocks]);

  const chartData = useMemo(() => {
    if (selectedStocks.length === 0) return [];
    
    const baseHistory = selectedStocks[0].history;
    return baseHistory.map((point, index) => {
      let dataPoint = { date: point.date };
      selectedStocks.forEach(stock => {
        if(stock.history[index]) {
            dataPoint[stock.ticker] = stock.history[index].price;
        }
      });
      return dataPoint;
    });
  }, [selectedStocks]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 md:py-12"
    >
      <header className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center">
          <BarChart2 className="w-10 h-10 mr-4" />
          Comparador de Ativos
        </h1>
        <p className="text-lg text-muted-foreground">Analise e compare o desempenho dos seus ativos favoritos.</p>
      </header>
      
      <Card className="mb-8 glassmorphic-card">
        <CardHeader>
          <CardTitle>Selecione os Ativos (até 4)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <StockSelector selectedStocks={selectedStocks} onSelectStock={handleSelectStock} />
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedStocks.map(stock => (
              <motion.div
                key={stock.ticker}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center bg-primary/10 text-primary font-medium px-3 py-1 rounded-full"
              >
                <span>{stock.ticker}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={() => handleRemoveStock(stock.ticker)}>
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedStocks.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <Card className="glassmorphic-card">
            <CardHeader>
              <CardTitle>Tabela Comparativa</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Métrica</TableHead>
                    {selectedStocks.map(stock => <TableHead key={stock.ticker} className="text-right">{stock.ticker}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map(row => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-medium">{row.metric}</TableCell>
                      {selectedStocks.map(stock => <TableCell key={stock.ticker} className="text-right">{row[stock.ticker] ?? 'N/A'}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic-card">
            <CardHeader>
              <CardTitle>Desempenho Histórico</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={['auto', 'auto']} tickFormatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))'
                    }}
                  />
                  <Legend />
                  {selectedStocks.map((stock, index) => (
                    <Line key={stock.ticker} type="monotone" dataKey={stock.ticker} stroke={lineColors[index % lineColors.length]} dot={false} strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedStocks.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-muted-foreground/20 rounded-lg">
          <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Comece a Comparar</h3>
          <p className="text-muted-foreground">Selecione pelo menos um ativo para ver os dados comparativos.</p>
        </div>
      )}
    </motion.div>
  );
};

export default ComparadorPage;