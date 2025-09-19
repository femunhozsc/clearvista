import React from 'react';
import { LineChart } from 'lucide-react';

const StockChartPlaceholder = ({ ticker }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border">
      <div className="chart-placeholder border-primary">
        <div className="text-center">
          <LineChart className="w-12 h-12 text-primary mx-auto mb-2" />
          <p className="text-sm text-foreground">Gráfico de Cotações para {ticker}</p>
          <p className="text-xs text-muted-foreground">(Simulação - Implementação de gráfico real pendente)</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {['1D', '5D', '1M', '6M', '1A', '5A', 'Máx'].map(period => (
          <button 
            key={period}
            onClick={() => alert(`🚧 Período ${period} não implementado.`)}
            className="px-3 py-1 text-xs bg-muted hover:bg-primary/20 text-foreground rounded"
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockChartPlaceholder;