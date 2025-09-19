import React from 'react';
import Hero from '@/components/home/Hero';
import Rankings from '@/components/home/Rankings';
import MarketCharts from '@/components/home/MarketCharts';
import PopularAssets from '@/components/home/PopularAssets';
import NewsSection from '@/components/home/NewsSection';

const HomePage = () => {
  const sections = [
    { id: 'rankings', component: <Rankings />, className: "pt-12 md:pt-16 lg:pt-20" }, // Espaçamento reduzido aqui
    { id: 'market-charts', component: <MarketCharts />, className: "py-12 md:py-16 lg:py-20" },
    { id: 'popular-assets', component: <PopularAssets />, className: "py-12 md:py-16 lg:py-20" },
    { id: 'news', component: <NewsSection />, className: "py-12 md:py-16 lg:py-20" },
  ];

  return (
    <div className="overflow-x-hidden">
      <Hero />
      
      {sections.map((section) => (
        <section 
          key={section.id}
          className={`container mx-auto px-4 ${section.className}`}
        >
          {section.component}
        </section>
      ))}
    </div>
  );
};

export default HomePage;