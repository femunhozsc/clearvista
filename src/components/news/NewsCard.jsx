import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const NewsCard = ({ newsItem, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, delay: index * 0.05, ease: "easeOut" }
    }
  };

  const handleReadMore = () => {
    toast({
      title: "🚧 Em Desenvolvimento",
      description: "A leitura completa da notícia será implementada em breve!",
    });
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="glassmorphic-card rounded-xl overflow-hidden shadow-lg flex flex-col interactive-card"
    >
      <div className="relative h-48 w-full">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={newsItem.title}
          src={newsItem.imageUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <span className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
          {newsItem.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight h-14 overflow-hidden">{newsItem.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 flex-grow h-16 overflow-hidden">{newsItem.summary}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-muted-foreground">{newsItem.date}</span>
          <Button 
            variant="link" 
            size="sm"
            className="text-primary p-0 h-auto hover:text-accent"
            onClick={handleReadMore}
          >
            Leia mais <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};