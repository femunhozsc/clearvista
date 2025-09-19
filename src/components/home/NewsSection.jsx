import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mockNews } from '@/data';
import { NewsCard } from '@/components/news/NewsCard';

const NewsSection = () => {
  const latestNews = mockNews.slice(0, 3);

  return (
    <div className="pb-10">
      <h2 className="section-title">Últimas Notícias</h2>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.05 }}}}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {latestNews.map((item, index) => (
          <NewsCard key={item.id} newsItem={item} index={index} />
        ))}
      </motion.div>
      <motion.div 
        className="text-center mt-12"
        initial={{opacity:0, y:20}}
        whileInView={{opacity:1, y:0, transition:{delay:0.3, duration:0.4, ease: "easeOut"}}}
        viewport={{once:true}}
      >
        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary group">
          <Link to="/noticias">
            Ver Todas as Notícias <Newspaper className="ml-2 h-5 w-5 group-hover:animate-pulse" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NewsSection;