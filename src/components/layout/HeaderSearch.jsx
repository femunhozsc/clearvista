import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeaderSearch = React.forwardRef(({
  isSearchExpanded,
  setIsSearchExpanded,
  isSearchHovered,
  setIsSearchHovered,
  searchTerm,
  setSearchTerm,
  suggestions,
  handleSearchSubmit,
  handleSuggestionClick,
  searchInputRef,
  isHeaderSearchFocused,
  setIsHeaderSearchFocused
}, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      className={cn(
        "relative flex items-center",
        isSearchExpanded ? "w-full max-w-xs sm:max-w-sm md:max-w-md mr-2" : "w-auto mr-2" // Adiciona margem quando expandido ou não
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onHoverStart={() => { 
        setIsSearchHovered(true); 
        setIsSearchExpanded(true); 
      }}
      onHoverEnd={() => { 
        setIsSearchHovered(false);
        if (!isHeaderSearchFocused && !searchTerm) { // Somente colapsa se não estiver focado e sem texto
          setIsSearchExpanded(false);
        }
      }}
    >
      <AnimatePresence>
        {isSearchExpanded ? (
          <motion.form 
            key="search-form-header"
            onSubmit={(e) => handleSearchSubmit(e, null)}
            initial={{ opacity: 0, width: 0, x: 30 }} // Inicia da direita para esquerda
            animate={{ opacity: 1, width: "100%", x: 0}}
            exit={{ opacity: 0, width: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="relative w-full flex items-center"
          >
             <div className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200 z-10",
              isSearchHovered || isSearchExpanded ? "bg-primary" : "bg-card"
            )}>
              <Search className={cn(
                "h-5 w-5 transition-colors duration-200",
                isSearchHovered || isSearchExpanded ? "text-card" : "text-foreground"
              )} />
            </div>
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Pesquisar ativo..."
              className="w-full bg-card border-primary/30 focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground rounded-full h-10 pl-4 pr-10 text-sm" // padding ajustado
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsHeaderSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => {
                  // Mantém expandido se estiver focado (mesmo sem hover) ou se houver texto
                  if (!isSearchHovered && !searchInputRef.current?.value) { 
                    setIsSearchExpanded(false);
                  }
                  setIsHeaderSearchFocused(false);
                }, 150);
              }}
            />
            {suggestions.length > 0 && isHeaderSearchFocused && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-2 top-full bg-card border border-border rounded-md shadow-lg z-20 overflow-hidden" // 'top-full' para garantir que apareça abaixo
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-muted cursor-pointer text-left text-foreground"
                    onMouseDown={() => handleSuggestionClick(suggestion.ticker)} // Usar onMouseDown para evitar que o onBlur do input feche antes do clique
                  >
                    <span className="font-semibold">{suggestion.ticker}</span> - <span className="text-sm text-muted-foreground">{suggestion.name}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="search-icon-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200",
              isSearchHovered ? "bg-primary" : "bg-card border border-border"
            )}
          >
            <Search className={cn(
              "h-5 w-5 transition-colors duration-200",
              isSearchHovered ? "text-card" : "text-foreground"
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
HeaderSearch.displayName = 'HeaderSearch';