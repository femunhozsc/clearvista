import React from 'react';
import { Link } from 'react-router-dom';
import { mockMarketData } from '@/data/mockData';
import { TrendingUp, DollarSign, BarChartHorizontalBig, Landmark, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } // Animação mais rápida
};

const listItemVariants = {
  hidden: { opacity: 0, x: -15 }, // Reduzido o x
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05, // Delay menor para itens da lista
      duration: 0.3
    }
  })
};

const RankingCard = ({ title, data, valueKey, unit, icon: Icon }) => (
  <motion.div 
    variants={cardVariants}
    className="glassmorphic-card p-6 rounded-xl shadow-lg h-full flex flex-col interactive-card"
  >
    <div className="flex items-center text-primary mb-4">
      <Icon className="w-7 h-7 mr-3" />
      <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
    </div>
    <ul className="space-y-3 flex-grow">
      {data.slice(0, 5).map((item, index) => (
        <motion.li 
          key={item.ticker} 
          custom={index}
          variants={listItemVariants}
          className="flex justify-between items-center text-sm py-2 border-b border-border/30 last:border-b-0"
        >
          <Link to={`/ativo/${item.ticker}`} className="flex items-center text-foreground hover:text-primary font-medium transition-colors group">
            <Avatar className="h-8 w-8 mr-3 border-2 border-primary/50 group-hover:border-primary transition-all">
              <AvatarImage src={item.logoUrl || `https://avatar.vercel.sh/${item.ticker}.png?size=40`} alt={item.name} />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {item.ticker ? item.ticker.substring(0, 2) : <ImageIcon size={16}/>}
              </AvatarFallback>
            </Avatar>
            <span className="truncate max-w-[100px] sm:max-w-[120px]">{item.ticker}</span>
          </Link>
          <span className="text-muted-foreground font-semibold">{item[valueKey]}{unit}</span>
        </motion.li>
      ))}
    </ul>
    <motion.div whileHover={{x:5}} className="mt-auto pt-4">
      <Link to="#" onClick={(e) => { e.preventDefault(); alert("🚧 Ver todos ainda não implementado."); }} className="text-sm text-primary hover:underline font-semibold flex items-center">
        Ver todos &rarr;
      </Link>
    </motion.div>
  </motion.div>
);

const Rankings = () => {
  return (
    <div>
      <h2 className="section-title">Destaques do Mercado</h2>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 }}}} // Stagger mais rápido
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <RankingCard 
          title="Maiores Market Caps" 
          data={mockMarketData.topMarketCap} 
          valueKey="marketCap"
          unit=" Bi"
          icon={Landmark}
        />
        <RankingCard 
          title="Maiores Dividend Yields" 
          data={mockMarketData.topDividendYield} 
          valueKey="dividendYield"
          unit="%"
          icon={DollarSign}
        />
        <RankingCard 
          title="Maiores Receitas" 
          data={mockMarketData.topRevenue} 
          valueKey="revenue"
          unit=" Bi"
          icon={BarChartHorizontalBig}
        />
      </motion.div>
    </div>
  );
};

export default Rankings;