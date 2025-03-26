import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type TerminalLineType = 'prompt' | 'command' | 'output' | 'success' | 'warning' | 'error' | 'info';

interface TerminalLine {
  type: TerminalLineType;
  content: string;
}

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[];
  height?: string;
}

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  ({ lines, height = "h-80", className, ...props }, ref) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, [lines]);

    const getLineClass = (type: TerminalLineType) => {
      switch (type) {
        case 'prompt':
          return 'text-[#9ECE6A]';
        case 'command':
          return 'text-[#7AA2F7]';
        case 'success':
          return 'text-[#9ECE6A]';
        case 'warning':
          return 'text-[#E0AF68]';
        case 'error':
          return 'text-[#F7768E]';
        case 'info':
          return 'text-[#A9B1D6]';
        default:
          return 'text-[#A9B1D6]';
      }
    };

    return (
      <div
        ref={terminalRef}
        className={cn(
          "font-mono bg-[#24283B] rounded-md p-4 overflow-y-auto text-sm",
          height,
          className
        )}
        {...props}
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1 leading-relaxed">
            {line.type === 'prompt' ? (
              <div className="flex">
                <span className={getLineClass('prompt')}>$</span>
                <span className={getLineClass('command')}> {line.content}</span>
              </div>
            ) : (
              <div>
                {line.type === 'info' && <span>[INFO] </span>}
                {line.type === 'success' && <span>[SUCCESS] </span>}
                {line.type === 'warning' && <span>[WARNING] </span>}
                {line.type === 'error' && <span>[CRITICAL] </span>}
                <span className={getLineClass(line.type)}>{line.content}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

Terminal.displayName = "Terminal";

export { Terminal };
