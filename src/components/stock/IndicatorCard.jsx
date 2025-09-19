import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

const IndicatorCard = ({ label, value, unit = '', description }) => {
  const displayValue = (value === null || value === undefined || Number.isNaN(value)) ? '-' : `${value}${unit}`;
  
  return (
    <motion.div 
      className="bg-card p-4 rounded-lg shadow border border-border"
      whileHover={{ y: -3, boxShadow: "0 4px 6px -1px rgba(250, 204, 21, 0.1), 0 2px 4px -1px rgba(250, 204, 21, 0.06)"}}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        {description && (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="bg-background text-foreground border-primary max-w-xs">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <p className="text-xl font-semibold text-foreground">{displayValue}</p>
    </motion.div>
  );
};

export default IndicatorCard;