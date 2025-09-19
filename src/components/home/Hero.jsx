import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { mockStockDataDetails, mockMarketData } from '@/data/mockData';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  const allMockTickers = [
    ...new Set([
      ...mockStockDataDetails.map(s => ({ ticker: s.ticker, name: s.name })),
      ...mockMarketData.topMarketCap.map(s => ({ ticker: s.ticker, name: s.name })),
      ...mockMarketData.topDividendYield.map(s => ({ ticker: s.ticker, name: s.name })),
      ...mockMarketData.topRevenue.map(s => ({ ticker: s.ticker, name: s.name })),
      ...mockMarketData.popularBDRs.map(s => ({ ticker: s.ticker, name: s.name })),
      ...mockMarketData.popularCrypto.map(s => ({ ticker: s.ticker, name: s.name })),
      ...mockMarketData.popularFIIs.map(s => ({ ticker: s.ticker, name: s.name })),
    ])
  ].filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.ticker === value.ticker && t.name === value.name
    ))
  );


  useEffect(() => {
    if (searchTerm.trim() && isInputFocused) {
      const filteredSuggestions = allMockTickers
        .filter(stock => 
          stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, isInputFocused]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsInputFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSearch = (e, ticker) => {
    e.preventDefault();
    const termToSearch = ticker || searchTerm;
    if (termToSearch.trim()) {
      navigate(`/ativo/${termToSearch.trim().toUpperCase()}`);
      setSearchTerm('');
      setSuggestions([]);
      setIsInputFocused(false);
    } else {
      toast({
        title: "Busca vazia",
        description: "Por favor, insira um ticker para pesquisar.",
        variant: "destructive"
      });
    }
  };

  const handleSuggestionClick = (ticker) => {
    setSearchTerm(ticker);
    navigate(`/ativo/${ticker.toUpperCase()}`);
    setSuggestions([]);
    setIsInputFocused(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-16 md:py-24 lg:py-28 text-center overflow-visible bg-gradient-to-br from-background to-muted/30"
      id="hero-banner"
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          className="w-full h-full object-cover"
          alt="Panorama de um moderno centro financeiro com arranha-céus e gráficos de mercado sobrepostos"
         src="https://images.unsplash.com/photo-1654006676972-79b3f738ea04" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight"
        >
          Clearview Vista | Análise de Ativos
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Pesquise pelo ativo desejado para obter cotações, indicadores e gráficos detalhados.
        </motion.p>
        
        <motion.div
          ref={searchContainerRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto relative"
        >
          <form 
            onSubmit={handleSearch} 
            className="flex items-center bg-card p-2 rounded-lg shadow-lg border border-border"
          >
            <Input
              type="search"
              placeholder="Digite o ticker do ativo (ex: PETR4, BTCUSD, MXRF11)"
              className="flex-grow bg-transparent border-none focus:ring-0 text-lg py-3 px-4 text-foreground placeholder:text-muted-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
            />
            <Button type="submit" size="lg" className="bg-primary hover:bg-accent text-primary-foreground ml-2">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </form>
          <AnimatePresence>
            {isInputFocused && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-30 overflow-hidden"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-muted cursor-pointer text-left text-foreground"
                    onClick={() => handleSuggestionClick(suggestion.ticker)}
                  >
                    <span className="font-semibold">{suggestion.ticker}</span> - <span className="text-sm text-muted-foreground">{suggestion.name}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;