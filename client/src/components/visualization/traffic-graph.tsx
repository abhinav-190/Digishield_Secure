import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TrafficGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
}

interface Point {
  x: number;
  y: number;
}

const TrafficGraph: React.FC<TrafficGraphProps> = ({ 
  height = "h-40", 
  className, 
  ...props 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [pathD, setPathD] = useState('');
  const [linePath, setLinePath] = useState('');

  // Initialize the graph dimensions and points
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setDimensions({ width, height });

      // Generate initial points
      const initialPoints: Point[] = [];
      const numPoints = 50;
      
      for (let i = 0; i < numPoints; i++) {
        const x = (width / numPoints) * i;
        const y = height - (Math.random() * 0.5 + 0.3) * height;
        initialPoints.push({ x, y });
      }
      
      setPoints(initialPoints);
    }
  }, []);

  // Update paths when points change
  useEffect(() => {
    if (points.length > 0 && dimensions.width > 0) {
      const pointsStr = points.map(p => `${p.x},${p.y}`).join(' L ');
      
      // Set area path (with fill)
      setPathD(`M0,${dimensions.height} L ${pointsStr} L${dimensions.width},${dimensions.height} Z`);
      
      // Set line path (no fill)
      setLinePath(`M ${pointsStr}`);
    }
  }, [points, dimensions]);

  // Animate the graph
  useEffect(() => {
    if (points.length === 0) return;

    const interval = setInterval(() => {
      setPoints(prevPoints => {
        const newPoints = [...prevPoints];
        const numPoints = newPoints.length;
        
        // Shift points to create animation effect
        for (let i = 0; i < numPoints - 1; i++) {
          newPoints[i] = { 
            x: newPoints[i].x, 
            y: newPoints[i+1].y 
          };
        }
        
        // Update last point with new random value
        const lastX = newPoints[numPoints-1].x;
        const newY = dimensions.height - (Math.random() * 0.5 + 0.3) * dimensions.height;
        newPoints[numPoints-1] = { x: lastX, y: newY };
        
        return newPoints;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [points, dimensions]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative bg-primary/50 rounded overflow-hidden", height, className)} 
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill="rgba(122, 162, 247, 0.2)"
          stroke="#7AA2F7"
          strokeWidth="2"
        />
        <path
          d={linePath}
          fill="none"
          stroke="#7AA2F7"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export { TrafficGraph };
