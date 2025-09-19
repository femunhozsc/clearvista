import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart2, AlertTriangle, Info, DollarSign, Percent, Hash, Briefcase, ChevronUp, ChevronDown, Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import IndicatorCard from '@/components/stock/IndicatorCard';
import StockChartPlaceholder from '@/components/stock/StockChartPlaceholder';
import { motion } from 'framer-motion';
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { mockStockDataDetails } from '@/data';

const KeyIndicator = ({ icon: Icon, label, value, unit, className, iconClassName }) => (
  <div className={cn("flex flex-col items-center justify-center p-4 bg-card/80 rounded-lg shadow-lg border border-border/70 backdrop-blur-sm", className)}>
    <div className="flex items-center text-muted-foreground text-sm mb-1.5">
      <Icon className={cn("w-4 h-4 mr-1.5", iconClassName)} />
      {label}
    </div>
    <div className="text-lg font-semibold text-foreground">
      {value !== undefined && value !== null && value !== "N/A" ? `${value}${unit || ''}` : '-'}
    </div>
  </div>
);

const PriceDisplay = ({ price, changePercent, isPositiveChange }) => (
  <div className="flex items-center">
    <p className="text-3xl md:text-4xl font-bold text-foreground mr-3">
      {typeof price === 'number' ? `R$ ${price.toFixed(2)}` : (price || '-')}
    </p>
    {changePercent !== null && changePercent !== undefined && changePercent !== "N/A" && (
      <div className={`flex items-center px-2 py-1 rounded-md text-sm font-medium ${isPositiveChange ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {isPositiveChange ? 
          <ChevronUp className="w-5 h-5 mr-1" /> : 
          <ChevronDown className="w-5 h-5 mr-1" />
        }
        <span>{typeof changePercent === 'number' ? changePercent.toFixed(2) : String(changePercent)}%</span>
      </div>
    )}
  </div>
);

const StockPage = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const currentTicker = ticker.toUpperCase();
    const foundStock = mockStockDataDetails.find(s => s.ticker.toUpperCase() === currentTicker);

    if (foundStock) {
      setTimeout(() => { 
        setStock(foundStock);
        setLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setError(`Ativo ${currentTicker} não encontrado nos dados fictícios.`);
        setStock(null);
        setLoading(false);
        toast({
          title: "Ativo não encontrado",
          description: `Não foi possível encontrar dados para o ticker "${currentTicker}".`,
          variant: "destructive",
        });
      }, 500);
    }
  }, [ticker]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-lg text-foreground flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
        Carregando dados do ativo...
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-foreground">Falha ao Carregar</h1>
        <p className="text-muted-foreground mb-4 max-w-md">{error || `Não foi possível encontrar dados para o ticker "${ticker}". Verifique o ticker ou tente novamente.`}</p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Início
        </Button>
      </div>
    );
  }
  
  const isPositiveChange = stock && typeof stock.changePercent === 'number' ? stock.changePercent >= 0 : false;

  const fundamentalistIndicators = [
    { label: "P/L", value: stock.pe, description: "Preço/Lucro: Preço da ação dividido pelo lucro por ação." },
    { label: "P/VP", value: stock.pvp, description: "Preço/Valor Patrimonial: Preço da ação dividido pelo valor patrimonial por ação." },
    { label: "Dividend Yield", value: stock.dividendYield, unit: "%", description: "Rendimento de Dividendos: Dividendo pago por ação dividido pelo preço da ação." },
    { label: "Valor de Mercado", value: stock.marketCap, description: "Valor total das ações da empresa no mercado." },
    { label: "EV/EBITDA", value: stock.evEbitda, description: "Valor da Firma/EBITDA: Métrica para avaliar o valor da empresa." },
    { label: "LPA", value: stock.lpa, description: "Lucro Por Ação: Lucro líquido da empresa dividido pelo número de ações." },
    { label: "VPA", value: stock.vpa, description: "Valor Patrimonial por Ação: Patrimônio líquido dividido pelo número de ações." },
    { label: "ROE", value: stock.roe, unit: "%", description: "Retorno sobre o Patrimônio Líquido: Mede a rentabilidade da empresa." },
    { label: "Valor Graham", value: stock.grahamValue, description: "Estimativa do valor intrínseco da ação segundo Benjamin Graham." },
    { label: "Marg. Líquida", value: stock.netMargin, unit: "%", description: "Margem Líquida: Lucro líquido dividido pela receita líquida." },
    { label: "ROA", value: stock.roa, unit: "%", description: "Retorno sobre o Ativo: Mede a rentabilidade em relação aos ativos totais." },
    { label: "Dívida/Patrimônio", value: stock.debtEquity, description: "Relação entre a dívida e o patrimônio líquido da empresa." },
    { label: "Liquidez Corrente", value: stock.currentLiquidity, description: "Capacidade da empresa de pagar suas obrigações de curto prazo." },
    { label: "P/L Futuro", value: stock.forwardPe, description: "Preço/Lucro esperado para os próximos 12 meses." },
    { label: "P/Vendas", value: stock.priceSales, description: "Preço da ação dividido pela receita por ação." },
    { label: "Enterprise Value", value: stock.enterpriseValue, description: "Valor total da empresa, incluindo dívidas e caixa." },
    { label: "Caixa Total", value: stock.totalCash, description: "Montante total de caixa e equivalentes de caixa." },
    { label: "Dívida Total", value: stock.totalDebt, description: "Soma de todas as dívidas da empresa." },
    { label: "Receita Total", value: stock.totalRevenue, description: "Receita total gerada pela empresa em um período." },
    { label: "Liquidez Seca", value: stock.acidTestRatio, description: "Capacidade de pagamento a curto prazo, excluindo estoques." },
    { label: "Abertura", value: stock.open, description: "Preço de abertura da ação no dia." },
    { label: "Mínima", value: stock.low, description: "Menor preço da ação no dia." },
    { label: "Máxima", value: stock.high, description: "Maior preço da ação no dia." },
    { label: "Fech. Anterior", value: stock.prevClose, description: "Preço de fechamento da ação no dia anterior." },
    { label: "Volume", value: stock.volume, description: "Quantidade de ações negociadas no dia." },
    { label: "Setor", value: stock.sector, description: "Setor de atuação da empresa."}
  ].filter(ind => (ind.value !== undefined && ind.value !== null && ind.value !== "N/A") || ind.label === "Setor");

  const keyMetrics = [
    { icon: Hash, label: "P/L", value: stock.pe },
    { icon: Briefcase, label: "P/VP", value: stock.pvp },
    { icon: Percent, label: "Div. Yield", value: stock.dividendYield, unit: "%" },
    { 
      icon: isPositiveChange ? TrendingUp : TrendingDown, 
      label: "Variação Dia", 
      value: stock.changePercent, 
      unit: typeof stock.changePercent === 'number' ? "%" : '',
      iconClassName: isPositiveChange ? 'text-green-500' : 'text-red-500'
    },
  ];

  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 text-foreground hover:bg-muted">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-center">
              {stock.logoUrl && 
                <img  
                  alt={`${stock.name || stock.ticker} logo`} 
                  className="h-12 w-12 mr-4 rounded-full object-contain bg-white p-1 shadow-md" 
                  src={stock.logoUrl.startsWith('http') ? stock.logoUrl : `https://avatar.vercel.sh/${stock.ticker}.png?size=60`} 
                  onError={(e) => { e.target.onerror = null; e.target.src=`https://avatar.vercel.sh/${stock.ticker}.png?size=60&text=${stock.ticker.substring(0,2)}`}}
                />
              }
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">{stock.ticker}</h1>
                <p className="text-lg md:text-xl text-muted-foreground">{stock.name || 'Nome não disponível'}</p>
                 {stock.sector && stock.sector !== "N/A" && <p className="text-sm text-accent">{stock.sector}</p>}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 bg-card/70 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-primary/30 md:min-w-[300px]">
              <h3 className="text-sm font-medium text-primary mb-2 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Cotação Atualizada
              </h3>
              <PriceDisplay price={stock.price} changePercent={stock.changePercent} isPositiveChange={isPositiveChange} />
            </div>
          </div>
        </header>

        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {keyMetrics.map(metric => (
              <KeyIndicator 
                key={metric.label}
                icon={metric.icon}
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
                iconClassName={metric.iconClassName}
              />
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
            <BarChart2 className="mr-2 text-primary" />
            Histórico de Cotações (Simulado)
          </h2>
          <StockChartPlaceholder ticker={stock.ticker} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
            <Info className="mr-2 text-primary"/> 
            Indicadores Detalhados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {fundamentalistIndicators.map((indicator, index) => (
              <IndicatorCard 
                key={index} 
                label={indicator.label} 
                value={indicator.value} 
                unit={indicator.unit}
                description={indicator.description} 
              />
            ))}
          </div>
        </section>
      </motion.div>
    </TooltipProvider>
  );
};

export default StockPage;