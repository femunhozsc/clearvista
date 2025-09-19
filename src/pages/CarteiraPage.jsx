import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, PlusCircle, TrendingUp, TrendingDown, DollarSign, PieChart, AlertTriangle, RefreshCw, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import { mockStockDataDetails } from '@/data';
import { cn } from '@/lib/utils';

const SummaryCard = ({ title, value, icon: Icon, change, isLoading }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  return (
    <Card className="glassmorphic-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-7 w-24 bg-muted/50 animate-pulse rounded-md" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {change !== null && !isLoading && (
          <p className={cn("text-xs text-muted-foreground", isPositive && "text-green-500", isNegative && "text-red-500")}>
            {isPositive ? '+' : ''}{change}% desde ontem
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const AssetForm = ({ asset, onSave, closeDialog }) => {
  const [ticker, setTicker] = useState(asset?.ticker || '');
  const [quantity, setQuantity] = useState(asset?.quantity || '');
  const [purchasePrice, setPurchasePrice] = useState(asset?.purchase_price || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const assetData = {
      user_id: user.id,
      ticker: ticker.toUpperCase(),
      quantity: parseInt(quantity, 10),
      purchase_price: parseFloat(purchasePrice),
    };

    const { error } = await supabase.from('portfolio_assets').upsert(assetData, { onConflict: 'user_id, ticker' });

    if (error) {
      toast({ title: "Erro ao salvar ativo", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso!", description: `Ativo ${assetData.ticker} salvo na carteira.` });
      onSave();
      closeDialog();
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="ticker">Ticker do Ativo</Label>
        <Input id="ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="EX: PETR4" required disabled={!!asset} />
      </div>
      <div>
        <Label htmlFor="quantity">Quantidade</Label>
        <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="100" required min="1" />
      </div>
      <div>
        <Label htmlFor="purchasePrice">Preço de Compra (por unidade)</Label>
        <Input id="purchasePrice" type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="38.50" required min="0.01" />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Ativo'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const CarteiraPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const fetchAssets = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('portfolio_assets').select('*').order('ticker', { ascending: true });
    if (error) {
      setError(error.message);
      toast({ title: "Erro ao buscar carteira", description: error.message, variant: "destructive" });
    } else {
      setAssets(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const portfolioData = useMemo(() => {
    if (!assets.length) return { enrichedAssets: [], summary: { totalInvested: 0, currentValue: 0, totalPL: 0, totalPLPercent: 0 } };

    let totalInvested = 0;
    let currentValue = 0;

    const enrichedAssets = assets.map(asset => {
      const marketData = mockStockDataDetails.find(s => s.ticker === asset.ticker);
      const currentPrice = marketData?.price || asset.purchase_price;
      const investedValue = asset.quantity * asset.purchase_price;
      const marketValue = asset.quantity * currentPrice;
      const profitLoss = marketValue - investedValue;
      const profitLossPercent = (profitLoss / investedValue) * 100;

      totalInvested += investedValue;
      currentValue += marketValue;

      return {
        ...asset,
        currentPrice,
        investedValue,
        marketValue,
        profitLoss,
        profitLossPercent,
        logoUrl: marketData?.logoUrl
      };
    });

    const totalPL = currentValue - totalInvested;
    const totalPLPercent = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;

    return {
      enrichedAssets,
      summary: { totalInvested, currentValue, totalPL, totalPLPercent }
    };
  }, [assets]);

  const handleDelete = async (assetId, ticker) => {
    if (!window.confirm(`Tem certeza que deseja remover ${ticker} da sua carteira?`)) return;

    const { error } = await supabase.from('portfolio_assets').delete().match({ id: assetId });
    if (error) {
      toast({ title: "Erro ao remover ativo", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Ativo removido", description: `${ticker} foi removido da sua carteira.` });
      fetchAssets();
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingAsset(null);
    setIsDialogOpen(true);
  };

  const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-lg text-foreground flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
        Carregando sua carteira...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-foreground">Falha ao Carregar</h1>
        <p className="text-muted-foreground mb-4 max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 md:py-12"
    >
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center">
            <Briefcase className="w-10 h-10 mr-4" />
            Minha Carteira
          </h1>
          <p className="text-lg text-muted-foreground">Acompanhe o desempenho dos seus investimentos.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="mt-4 md:mt-0">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Ativo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAsset ? 'Editar Ativo' : 'Adicionar Novo Ativo'}</DialogTitle>
              <DialogDescription>
                {editingAsset ? `Atualize a quantidade e o preço médio de ${editingAsset.ticker}.` : 'Insira os dados do ativo que você comprou.'}
              </DialogDescription>
            </DialogHeader>
            <AssetForm asset={editingAsset} onSave={fetchAssets} closeDialog={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <SummaryCard title="Valor Total da Carteira" value={formatCurrency(portfolioData.summary.currentValue)} icon={DollarSign} change={null} isLoading={loading} />
        <SummaryCard title="Total Investido" value={formatCurrency(portfolioData.summary.totalInvested)} icon={PieChart} change={null} isLoading={loading} />
        <Card className="glassmorphic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lucro / Prejuízo Total</CardTitle>
            {portfolioData.summary.totalPL >= 0 ? <TrendingUp className="h-4 w-4 text-muted-foreground" /> : <TrendingDown className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", portfolioData.summary.totalPL > 0 && "text-green-500", portfolioData.summary.totalPL < 0 && "text-red-500")}>
              {formatCurrency(portfolioData.summary.totalPL)}
            </div>
            <p className={cn("text-xs", portfolioData.summary.totalPL > 0 && "text-green-500", portfolioData.summary.totalPL < 0 && "text-red-500")}>
              {portfolioData.summary.totalPLPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="glassmorphic-card">
          <CardHeader>
            <CardTitle>Meus Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ativo</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Preço Médio</TableHead>
                  <TableHead className="text-right">Preço Atual</TableHead>
                  <TableHead className="text-right">Lucro/Prejuízo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.enrichedAssets.length > 0 ? (
                  portfolioData.enrichedAssets.map(asset => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium flex items-center">
                        {asset.logoUrl && <img src={asset.logoUrl} alt={asset.ticker} className="h-6 w-6 mr-2 rounded-full bg-white" />}
                        {asset.ticker}
                      </TableCell>
                      <TableCell className="text-right">{asset.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(asset.purchase_price)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(asset.currentPrice)}</TableCell>
                      <TableCell className={cn("text-right", asset.profitLoss > 0 && "text-green-500", asset.profitLoss < 0 && "text-red-500")}>
                        {formatCurrency(asset.profitLoss)} ({asset.profitLossPercent.toFixed(2)}%)
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(asset)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(asset.id, asset.ticker)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">Sua carteira está vazia. Adicione seu primeiro ativo!</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </motion.div>
  );
};

export default CarteiraPage;