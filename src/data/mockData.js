import React from 'react';

const generateHistoricalData = (basePrice, numDays, isPercentage = false, annualRate = null) => {
  if (isPercentage && annualRate !== null) {
    const dailyRate = Math.pow(1 + annualRate / 100, 1/252) - 1; // Assuming 252 trading days
    return Array.from({ length: numDays }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (numDays - i));
      // Simulate some volatility around the trend
      const fluctuation = (Math.random() - 0.5) * 0.001; // Small daily fluctuation
      const price = parseFloat( ( (1 + dailyRate + fluctuation) ** i * basePrice ).toFixed(2) );
      return {
        date: date.toISOString().split('T')[0],
        price: price,
      };
    });
  }
  
  // Original generation for point-based indices
  return Array.from({ length: numDays }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (numDays - i));
    return {
      date: date.toISOString().split('T')[0],
      price: parseFloat((basePrice + Math.sin(i / (numDays/10)) * (basePrice * 0.1) + Math.random() * (basePrice * 0.05)).toFixed(2)),
    };
  });
};

export const mockStockDataDetails = [
  {
    ticker: 'PETR4',
    name: 'Petrobras PN',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/petrobras.svg',
    price: 38.50,
    changePercent: 1.25,
    changeValue: 0.48,
    volume: 35000000,
    open: 38.10,
    low: 38.00,
    high: 38.60,
    prevClose: 38.02,
    pe: 5.5,
    pvp: 1.2,
    dividendYield: 12.5,
    marketCap: "503.20 Bi",
    evEbitda: 3.1,
    lpa: 6.90,
    vpa: 32.08,
    roe: 21.8,
    grahamValue: 45.10,
    netMargin: 20.5,
    roa: 10.2,
    debtEquity: 0.6,
    currentLiquidity: 1.1,
    forwardPe: 5.2,
    priceSales: 1.0,
    enterpriseValue: "550.0 Bi",
    totalCash: "60.0 Bi",
    totalDebt: "150.0 Bi",
    totalRevenue: "500.0 Bi",
    acidTestRatio: 0.9,
    sector: 'Óleo, Gás e Biocombustíveis',
    historicalData: generateHistoricalData(38.50, 60),
  },
  {
    ticker: 'VALE3',
    name: 'Vale ON',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/vale.svg',
    price: 61.70,
    changePercent: -0.85,
    changeValue: -0.53,
    volume: 22000000,
    open: 62.00,
    low: 61.50,
    high: 62.30,
    prevClose: 62.23,
    pe: 6.2,
    pvp: 1.5,
    dividendYield: 8.2,
    marketCap: "275.80 Bi",
    evEbitda: 4.0,
    lpa: 9.95,
    vpa: 41.13,
    roe: 24.2,
    grahamValue: 70.50,
    netMargin: 25.1,
    roa: 12.0,
    debtEquity: 0.4,
    currentLiquidity: 1.5,
    forwardPe: 6.0,
    priceSales: 1.8,
    enterpriseValue: "300.0 Bi",
    totalCash: "30.0 Bi",
    totalDebt: "50.0 Bi",
    totalRevenue: "150.0 Bi",
    acidTestRatio: 1.2,
    sector: 'Mineração',
    historicalData: generateHistoricalData(61.70, 60),
  },
  {
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/itau-unibanco.svg',
    price: 32.80,
    changePercent: 0.45,
    changeValue: 0.15,
    volume: 45000000,
    open: 32.70,
    low: 32.60,
    high: 32.95,
    prevClose: 32.65,
    pe: 8.0,
    pvp: 1.6,
    dividendYield: 5.5,
    marketCap: "305.0 Bi",
    evEbitda: null, 
    lpa: 4.10,
    vpa: 20.50,
    roe: 20.0,
    grahamValue: 30.0,
    netMargin: 18.0,
    roa: 1.5,
    debtEquity: null, 
    currentLiquidity: null,
    forwardPe: 7.5,
    priceSales: null,
    enterpriseValue: null,
    totalCash: null,
    totalDebt: null,
    totalRevenue: "180.0 Bi",
    acidTestRatio: null,
    sector: 'Financeiro',
    historicalData: generateHistoricalData(32.80, 60),
  },
  {
    ticker: 'MGLU3',
    name: 'Magazine Luiza ON',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/magalu.svg',
    price: 11.75,
    changePercent: 2.50,
    changeValue: 0.29,
    volume: 60000000,
    open: 11.50,
    low: 11.45,
    high: 11.90,
    prevClose: 11.46,
    pe: -15.0,
    pvp: 1.8,
    dividendYield: 0.0,
    marketCap: "22.0 Bi",
    evEbitda: 25.0,
    lpa: -0.78,
    vpa: 6.53,
    roe: -10.5,
    grahamValue: 5.0,
    netMargin: -2.0,
    roa: -3.0,
    debtEquity: 1.2,
    currentLiquidity: 1.0,
    forwardPe: -12.0,
    priceSales: 0.5,
    enterpriseValue: "30.0 Bi",
    totalCash: "5.0 Bi",
    totalDebt: "10.0 Bi",
    totalRevenue: "40.0 Bi",
    acidTestRatio: 0.7,
    sector: 'Varejo',
    historicalData: generateHistoricalData(11.75, 60),
  },
  {
    ticker: 'BBDC4',
    name: 'Bradesco PN',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/bradesco.svg',
    price: 12.50,
    changePercent: -0.50,
    changeValue: -0.06,
    volume: 50000000,
    open: 12.60,
    low: 12.45,
    high: 12.65,
    prevClose: 12.56,
    pe: 7.2,
    pvp: 0.9,
    dividendYield: 6.8,
    marketCap: "130.0 Bi",
    evEbitda: null,
    lpa: 1.74,
    vpa: 13.89,
    roe: 12.5,
    grahamValue: 15.0,
    netMargin: 10.0,
    roa: 0.8,
    debtEquity: null,
    currentLiquidity: null,
    forwardPe: 6.9,
    priceSales: null,
    enterpriseValue: null,
    totalCash: null,
    totalDebt: null,
    totalRevenue: "100.0 Bi",
    acidTestRatio: null,
    sector: 'Financeiro',
    historicalData: generateHistoricalData(12.50, 60),
  },
  {
    ticker: 'WEGE3',
    name: 'WEG ON',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/weg.svg',
    price: 38.00,
    changePercent: 1.15,
    changeValue: 0.43,
    volume: 10000000,
    open: 37.80,
    low: 37.70,
    high: 38.20,
    prevClose: 37.57,
    pe: 30.5,
    pvp: 9.5,
    dividendYield: 1.5,
    marketCap: "160.5 Bi",
    evEbitda: 22.0,
    lpa: 1.25,
    vpa: 4.00,
    roe: 31.0,
    grahamValue: 10.0,
    netMargin: 12.0,
    roa: 15.0,
    debtEquity: 0.2,
    currentLiquidity: 2.5,
    forwardPe: 28.0,
    priceSales: 5.0,
    enterpriseValue: "155.0 Bi",
    totalCash: "8.0 Bi",
    totalDebt: "5.0 Bi",
    totalRevenue: "32.0 Bi",
    acidTestRatio: 1.8,
    sector: 'Bens de Capital',
    historicalData: generateHistoricalData(38.00, 60),
  },
  {
    ticker: 'ABEV3',
    name: 'Ambev ON',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/ambev.svg',
    price: 12.00,
    changePercent: -0.20,
    changeValue: -0.02,
    volume: 30000000,
    open: 12.05,
    low: 11.95,
    high: 12.10,
    prevClose: 12.02,
    pe: 13.0,
    pvp: 2.0,
    dividendYield: 4.0,
    marketCap: "190.0 Bi",
    evEbitda: 8.0,
    lpa: 0.92,
    vpa: 6.00,
    roe: 15.5,
    grahamValue: 9.0,
    netMargin: 18.0,
    roa: 9.0,
    debtEquity: 0.1,
    currentLiquidity: 1.0,
    forwardPe: 12.5,
    priceSales: 2.3,
    enterpriseValue: "180.0 Bi",
    totalCash: "15.0 Bi",
    totalDebt: "10.0 Bi",
    totalRevenue: "80.0 Bi",
    acidTestRatio: 0.8,
    sector: 'Consumo não Cíclico',
    historicalData: generateHistoricalData(12.00, 60),
  },
  {
    ticker: 'RENT3',
    name: 'Localiza ON',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/localiza.svg',
    price: 45.00,
    changePercent: 0.80,
    changeValue: 0.36,
    volume: 5000000,
    open: 44.80,
    low: 44.70,
    high: 45.30,
    prevClose: 44.64,
    pe: 18.0,
    pvp: 2.5,
    dividendYield: 2.0,
    marketCap: "48.0 Bi",
    evEbitda: 10.0,
    lpa: 2.50,
    vpa: 18.00,
    roe: 14.0,
    grahamValue: 25.0,
    netMargin: 10.0,
    roa: 5.0,
    debtEquity: 1.5,
    currentLiquidity: 0.8,
    forwardPe: 16.0,
    priceSales: 2.0,
    enterpriseValue: "70.0 Bi",
    totalCash: "3.0 Bi",
    totalDebt: "25.0 Bi",
    totalRevenue: "24.0 Bi",
    acidTestRatio: 0.5,
    sector: 'Consumo Cíclico',
    historicalData: generateHistoricalData(45.00, 60),
  }
];

