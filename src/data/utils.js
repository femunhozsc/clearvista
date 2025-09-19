export const generateHistoricalData = (basePrice, numDays, isPercentage = false, annualRate = null) => {
  if (isPercentage && annualRate !== null) {
    const dailyRate = Math.pow(1 + annualRate / 100, 1/252) - 1;
    return Array.from({ length: numDays }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (numDays - i));
      const fluctuation = (Math.random() - 0.5) * 0.001;
      const price = parseFloat( ( (1 + dailyRate + fluctuation) ** i * basePrice ).toFixed(2) );
      return {
        date: date.toISOString().split('T')[0],
        price: price,
      };
    });
  }
  
  return Array.from({ length: numDays }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (numDays - i));
    return {
      date: date.toISOString().split('T')[0],
      price: parseFloat((basePrice + Math.sin(i / (numDays/10)) * (basePrice * 0.1) + Math.random() * (basePrice * 0.05)).toFixed(2)),
    };
  });
};