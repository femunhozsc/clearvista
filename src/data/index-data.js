import { generateHistoricalData } from './utils';

const numDaysForIndex = 180; 
const ibovHistorical = generateHistoricalData(120500, numDaysForIndex);
const sp500Historical = generateHistoricalData(5100, numDaysForIndex);
const ipcaHistorical = generateHistoricalData(0.45, numDaysForIndex, true, 4.5);
const selicHistorical = generateHistoricalData(10.50, numDaysForIndex, true, 10.50);

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
    changeValue: parseFloat((ipcaHistorical[numDaysForIndex-1].price - ipcaHistorical[numDaysForIndex-2].price).toFixed(4)),
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