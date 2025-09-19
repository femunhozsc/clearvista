import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Filter } from 'lucide-react';
import { mockNews } from '@/data';
import { NewsCard } from '@/components/news/NewsCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NoticiasPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => 
    ['Todos', ...new Set(mockNews.map(news => news.category))]
  , []);

  const filteredNews = useMemo(() => 
    selectedCategory === 'Todos' 
      ? mockNews 
      : mockNews.filter(news => news.category === selectedCategory)
  , [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center justify-center">
          <Newspaper className="w-10 h-10 mr-4" />
          Portal de Notícias
        </h1>
        <p className="text-lg text-muted-foreground">
          Fique por dentro das últimas novidades do mercado financeiro.
        </p>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10 p-4 bg-muted/50 rounded-lg"
      >
        <Filter className="w-5 h-5 text-primary mr-2" />
        {categories.map(category => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full transition-all duration-200",
              selectedCategory === category 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'hover:bg-primary/10'
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredNews.map((item, index) => (
          <NewsCard key={item.id} newsItem={item} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default NoticiasPage;