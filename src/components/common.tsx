import React, { FC, useRef, useState, useEffect } from 'react';

export const GlowingBorderCard: FC<{ children: React.ReactNode; className?: string, contentClassName?: string }> = ({
  children,
  className = '',
  contentClassName = ''
}) => {
  return (
    <div className={`animated-border rounded-2xl p-0.5 shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] ${className}`}>
      <div className={`rounded-[15px] bg-[#161b22] ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export const AnimatedSection: FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            {children}
        </div>
    );
};

export const AnimatedGradientBackground: FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 w-full h-full z-0 overflow-hidden"
  >
    <div className="relative w-full h-full">
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob-1"></div>
      <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob-2"></div>
      <div className="absolute -bottom-16 left-8 w-72 h-72 bg-green-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob-3"></div>
    </div>
  </div>
);
