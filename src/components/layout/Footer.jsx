import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/33ada24a-4209-40bf-8357-760f342e2f97/3cc6658a72b1b0626bb11a547c9a9320.png";
  return <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={logoUrl} alt="Clearview Capital Logo" className="h-10 md:h-12 mr-2 invert brightness-0 dark:invert-0 dark:brightness-100" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Sua plataforma inteligente para análise de investimentos.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-3">Links Úteis</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="text-muted-foreground hover:text-primary">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-primary">Contato</Link></li>
              <li><Link to="/termos" className="text-muted-foreground hover:text-primary">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-3">Siga-nos</p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-primary">YouTube</a>
              <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border/40">
          <p>&copy; {currentYear} Clearview Capital. Todos os direitos reservados.</p>
          <p className="mt-1">As informações fornecidas não constituem recomendação de investimento.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;