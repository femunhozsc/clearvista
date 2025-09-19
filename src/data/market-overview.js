import { mockStockDataDetails } from './stock-details';

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