const numDaysForIndex = 180; 
const ibovHistorical = generateHistoricalData(120500, numDaysForIndex);
const sp500Historical = generateHistoricalData(5100, numDaysForIndex);
const ipcaHistorical = generateHistoricalData(0.45, numDaysForIndex, true, 4.5); // Base 0.45% monthly, approx 4.5% annual
const selicHistorical = generateHistoricalData(10.50, numDaysForIndex, true, 10.50); // Base 10.50% annual

export const mockIndexData = {
  IBOVESPA: {
    name: "IBOVESPA",
    ticker: "^BVSP",
    price: ibovHistorical[numDaysForIndex - 1].price,
    changePercent: parseFloat(((ibovHistorical[numDaysForIndex - 1].price - ibovHistorical[numDaysForIndex - 2].price) / ibovHistorical[numDaysForIndex - 2].price * 100).toFixed(2)),
    changeValue: parseFloat((ibovHistorical[numDaysForIndex - 1].price - ibovHistorical[numDaysForIndex - 2].price).toFixed(2)),
    historicalData: ibovHistorical,
    unit: "pts"
  },
  SP500: {
    name: "S&P 500",
    ticker: "^GSPC",
    price: sp500Historical[numDaysForIndex - 1].price,
    changePercent: parseFloat(((sp500Historical[numDaysForIndex - 1].price - sp500Historical[numDaysForIndex - 2].price) / sp500Historical[numDaysForIndex - 2].price * 100).toFixed(2)),
    changeValue: parseFloat((sp500Historical[numDaysForIndex - 1].price - sp500Historical[numDaysForIndex - 2].price).toFixed(2)),
    historicalData: sp500Historical,
    unit: "pts"
  },
  IPCA: {
    name: "IPCA (mensal)",
    ticker: "IPCA",
    price: ipcaHistorical[numDaysForIndex-1].price,
    changePercent: parseFloat(((ipcaHistorical[numDaysForIndex-1].price - ipcaHistorical[numDaysForIndex-2].price) / ipcaHistorical[numDaysForIndex-2].price * 100).toFixed(2)),
    changeValue: parseFloat((ipcaHistorical[numDaysForIndex-1].price - ipcaHistorical[numDaysForIndex-2].price).toFixed(4)), // Higher precision for %
    historicalData: ipcaHistorical,
    unit: "%"
  },
  SELIC: {
    name: "SELIC (anual)",
    ticker: "SELIC",
    price: selicHistorical[numDaysForIndex-1].price,
    changePercent: parseFloat(((selicHistorical[numDaysForIndex-1].price - selicHistorical[numDaysForIndex-2].price) / selicHistorical[numDaysForIndex-2].price * 100).toFixed(2)),
    changeValue: parseFloat((selicHistorical[numDaysForIndex-1].price - selicHistorical[numDaysForIndex-2].price).toFixed(2)),
    historicalData: selicHistorical,
    unit: "%"
  }
};


