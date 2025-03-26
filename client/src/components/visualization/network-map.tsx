import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'central' | 'satellite';
  isActive: boolean;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  length: number;
  angle: number;
  fromX: number;
  fromY: number;
  opacity: number;
}

interface NetworkMapProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
}

const NetworkMap: React.FC<NetworkMapProps> = ({ 
  height = "h-48", 
  className, 
  ...props 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize the network map
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setDimensions({ width, height });

      // Create central node
      const centralNode: Node = {
        id: 'central',
        x: width / 2,
        y: height / 2,
        type: 'central',
        isActive: true,
      };

      // Create satellite nodes
      const satelliteNodes: Node[] = [];
      const nodeConnections: Connection[] = [];
      const nodeCount = 8;

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const distance = Math.random() * 60 + 40;
        
        const x = Math.cos(angle) * distance + (width / 2);
        const y = Math.sin(angle) * distance + (height / 2);
        
        const nodeId = `satellite-${i}`;
        satelliteNodes.push({
          id: nodeId,
          x,
          y,
          type: 'satellite',
          isActive: false,
        });

        // Connect to central node
        const dx = x - centralNode.x;
        const dy = y - centralNode.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const connectionAngle = Math.atan2(dy, dx) * 180 / Math.PI;

        nodeConnections.push({
          id: `connection-central-${i}`,
          from: 'central',
          to: nodeId,
          length,
          angle: connectionAngle,
          fromX: centralNode.x,
          fromY: centralNode.y,
          opacity: 1,
        });

        // Randomly connect some satellite nodes to each other
        if (i > 0 && Math.random() > 0.5) {
          const prevIndex = Math.floor(Math.random() * i);
          const prevNodeId = `satellite-${prevIndex}`;
          const prevNode = satelliteNodes[prevIndex];
          
          const dx = prevNode.x - x;
          const dy = prevNode.y - y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          
          nodeConnections.push({
            id: `connection-${i}-${prevIndex}`,
            from: nodeId,
            to: prevNodeId,
            length,
            angle,
            fromX: x,
            fromY: y,
            opacity: 0.5,
          });
        }
      }

      setNodes([centralNode, ...satelliteNodes]);
      setConnections(nodeConnections);
    }
  }, []);

  // Animate data transmission
  useEffect(() => {
    if (nodes.length === 0) return;

    const interval = setInterval(() => {
      const satelliteNodes = nodes.filter(node => node.type === 'satellite');
      if (satelliteNodes.length === 0) return;

      const randomIndex = Math.floor(Math.random() * satelliteNodes.length);
      const nodeToActivate = satelliteNodes[randomIndex];

      setNodes(prev => 
        prev.map(node => 
          node.id === nodeToActivate.id 
            ? { ...node, isActive: true } 
            : node
        )
      );

      // Reset node after animation
      setTimeout(() => {
        setNodes(prev => 
          prev.map(node => 
            node.id === nodeToActivate.id 
              ? { ...node, isActive: false } 
              : node
          )
        );
      }, 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [nodes]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative bg-primary/50 rounded border border-[#414868] overflow-hidden", height, className)} 
      {...props}
    >
      {/* Network connections */}
      {connections.map((connection) => (
        <div
          key={connection.id}
          className="absolute h-0.5 bg-[#414868]"
          style={{
            width: `${connection.length}px`,
            left: `${connection.fromX}px`,
            top: `${connection.fromY}px`,
            transform: `rotate(${connection.angle}deg)`,
            transformOrigin: 'left center',
            opacity: connection.opacity,
          }}
        />
      ))}

      {/* Network nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={cn(
            "absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300",
            node.type === 'central' 
              ? "h-3 w-3 bg-[#9ECE6A]" 
              : node.isActive 
                ? "h-2.5 w-2.5 bg-[#F7768E]" 
                : "h-2.5 w-2.5 bg-[#7AA2F7]"
          )}
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export { NetworkMap };
