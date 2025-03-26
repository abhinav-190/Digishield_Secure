import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DataPoint {
  id: string;
  top: string;
  left: string;
  isBlocked: boolean;
}

interface TrafficVisualizationProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
}

const TrafficVisualization: React.FC<TrafficVisualizationProps> = ({ 
  height = "h-20", 
  className, 
  ...props 
}) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a new data point
      const newPoint: DataPoint = {
        id: Math.random().toString(36).substring(2, 9),
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 20}%`,
        isBlocked: Math.random() > 0.7,
      };

      setDataPoints((prev) => [...prev, newPoint]);

      // Remove the data point after 3 seconds
      setTimeout(() => {
        setDataPoints((prev) => prev.filter((p) => p.id !== newPoint.id));
      }, 3000);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={cn("relative bg-primary/50 rounded overflow-hidden", height, className)} 
      {...props}
    >
      {dataPoints.map((point) => (
        <div
          key={point.id}
          className={cn(
            "absolute h-1 w-1 rounded-full animate-dataPoint",
            point.isBlocked ? "bg-[#F7768E]" : "bg-[#7AA2F7]"
          )}
          style={{
            top: point.top,
            left: point.left,
          }}
        />
      ))}
    </div>
  );
};

export { TrafficVisualization };
