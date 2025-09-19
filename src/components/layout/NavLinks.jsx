import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/layout/UserMenu';
import { toast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export const NavLinks = ({ user, handleLogout }) => {
  const navItems = [
    { text: 'Carteira', path: '/carteira', isImplemented: true },
    { text: 'Notícias', path: '/noticias', isImplemented: true },
  ];

  const handleNavClick = (e, item) => {
    if (!item.isImplemented) {
      e.preventDefault();
      toast({ title: "🚧 Em Desenvolvimento", description: `A funcionalidade "${item.text}" será implementada em breve!` });
    }
  };

  return (
    <>
      {navItems.map((item) => (
        <Button key={item.text} variant="ghost" asChild className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5">
          <Link to={item.path} onClick={(e) => handleNavClick(e, item)}>
            {item.text}
          </Link>
        </Button>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5">
            Ferramentas
            <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/ferramentas/comparador" className="w-full">
              Comparador de Ativos
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-4">
        {user ? (
          <UserMenu user={user} handleLogout={handleLogout} />
        ) : (
          <Button asChild>
            <Link to="/login">Entrar</Link>
          </Button>
        )}
      </div>
    </>
  );
};