export const mockMarketData = {
  topMarketCap: [
    { ticker: 'PETR4', name: 'Petrobras PN', marketCap: "503.20", dividendYield: 12.5, revenue: "500.0", price: 38.50, logoUrl: 'https://s3-symbol-logo.tradingview.com/petrobras.svg' },
    { ticker: 'ITUB4', name: 'Itaú Unibanco PN', marketCap: "305.0", dividendYield: 5.5, revenue: "180.0", price: 32.80, logoUrl: 'https://s3-symbol-logo.tradingview.com/itau-unibanco.svg' },
    { ticker: 'VALE3', name: 'Vale ON', marketCap: "275.80", dividendYield: 8.2, revenue: "150.0", price: 61.70, logoUrl: 'https://s3-symbol-logo.tradingview.com/vale.svg' },
    { ticker: 'WEGE3', name: 'WEG ON', marketCap: "160.5", dividendYield: 1.5, revenue: "30.0", price: 38.00, logoUrl: 'https://s3-symbol-logo.tradingview.com/weg.svg' },
    { ticker: 'ABEV3', name: 'Ambev ON', marketCap: "190.0", dividendYield: 4.0, revenue: "80.0", price: 12.00, logoUrl: 'https://s3-symbol-logo.tradingview.com/ambev.svg' },
  ].sort((a,b) => parseFloat(b.marketCap) - parseFloat(a.marketCap)),
  topDividendYield: [
    { ticker: 'PETR4', name: 'Petrobras PN', marketCap: "503.20", dividendYield: 12.5, revenue: "500.0", price: 38.50, logoUrl: 'https://s3-symbol-logo.tradingview.com/petrobras.svg' },
    { ticker: 'CMIG4', name: 'CEMIG PN', marketCap: "40.0", dividendYield: 10.5, revenue: "35.0", price: 10.00, logoUrl: 'https://s3-symbol-logo.tradingview.com/cemig.svg' },
    { ticker: 'VALE3', name: 'Vale ON', marketCap: "275.80", dividendYield: 8.2, revenue: "150.0", price: 61.70, logoUrl: 'https://s3-symbol-logo.tradingview.com/vale.svg' },
    { ticker: 'BBAS3', name: 'Banco do Brasil ON', marketCap: "150.0", dividendYield: 7.5, revenue: "120.0", price: 27.00, logoUrl: 'https://s3-symbol-logo.tradingview.com/bancodobrasil.svg' },
    { ticker: 'ITUB4', name: 'Itaú Unibanco PN', marketCap: "305.0", dividendYield: 5.5, revenue: "180.0", price: 32.80, logoUrl: 'https://s3-symbol-logo.tradingview.com/itau-unibanco.svg' },
  ].sort((a,b) => b.dividendYield - a.dividendYield),
  topRevenue: [
    { ticker: 'PETR4', name: 'Petrobras PN', marketCap: "503.20", dividendYield: 12.5, revenue: "500.0", price: 38.50, logoUrl: 'https://s3-symbol-logo.tradingview.com/petrobras.svg' },
    { ticker: 'ITUB4', name: 'Itaú Unibanco PN', marketCap: "305.0", dividendYield: 5.5, revenue: "180.0", price: 32.80, logoUrl: 'https://s3-symbol-logo.tradingview.com/itau-unibanco.svg' },
    { ticker: 'VALE3', name: 'Vale ON', marketCap: "275.80", dividendYield: 8.2, revenue: "150.0", price: 61.70, logoUrl: 'https://s3-symbol-logo.tradingview.com/vale.svg' },
    { ticker: 'JBSS3', name: 'JBS ON', marketCap: "50.0", dividendYield: 3.0, revenue: "350.0", price: 22.00, logoUrl: 'https://s3-symbol-logo.tradingview.com/jbs.svg' },
    { ticker: 'ABEV3', name: 'Ambev ON', marketCap: "190.0", dividendYield: 4.0, revenue: "80.0", price: 12.00, logoUrl: 'https://s3-symbol-logo.tradingview.com/ambev.svg' },
  ].sort((a,b) => parseFloat(b.revenue) - parseFloat(a.revenue)),
  popularBDRs: [
    { ticker: 'AAPL34', name: 'Apple Inc.', price: "R$ 65.20", logoUrl: 'https://s3-symbol-logo.tradingview.com/apple.svg' },
    { ticker: 'MSFT34', name: 'Microsoft Corp.', price: "R$ 88.50", logoUrl: 'https://s3-symbol-logo.tradingview.com/microsoft.svg' },
    { ticker: 'NVDC34', name: 'NVIDIA Corp.', price: "R$ 120.75", logoUrl: 'https://s3-symbol-logo.tradingview.com/nvidia.svg' },
    { ticker: 'MELI34', name: 'MercadoLibre Inc.', price: "R$ 75.10", logoUrl: 'https://s3-symbol-logo.tradingview.com/mercadolibre.svg' },
    { ticker: 'TSLA34', name: 'Tesla Inc.', price: "R$ 55.90", logoUrl: 'https://s3-symbol-logo.tradingview.com/tesla.svg' },
  ],
  popularCrypto: [
    { ticker: 'BTCUSD', name: 'Bitcoin', price: "US$ 68,500.00", logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg' },
    { ticker: 'ETHUSD', name: 'Ethereum', price: "US$ 3,800.50", logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg' },
    { ticker: 'SOLUSD', name: 'Solana', price: "US$ 170.25", logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCSOL.svg' },
    { ticker: 'ADAUSD', name: 'Cardano', price: "US$ 0.45", logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCADA.svg' },
    { ticker: 'DOGEUSD', name: 'Dogecoin', price: "US$ 0.16", logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCDOGE.svg' },
  ],
  popularFIIs: [
    { ticker: 'MXRF11', name: 'Maxi Renda FII', price: "R$ 10.50", logoUrl: 'https://statusinvest.com.br/img/fiis/mxrf11.jpg?v=26' },
    { ticker: 'HGLG11', name: 'CSHG Logística FII', price: "R$ 165.20", logoUrl: 'https://statusinvest.com.br/img/fiis/hglg11.jpg?v=26' },
    { ticker: 'KNCR11', name: 'Kinea Rendimentos Imobiliários FII', price: "R$ 102.80", logoUrl: 'https://statusinvest.com.br/img/fiis/kncr11.jpg?v=26' },
    { ticker: 'BCFF11', name: 'BTG Pactual Fundo de Fundos FII', price: "R$ 70.15", logoUrl: 'https://statusinvest.com.br/img/fiis/bcff11.jpg?v=26' },
    { ticker: 'XPML11', name: 'XP Malls FII', price: "R$ 115.90", logoUrl: 'https://statusinvest.com.br/img/fiis/xpml11.jpg?v=26' },
  ],
};

const enrichMarketData = (marketList) => {
  marketList.forEach(stock => {
    const detail = mockStockDataDetails.find(s => s.ticker === stock.ticker);
    if (detail) {
      Object.assign(stock, {
        ...detail, 
        marketCap: stock.marketCap || detail.marketCap, 
        dividendYield: stock.dividendYield || detail.dividendYield,
        revenue: stock.revenue || detail.totalRevenue,
        price: stock.price || detail.price,
        logoUrl: stock.logoUrl || detail.logoUrl
      });
    }
  });
};

enrichMarketData(mockMarketData.topMarketCap);
enrichMarketData(mockMarketData.topDividendYield);
enrichMarketData(mockMarketData.topRevenue);


mockMarketData.popularBDRs.forEach(item => {
  item.pe = item.pe || (Math.random() * 30 + 10).toFixed(1);
  item.dividendYield = item.dividendYield || (Math.random() * 5).toFixed(1);
  item.marketCap = item.marketCap || (Math.random() * 2000 + 500).toFixed(1) + " Bi";
});
mockMarketData.popularCrypto.forEach(item => {
  item.marketCap = item.marketCap || (Math.random() * 1000 + 10).toFixed(1) + " Bi";
  item.volume = item.volume || (Math.random() * 50000 + 1000).toFixed(1) + " M";
});
mockMarketData.popularFIIs.forEach(item => {
  item.dividendYield = item.dividendYield || (Math.random() * 12 + 5).toFixed(1);
  item.pvp = item.pvp || (Math.random() * 0.5 + 0.8).toFixed(1);
});