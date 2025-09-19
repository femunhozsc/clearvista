import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Newspaper, Settings2, Briefcase, LogOut, LogIn, Landmark } from 'lucide-react';
import { NavLinkButton } from '@/components/layout/NavLinkButton';

export const MobileMenu = ({ showSearchInHeader, searchTerm, setSearchTerm, handleSearchSubmit, navLinkAction, user, handleLogout }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden border-t border-border/40 bg-background/95"
    >
      <div className="container mx-auto px-4 py-4 space-y-2">
        {!showSearchInHeader && ( 
           <form onSubmit={(e) => handleSearchSubmit(e, null)} className="relative w-full mb-2">
            <Input
              type="search"
              placeholder="Pesquisar ativo..."
              className="w-full pr-10 bg-muted border-primary/30 focus:border-primary focus:ring-primary rounded-full h-10 pl-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:bg-primary/10">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        )}
        <NavLinkButton text="Carteira" path="/carteira" icon={Briefcase} isImplemented={true} navLinkAction={navLinkAction}/>
        <NavLinkButton text="Notícias" path="/noticias" icon={Newspaper} isImplemented={true} navLinkAction={navLinkAction} />
        <NavLinkButton text="Ferramentas" path="/ferramentas" icon={Settings2} isImplemented={false} navLinkAction={navLinkAction} />
        {user ? (
          <>
            <NavLinkButton text="Logout" icon={LogOut} isImplemented={true} action={handleLogout} navLinkAction={navLinkAction}/>
          </>
        ) : (
          <NavLinkButton text="Login" path="/login" icon={LogIn} isImplemented={true} navLinkAction={navLinkAction}/>
        )}
      </div>
    </motion.div>
  );
};