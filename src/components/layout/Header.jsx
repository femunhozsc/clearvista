import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLinks } from '@/components/layout/NavLinks';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { HeaderSearch } from '@/components/layout/HeaderSearch';
import { mockStockDataDetails, mockMarketData } from '@/data';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState(false);
  const [showSearchInHeader, setShowSearchInHeader] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  const navigate = useNavigate();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/33ada24a-4209-40bf-8357-760f342e2f97/c83317e07274208c6af41e64b20eb235.png";
  const heroBannerRef = useRef(null);
  const searchInputRef = useRef(null);
  const headerSearchContainerRef = useRef(null);

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSearchInHeader(!entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsSearchExpanded(false);
          setIsSearchHovered(false);
        }
      },
      { threshold: 0.1 } 
    );

    const heroElement = document.getElementById('hero-banner');
    if (heroElement) {
      heroBannerRef.current = heroElement;
      observer.observe(heroBannerRef.current);
    }

    return () => {
      if (heroBannerRef.current) {
        observer.unobserve(heroBannerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
      setIsHeaderSearchFocused(true);
    } else if (!isSearchExpanded && !isSearchHovered) {
      setIsHeaderSearchFocused(false);
    }
  }, [isSearchExpanded, isSearchHovered]);

  useEffect(() => {
    if (searchTerm.trim() && isHeaderSearchFocused && isSearchExpanded) {
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
  }, [searchTerm, isHeaderSearchFocused, isSearchExpanded, allMockTickers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerSearchContainerRef.current && !headerSearchContainerRef.current.contains(event.target)) {
        setIsHeaderSearchFocused(false);
        setSuggestions([]);
        if (!isSearchHovered) {
          setIsSearchExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerSearchContainerRef, isSearchHovered]);


  const handleSearchSubmit = (e, ticker) => {
    e.preventDefault();
    const termToSearch = ticker || searchTerm;
    if (termToSearch.trim()) {
      navigate(`/ativo/${termToSearch.trim().toUpperCase()}`);
      setSearchTerm('');
      setIsSearchExpanded(false);
      setIsSearchHovered(false);
      setSuggestions([]);
      setIsHeaderSearchFocused(false);
      if (isMenuOpen) setIsMenuOpen(false);
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
    setIsSearchExpanded(false);
    setIsSearchHovered(false);
    setIsHeaderSearchFocused(false);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkAction = (text, path, icon, isImplemented = true, action) => {
    if (action) {
      action();
    } else if (isImplemented && path !== "#") {
      navigate(path);
    } else {
       toast({ title: "🚧 Em Desenvolvimento", description: `A funcionalidade "${text}" será implementada em breve!` });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({ title: "Erro no Logout", description: error.message, variant: "destructive" });
    } else {
      navigate('/'); 
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center flex-shrink-0 mr-4 md:mr-6" onClick={() => setIsMenuOpen(false)}>
          <img src={logoUrl} alt="Clearview Capital Logo" className="h-10 md:h-12 mr-2" />
        </Link>
        
        <div className="flex items-center flex-grow justify-start">
          <AnimatePresence>
            {showSearchInHeader && (
              <HeaderSearch
                ref={headerSearchContainerRef}
                isSearchExpanded={isSearchExpanded}
                setIsSearchExpanded={setIsSearchExpanded}
                isSearchHovered={isSearchHovered}
                setIsSearchHovered={setIsSearchHovered}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                suggestions={suggestions}
                handleSearchSubmit={handleSearchSubmit}
                handleSuggestionClick={handleSuggestionClick}
                searchInputRef={searchInputRef}
                isHeaderSearchFocused={isHeaderSearchFocused}
                setIsHeaderSearchFocused={setIsHeaderSearchFocused}
              />
            )}
          </AnimatePresence>
          
          <nav className="hidden md:flex items-center space-x-1 ml-auto">
            <NavLinks user={user} handleLogout={handleLogout} />
          </nav>
        </div>

        <div className="flex items-center flex-shrink-0 md:hidden ml-2">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            showSearchInHeader={showSearchInHeader}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchSubmit={handleSearchSubmit}
            navLinkAction={navLinkAction}
            user={user}
            handleLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;